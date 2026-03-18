import useHttpRequest from "@/hooks/useHttpRequest";
import { requestEmailVerification } from "../email-verification/requestEmailVerification.service";
import { toast } from "sonner";
import { useCounterDown } from "@/hooks/useCounterDown";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useEmailVerificationService() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userEmail = searchParams.get("email");
  if (!userEmail) return router.back();
  const verificationTokenReqCountDown = useCounterDown(5);

  const query = useHttpRequest({
    queryFunc: async () => {
      if (verificationTokenReqCountDown.isCounting) return;
      try {
        await requestEmailVerification();
        verificationTokenReqCountDown.start({ restart: true });

        toast(`Email has been sent to ${userEmail}`);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
        throw error;
      }
    },
  });

  useEffect(() => {
    if (!userEmail) return;
    query.trigger();
  }, []);

  return {
    query,
    tokenReqCountDown: verificationTokenReqCountDown.time,
    canRequestNewVerificationToken: !verificationTokenReqCountDown.isCounting,
    userEmail,
  };
}
