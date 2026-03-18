import useHttpRequest from "@/hooks/useHttpRequest"
import { signin } from "../signin.service"
import { useForm } from "react-hook-form"
import { LoginFormSchema, LoginFormSchemaType } from "@/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect } from "next/navigation"
import useLocalStorage from "@/hooks/useLocalStorage"
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys"
import { toast } from "sonner"


export default function useSignin() {
    const {set:storeLocally} = useLocalStorage()
    const form = useForm<LoginFormSchemaType>({
        resolver: zodResolver(LoginFormSchema)
    })

    const submitFormCallback = form.handleSubmit(async(data)=> {
        const res = await signin(data).catch((error:any)=>{
            console.error(error)
            toast.error(error.message || error.details || "Something went wrong, try again!")
        }).then(res=>res);
        
        if(!res) return;
        storeLocally(LOCAL_STORAGE_KEYS.ACCESS_TOKENS,res.signed_access_token);
        if(!res?.user.is_verified){
            return redirect(`/email-verification?email=${res.user.email}`);
        }
    })

    const { trigger : handleFormSubmission,...res} = useHttpRequest({
        queryFunc: submitFormCallback
    })

    return {
        handleFormSubmission,
        ...res,
        ...form
    }
}