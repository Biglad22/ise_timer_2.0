import useHttpRequest from "@/hooks/useHttpRequest";
import { EmailSchema } from "@/schemas/baseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { requestPasswordEmailConfirmation } from "../password-reset/passwordEmailConfirmation.service";
import { toast } from "sonner";

const emailConfirmationSchema = z.object({
    email: EmailSchema.min(1, {message:"Email is required."})
})
export default function usePasswordResetService() {

    //EMAIL CONFIRMATION
    const emailConfirmationForm = useForm({
        resolver:zodResolver(emailConfirmationSchema),
        // TODO: ADD EMAIL FROM USER OBJECT PERSISTED LOCALLY
    })

    const handleEmailConfirmation = emailConfirmationForm.handleSubmit(async(formData)=>{
        try {
            const res = await requestPasswordEmailConfirmation(formData);
            return res;
        } catch (error:any) {
            toast.error(error?.message);
        }
    });

    const emailConfirmationQuery = useHttpRequest({
        queryFunc: handleEmailConfirmation
    })

    return {
        emailConfirmation: {
            ...emailConfirmationQuery,
            form:{
                ...emailConfirmationForm
            }
        }
    }
}