'use client';

import { api } from "@/services/api";
import useLocalStorage from "./useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";

export default function useApiInterceptors() {
    const {get} = useLocalStorage() 
    const accessToken = get<string>(LOCAL_STORAGE_KEYS.ACCESS_TOKENS)
    //TODO:USE HOOK GLOBALLY
    api.useRequestInterceptor((url:string, config:RequestInit, isProtected)=>{
        if(isProtected){
            config = {
                ...config,
                headers: {
                    ...config.headers,
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        }
        return [url, config]
    })
}