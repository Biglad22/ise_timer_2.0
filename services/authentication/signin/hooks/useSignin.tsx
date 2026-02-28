import useHttpRequest from "@/hooks/useHttpRequest"
import { signin } from "../signin.service"
import { useForm } from "react-hook-form"
import { LoginFormSchema, LoginFormSchemaType } from "@/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { redirect } from "next/navigation"
import useLocalStorage from "@/hooks/useLocalStorage"
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys"


export default function useSignin() {
    const {set:storeLocally} = useLocalStorage()
    const form = useForm<LoginFormSchemaType>({
        resolver: zodResolver(LoginFormSchema)
    })

    const submitFormCallback = form.handleSubmit(async(data)=> {
        const res = await signin(data).catch((error:any)=>{
            console.log(error);
        }).then(res=>res);
        
        if(!res) return;
        storeLocally(LOCAL_STORAGE_KEYS.ACCESS_TOKENS,res.signed_access_token);
        if(!res?.user.is_verified){
            console.log("we should see this");
            return redirect(`/email-verification?email=${res.user.email}`);
        }
    
    })
    const { trigger : handleSubmission,...res} = useHttpRequest({
        queryFunc: submitFormCallback
    })

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        await handleSubmission(event)
    }

    return {
        submitForm,
        ...res,
        ...form
    }
}