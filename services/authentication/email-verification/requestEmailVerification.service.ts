import { api } from "@/services/api";

export const requestEmailVerification = async () => api.POST(
    "/request-email-verification",
    {isProtected:true}
)