import { prisma } from "@abhimanyu/database/client"
import Razorpay from "razorpay"

import { userService } from "./user.service"

class BillingService {
  private razorpay: Razorpay | null = null

  constructor() {
    if (!this.razorpay) {
      this.razorpay = new Razorpay({
        key_id: process.env.RAZOR_PAY_API_KEY,
        key_secret: process.env.RAZOR_PAY_SECRET,
      })
    }
  }

  public async createProSubscription({ userId }: { userId: string }) {
    const user = await userService.getUser({ userId })
    if (!user) {
      return { error: "User Not Found" }
    }

    if (user.subscriptionPlan == "Pro" && user.subscriptionStatus == "Active") {
      return { error: "Subscription already active and pro tier" }
    }

    const planId = process.env.RAZOR_PAY_PLAN_ID
    if (!planId) return { error: "Plan ID not configured" }

    const subscription = await this.razorpay!.subscriptions.create({
      plan_id: planId,
      total_count: 12,
      notes: { userId },
    })

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        subscriptionId: subscription.id,
        subscriptionStatus: "Trailing",
      },
    })

    return { success: true, subscriptionId: subscription.id }
  }

  public async cancelSubscription({ userId }: { userId: string }) {
    const user = await userService.getUser({ userId })
    if (!user) {
      return { error: "User Not Found" }
    }

    if (!user.subscriptionId) {
      return { error: "Subscription id not found to cancel" }
    }

    await this.razorpay!.subscriptions.cancel(user.subscriptionId, true)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: "Canceled",
      },
    })

    return { success: true }
  }
}

export const billingService = new BillingService()
