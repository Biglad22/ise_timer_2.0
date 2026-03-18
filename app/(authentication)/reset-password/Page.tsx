import AuthPageHeader from "@/components/auth/AuthPageHeader";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Page() {
    return (
        <>
          <AuthPageHeader title="Password Reset" subtitle="Request password reset to change your password" />
          <form onSubmit={trigger} className="w-full max-w-lg shadow-sm border-secondary mx-auto p-6 rounded-md bg-tertiary">
                <FieldGroup className="gap-4" >
                  <Field  className="gap-2">
                    <FieldLabel>
                      Confirm your email
                    </FieldLabel>
                    <Input {...register("email")} aria-roledescription="email input field" type="text"/>
                    <FieldError>{formState.errors.email?.message}</FieldError>
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isLoading} className={`w-full ${!isLoading ? "cursor-pointer" :"cursor-progress"}`}>
                      Reset password
                    </Button>
                  </Field>
                  <div className="flex items-center gap-0 w-full justify-center flex-wrap">
                    <p>Remember password?</p>
                    <Button asChild variant="ghost" className="text-primary px-1 cursor-pointer" size="sm">
                      <Link  href="/login">
                        Login
                      </Link>
                    </Button>
                  </div>
                </FieldGroup>
            </form>
        </>
    )
}