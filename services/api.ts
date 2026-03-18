import { FetchWrapper } from "@/lib/fetchWrapper/fetchWrapper";

export const api = new FetchWrapper("http://127.0.0.1:8000",{
    headers:{
        "Content-Type": "application/json"
    },
    credentials:"include",
})