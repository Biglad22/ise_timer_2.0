// import { HttpError } from "./HttpError";

export type RequestOptions = RequestInit
export type RequestMethodOptions = Omit<RequestInit, "body"|"method">
export type RequestInterceptor = (url:string, config: RequestOptions, isProtected?:boolean)=>Promise<[string, RequestInit]> | [string, RequestInit];

export type ReqConfigType = Omit<MethodRequestOptions, "options"> & {options : RequestInit, url:string};
export type ResponseInterceptorOnFulfilled = ((response:Response)=>Promise<Response>|Response);
export type ResponseInterceptorOnError= ((config : ReqConfigType, error: any)=>Promise<any>|any) 

export type MethodRequestOptions = {body?: BodyInit, options?:RequestMethodOptions, isProtected?:boolean}
