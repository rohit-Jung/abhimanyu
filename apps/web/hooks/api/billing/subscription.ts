import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { useTRPC } from "@/lib/trpc/client"
import { getQueryClient } from "@/providers/trpcClientProvider"

export const useCancelSubscription = () => {
  const trpc = useTRPC()
  const queryClient = getQueryClient()

  return useMutation(
    trpc.billing.cancel.mutationOptions({
      onSuccess: () => {
        toast.success("Successfully canceled subscription.")
        queryClient.invalidateQueries({
          queryKey: trpc.user.getUserSettings.queryKey(),
        })
      },
      onError: (error: any) => {
        const message =
          error instanceof Error
            ? error.message
            : "Could not cancel subscription."
        toast.error(message)
      },
    })
  )
}

export const useCreateSubscription = () => {
  const trpc = useTRPC()
  const queryClient = getQueryClient()

  return useMutation(
    trpc.billing.upgrade.mutationOptions({
      onSuccess: () => {
        toast.success("Successfully created subscription.")
        queryClient.invalidateQueries({
          queryKey: trpc.user.getUserSettings.queryKey(),
        })
      },
      onError: (error: any) => {
        const message =
          error instanceof Error
            ? error.message
            : "Could not created subscription."
        toast.error(message)
      },
    })
  )
}
