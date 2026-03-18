import { api } from "@/services/api"

export const verifyEmail = async(body:{
    email:string;
    token:string
}) : Promise<{message:string}> =>{
    return api.POST("/verify-email", {
        body: JSON.stringify(body),
        isProtected:true
    })
}