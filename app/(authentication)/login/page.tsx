"use client"
import AuthPageHeader from "@/components/auth/AuthPageHeader";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useSignin from "@/services/authentication/signin/hooks/useSignin";
import Link from "next/link";

export default function page() {
  const {isLoading, handleFormSubmission, register, formState} = useSignin()
  return (
    <>
        <AuthPageHeader title="Welcome" subtitle="Please login to your ise timer account to Proceed" />
        <form onSubmit={handleFormSubmission} className="w-full max-w-lg shadow-sm border-secondary mx-auto p-6 rounded-md bg-tertiary">
            <FieldGroup className="gap-4" >
              <Field className="gap-2">
                <FieldLabel>
                  Email or Username
                </FieldLabel>
                <Input {...register("email_username")} aria-roledescription="email or username input field" type="text"/>
                <FieldError>{formState.errors.email_username?.message}</FieldError>
              </Field>
              <Field className="gap-2">
                <FieldLabel>
                  Password
                </FieldLabel>
                <Input {...register("password")} aria-roledescription="password input field" type="password"/>
                {formState.errors.password && (<FieldError>{formState.errors.password.message}</FieldError>)}
              </Field>
              
              <Field className="gap-1">
                <Button asChild variant="ghost" size="sm"  className=" ml-auto max-w-fit text-primary" >
                  <Link href="/request-password-reset">
                    Forgot Password
                  </Link>
                </Button>
                <Button type="submit" disabled={isLoading} className={`w-full ${!isLoading ? "cursor-pointer" :"cursor-progress"}`}>
                  Login
                </Button>
              </Field>
              <div className="flex items-center gap-0 w-full justify-center flex-wrap">
                <p>Don't have an account?</p>
                <Button asChild variant="ghost" className="text-primary px-1 cursor-pointer" size="sm">
                  <Link  href="/signup/personal-information">
                    Create new Account
                  </Link>
                </Button>
              </div>
            </FieldGroup>
        </form>
    </>
  )
}