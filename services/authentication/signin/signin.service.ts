
import { LoginFormSchemaType } from "@/schemas/loginSchema"
import { api } from "@/services/api"


type ResponseType = {
    signed_access_token:string;
    user: {
        id: number,
        username: string,
        email: string,
        is_verified: boolean,
        verified_at: string | null
    }
} 

export const signin = async (body:LoginFormSchemaType) : Promise<ResponseType> =>{
    return await api.POST("/auth/login", {body})
}