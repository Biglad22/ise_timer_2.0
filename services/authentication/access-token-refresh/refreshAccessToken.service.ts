import { api } from "@/services/api"

export default () : Promise<{signed_access_token:string}> =>{
    return api.POST("/auth/refresh-token", {isProtected:true})
}