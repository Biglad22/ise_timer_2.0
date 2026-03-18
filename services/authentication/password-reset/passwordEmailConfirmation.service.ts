import { api } from "@/services/api";

type BodyType = {
    email:string;
}

type RequestReturnType = {

}

export const requestPasswordEmailConfirmation = (body:BodyType): Promise<RequestReturnType>=> api.POST("/auth/request-password-reset", {
    body: JSON.stringify(body)
})