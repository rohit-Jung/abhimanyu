"use client"

import { Button } from "@abhimanyu/ui/components/button"
import { Card, CardContent } from "@abhimanyu/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@abhimanyu/ui/components/field"
import { Input } from "@abhimanyu/ui/components/input"
import { cn } from "@abhimanyu/ui/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { authClient } from "@/lib/auth"

import { GithubSignInButton } from "../../github/github-sign-in"

interface Inputs {
  email: string
  password: string
}

export function SiginInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false)
  const submitHandler: SubmitHandler<Inputs> = async (formData) => {
    const { data, error } = await authClient.signIn.email(formData)
    if (error) {
      toast(error.message || "Error Signing in")
      return
    }

    toast(`Successfully logged in`)
    redirect("/dashboard")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(submitHandler)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative flex h-8 items-center">
                  <Input
                    id="password"
                    type={isPasswordHidden ? "password" : "text"}
                    required
                    {...register("password")}
                  />
                  <div className="absolute right-2">
                    {isPasswordHidden ? (
                      <EyeOffIcon
                        size={16}
                        onClick={() => setIsPasswordHidden(false)}
                      />
                    ) : (
                      <EyeIcon
                        size={16}
                        onClick={() => setIsPasswordHidden(true)}
                      />
                    )}
                  </div>
                </div>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-1 gap-4">
                <GithubSignInButton callbackUrl="/dashboard" />
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/signup">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
