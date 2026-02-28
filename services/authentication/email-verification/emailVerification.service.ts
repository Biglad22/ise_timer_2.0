import { api } from "@/services/api"

export const verifyEmail = async() : Promise<{message:string}> =>{
    return api.POST("/verify-email", {
        isProtected:true
    })
}