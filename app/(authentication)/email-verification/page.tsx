"use client";
import AuthPageHeader from "@/components/auth/AuthPageHeader";
import LoaderSpinner from "@/components/ui/LoaderSpinner";
import useEmailConfirmationService from "@/services/authentication/hooks/useEmailConfirmationService";

export default function page() {
  useEmailConfirmationService();
  return (
    <>
      <AuthPageHeader
        title="Email Verification"
        subtitle={`Your email is being verified`}
      />
      <LoaderSpinner className="size-12" />
    </>
  );
}
