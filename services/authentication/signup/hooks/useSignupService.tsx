import { SignupFormSchema, SignupFormType } from "@/schemas/signupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signup } from "../signup.service";

export default function useSignupService() {
  const form = useForm<SignupFormType>({
    defaultValues:{
        confirm_password:"",
        email:"",
        first_name:"",
        last_name:"",
        password:""
    }, resolver: zodResolver(SignupFormSchema)
  })

  const onSubmit = form.handleSubmit(async (formData) =>{
    try {
        const {confirm_password:_, ...res} = formData
        const response = await signup(res)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
  })

  return {
    onSubmit, ...form
  }
}