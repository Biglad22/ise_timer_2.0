import useHttpRequest from "@/hooks/useHttpRequest";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useEmailVerificationService() {
    const searchParams = useSearchParams();
    const router = useRouter() 
    const userEmail = searchParams.get("email");

    useEffect(()=>{
        if(!userEmail) return router.back();
    },[userEmail])

    const requestVerificationToken = useHttpRequest({
        queryFunc: async()=>{
            
        }
    })

    return {
        userEmail
    }
}