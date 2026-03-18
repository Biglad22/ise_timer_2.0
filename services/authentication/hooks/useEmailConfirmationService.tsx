import useHttpRequest from "@/hooks/useHttpRequest";
import { toast } from "sonner";
import { verifyEmail } from "../email-verification/emailVerification.service";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * use hook in route that has search queries 'email' and 'token'
 */
export default function useEmailConfirmationService() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  if (!email || !token) return router.back();

  const emailConfirmationQuery = useHttpRequest({
    queryFunc: async (body: { email: string; token: string }) => {
      try {
        if (!body.email.trim() || !body.token.trim()) return;

        const res = await verifyEmail(body);
        toast.success(res.message);
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "Something went wrong");
        router.back();
      }
    },
  });

  useEffect(() => {
    emailConfirmationQuery.trigger({ email, token });
  }, []);

  return {
    ...emailConfirmationQuery,
  };
}
