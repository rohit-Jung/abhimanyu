"use client"
import { Button } from "@abhimanyu/ui/components/button"

import { statusButtonClass } from "@/features/dashboard/lib/status-style"
import { useCancelSubscription } from "@/hooks/api/billing/subscription"

type CancelSubscriptionButtonProps = {
  disabled?: boolean
}
export function CancelSubscriptionButton({
  disabled = false,
}: CancelSubscriptionButtonProps) {
  const { mutate: cancelSubs, isPending: isLoading } = useCancelSubscription()
  const handleCancel = () => {
    cancelSubs()
  }

  return (
    <Button
      variant="outline"
      onClick={handleCancel}
      disabled={disabled || isLoading}
      className={statusButtonClass.danger}
    >
      {isLoading ? "Canceling…" : "Cancel subscription"}
    </Button>
  )
}
