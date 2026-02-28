
import { SignupFormType } from "@/schemas/signupFormSchema"
import { api } from "@/services/api"



type formData = Omit<SignupFormType, "confirm_password">

export const signup = async (body:formData) =>{
    return await api.POST("/auth/signup", {body})
}