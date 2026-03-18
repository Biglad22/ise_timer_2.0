/* stylelint-disable */
"use client";
import { api } from "@/services/api";
import useLocalStorage from "./useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { redirect, RedirectType } from "next/navigation";
import refreshAccessTokenService from "@/services/authentication/access-token-refresh/refreshAccessToken.service";
import { toast } from "sonner";

let isRefreshing = false;
let failedQueue: Promise<any>[] = [];

export default function useApiInterceptors() {
  const { get, set: storeLocally } = useLocalStorage();
  api
    .useRequestInterceptor((url: string, config: RequestInit, isProtected) => {
      if (isProtected) {
        const accessToken = get<string>(LOCAL_STORAGE_KEYS.ACCESS_TOKENS);
        if (!accessToken) {
          redirect("/login", RedirectType.replace);
        }

        config = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      return [url, config];
    })
    .useResponseInterceptor(
      (res) => res,
      async (config, error) => {
        if (error.status !== 401 || !config.isProtected) return error;
        if (error.status == 401 && config.isProtected) {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const { signed_access_token } = await refreshAccessTokenService();
              storeLocally(
                LOCAL_STORAGE_KEYS.ACCESS_TOKENS,
                signed_access_token,
              );
            } catch (error: any) {
              toast.error(error.message || error.details);
              redirect("/login", RedirectType.replace);
            } finally {
              isRefreshing = false;
            }
          }

          await Promise.all(
            failedQueue.map(async () => {
              try {
                return await api.useRequest(
                  config?.options?.method,
                  config.url,
                  config,
                );
              } catch (err) {
                throw err;
              }
            }),
          );

          failedQueue = [];
        }

        return error;
      },
    );
}
