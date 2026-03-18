"use client";
import AuthPageHeader from "@/components/auth/AuthPageHeader";
import { Button } from "@/components/ui/button";
import LoaderSpinner from "@/components/ui/LoaderSpinner";
import useEmailVerificationService from "@/services/authentication/hooks/useEmailVerificationService";
import Link from "next/link";

export default function page() {
  const req = useEmailVerificationService();

  return (
    <>
      <AuthPageHeader
        title="Email Verification"
        subtitle={`Please verify that you own ${req?.userEmail}`}
      />
      <div className="w-full max-w-lg shadow-sm border-secondary mx-auto p-6 rounded-md bg-tertiary">
        {req?.query.isLoading && <LoaderSpinner className="size-10 mx-auto" />}
        <div>
          {req?.query.isSuccess ? (
            <p className="text-center">
              <span className="medium-emphasis-text">
                Verification link has been sent to the above email
              </span>
            </p>
          ) : (
            req?.query.isError &&
            req?.query.error && (
              <p className="medium-emphasis-text text-center block">
                {req?.query.error}
              </p>
            )
          )}

          <div className="w-full flex items-center gap-4 justify-center flex-wrap mt-4">
            {!req?.query.isLoading && !req?.query.isIdle && (
              <Button
                onClick={req?.query.trigger}
                className="flex-1 min-w-fit"
                disabled={
                  !req?.canRequestNewVerificationToken || req?.query.isLoading
                }
              >
                {!req?.canRequestNewVerificationToken && (
                  <span>{req?.tokenReqCountDown}</span>
                )}
                <span>Retry</span>
              </Button>
            )}
            <Button asChild variant="outline" className="flex-1 min-w-fit">
              <Link href="/">Skip</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
