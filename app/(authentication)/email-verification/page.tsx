"use client"
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import useEmailVerificationService from "@/services/authentication/email-verification/hooks/useEmailVerificationService";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";


export default function page() {
    const {userEmail} = useEmailVerificationService()
  return (
    <>
        <div className="text-center">
            <h3 className="high-emphasis-text font-semibold">Email Verification</h3>
            <p className="medium-emphasis-text">
                <span>
                    Please verify that you own {" "}
                </span>
                <span className="high-emphasis-text font-medium italic underline">
                    {userEmail}
                </span>
            </p>
        </div>
        <form className="w-full max-w-lg shadow-sm border-secondary mx-auto p-6 rounded-md bg-tertiary">
            <FieldGroup className="gap-4" >
              <Field className="gap-2">
                <FieldLabel className="justify-center-safe">
                  OTP Token
                </FieldLabel>
                <InputOTP className="mx-auto" containerClassName="justify-center-safe" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0}/>
                        <InputOTPSlot index={1}/>
                        <InputOTPSlot index={2}/>
                    </InputOTPGroup> 
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3}/>
                        <InputOTPSlot index={4}/>
                        <InputOTPSlot index={5}/>
                    </InputOTPGroup> 
                </InputOTP>
                <FieldError>{}</FieldError>
              </Field>
              <div className="flex items-center gap-2 w-full justify-center flex-wrap">
                <Button type="submit" className={`w-full flex-1 cursor-pointer`}>
                  Verify
                </Button>
                <Button asChild variant="outline" className="text-primary px-1 cursor-pointer">
                  <Link  href="/overview" className="flex-1">
                    Skip
                  </Link>
                </Button>
              </div>
            </FieldGroup>
        </form>
    </>
  )
}