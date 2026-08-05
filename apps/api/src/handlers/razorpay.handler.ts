import { createHmac, timingSafeEqual } from "crypto"

import { prisma } from "@abhimanyu/database/client"
import { Request, Response as ExpressResponse } from "express"

type RazorpaySubscriptionPayload = {
  id: string
  current_end?: number
  notes?: { userId?: string }
}

type RazorpayWebhookBody = {
  event: string
  payload: {
    subscription?: {
      entity: RazorpaySubscriptionPayload
    }
  }
}

const HANDLED_EVENTS = new Set([
  "subscription.activated",
  "subscription.charged",
  "subscription.cancelled",
  "subscription.halted",
  "subscription.completed",
])

export const handleRazorpayWebhook = async (
  req: Request,
  res: ExpressResponse
) => {
  if (!req.body) return

  const body = (req.body as Buffer).toString("utf-8")
  const signature = req.headers["x-razorpay-signature"] as string
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET! as string

  if (!secret || !signature) {
    return res.status(401).json({ error: "Invalid signature" })
  }

  const expected = createHmac("sha256", secret).update(body).digest("hex")
  if (
    expected.length !== signature.length ||
    !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  ) {
    return res.status(401).json({ error: "Invalid signature" })
  }

  let event: RazorpayWebhookBody
  try {
    event = JSON.parse(body) as RazorpayWebhookBody
  } catch {
    return res.status(400).json({ error: "Invalid payload" })
  }

  if (!HANDLED_EVENTS.has(event.event)) {
    return res.status(200).json({ received: true })
  }

  const subscription = event.payload.subscription?.entity
  if (!subscription) {
    return res.status(400).json({ error: "Missing subscription" })
  }

  const existingUser = await prisma.user.findFirst({
    where: { subscriptionId: subscription.id },
    select: { id: true },
  })

  const userId = existingUser?.id ?? subscription.notes?.userId ?? null
  if (!userId) {
    console.error(
      "Razorpay webhook: no user for subscription",
      subscription.id,
      event.event
    )
    return res.status(400).json({ received: true })
  }

  const renewsAt = subscription.current_end
    ? new Date(subscription.current_end * 1000)
    : null

  if (event.event === "subscription.activated") {
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: "pro",
        razorpaySubscriptionId: subscription.id,
        subscriptionStatus: "Active",
        subscriptionRenewsAt: renewsAt,
      },
    })
  }

  if (event.event === "subscription.charged") {
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionRenewsAt: renewsAt },
    })
  }

  if (event.event === "subscription.cancelled") {
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionStatus: "Canceled" },
    })
  }

  if (event.event === "subscription.halted") {
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionStatus: "Halted" },
    })
  }

  if (event.event === "subscription.completed") {
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: "free",
        subscriptionStatus: "Canceled",
        subscriptionRenewsAt: null,
      },
    })
  }

  return res.json({ received: true })
}
