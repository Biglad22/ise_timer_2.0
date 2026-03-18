import { api } from "@/services/api";

export const requestEmailVerification = async (): Promise<{
  message: string;
}> => api.POST("/auth/request-email-verification", { isProtected: true });
