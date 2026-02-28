"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useSignupService from "@/services/authentication/signup/hooks/useSignupService";
import Link from "next/link";

export default function page() {

  const {onSubmit, register, formState} = useSignupService()
  return (
    <>
        <div className="text-center">
          <h3 className="high-emphasis-text font-semibold">Welcome</h3>
          <p className="medium-emphasis-text">Please enter your personal information to create an account with us</p>
        </div>
        <form onSubmit={onSubmit} className="w-full max-w-lg shadow-sm border-secondary p-6 rounded-md bg-tertiary">
            <FieldGroup className="gap-4" >
              <Field  className="gap-2">
                <FieldLabel>
                  First Name
                </FieldLabel>
                <Input {...register("first_name")} aria-roledescription="first name input field" type="text"/>
                <FieldError>{formState.errors.first_name?.message}</FieldError>
              </Field>
              <Field  className="gap-2">
                <FieldLabel>
                  Last Name
                </FieldLabel>
                <Input {...register("last_name")} aria-roledescription="last name input field" type="text"/>
                <FieldError>{formState.errors.last_name?.message}</FieldError>
              </Field>
              <Field className="gap-2">
                <FieldLabel>
                  Email
                </FieldLabel>
                <Input {...register("email")}  aria-roledescription="email input field" type="email" />
                <FieldError>{formState.errors.email?.message}</FieldError>
              </Field>
              <Field className="gap-2">
                <FieldLabel>
                  Username
                </FieldLabel>
                <Input {...register("username")}  aria-roledescription="username input field" type="text" />
                <FieldError>{formState.errors.username?.message}</FieldError>
              </Field>
              <Field className="gap-2">
                <FieldLabel>
                  Password
                </FieldLabel>
                <Input {...register("password")}  aria-roledescription="password input field" type="password"/>
                <FieldDescription>
                  Password must be at least 8 characters long, contain at least one special character, lowercase character, uppercase character and number.
                </FieldDescription>
                <FieldError>{formState.errors.password?.message}</FieldError>
              </Field>
              <Field className="gap-2">
                <FieldLabel>
                  Confirm password
                </FieldLabel>
                <Input {...register("confirm_password")}  aria-roledescription="confirm password input field" type="password"/>
                <FieldError>{formState.errors.confirm_password?.message}</FieldError>
              </Field>
              <Field>
                <Button type="submit" className="w-full cursor-pointer">
                  Continue 
                </Button>
              </Field>
              <div className="flex items-center gap-0 w-full justify-center flex-wrap">
                <p>Already have an account?</p>
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