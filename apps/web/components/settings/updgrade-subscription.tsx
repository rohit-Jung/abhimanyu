"use client"

import { Button } from "@abhimanyu/ui/components/button"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { toast } from "sonner"

import { statusButtonClass } from "@/features/dashboard/lib/status-style"
import { useCreateSubscription } from "@/hooks/api/billing/subscription"
import { cn } from "@/lib/utils"

type RazorpayCheckout = new (options: Record<string, unknown>) => {
  open: () => void
}

declare global {
  interface Window {
    Razorpay?: RazorpayCheckout
  }
}

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js"

export function UpgradeButton() {
  const router = useRouter()
  const { mutateAsync: createSubs, isPending: isLoading } =
    useCreateSubscription()

  async function handleUpgrade() {
    const key = process.env.NEXT_PUBLIC_RAZOR_PAY_API_KEY
    if (!key) {
      toast.error("Razorpay is not configured yet.")
      return
    }

    if (!window.Razorpay) {
      toast.error("Checkout is still loading, please try again in a moment.")
      return
    }

    const data = await createSubs()
    if (!data?.subscription_id) return

    const checkout = new window.Razorpay({
      key,
      subscription_id: data.subscription_id,
      name: "Chai Code Reviewer",
      description: "Pro plan — unlimited AI reviews",
      handler: () => {
        toast.success(
          "Payment successful! Your Pro plan will activate shortly."
        )
        router.refresh()
      },
    })

    checkout.open()
  }
  return (
    <>
      <Script src={RAZORPAY_SCRIPT_URL} strategy="lazyOnload"></Script>
      <Button
        onClick={handleUpgrade}
        disabled={isLoading}
        className={cn(statusButtonClass.success)}
      >
        {isLoading ? "Opening checkout…" : "Upgrade to Pro"}
      </Button>
    </>
  )
}
