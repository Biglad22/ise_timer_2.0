import { RequestOptions } from "http";
// import { HttpError } from "./HttpError";
import { RequestMethodOptions, RequestInterceptor, ResponseInterceptorOnFulfilled, ResponseInterceptorOnError, MethodRequestOptions, ReqConfigType } from "./types";



export class FetchWrapper {
    baseUrl:string = "";
    presetOptions: RequestMethodOptions;
    private requestInterceptors: Array<RequestInterceptor> = []
    private responseInterceptors: Array<{onFulfilled:ResponseInterceptorOnFulfilled, onError:ResponseInterceptorOnError}> = []
    
    constructor(baseUrl:string="", options?: RequestMethodOptions){
        this.baseUrl = baseUrl;
        this.presetOptions = options ? options : {} as RequestMethodOptions
    }
    
    useRequestInterceptor(callback:RequestInterceptor){
        this.requestInterceptors.push(callback)
        return this;
    }
    
    useResponseInterceptor(onFulfilled:ResponseInterceptorOnFulfilled, onError:ResponseInterceptorOnError){
        this.responseInterceptors.push({onFulfilled, onError})
        return this;
    }

    private async __requestMechanism__(url:string, options: RequestInit, isProtected?:boolean){

        // HANDLE REQUEST
        for(const interceptor of this.requestInterceptors){
            [url, options] = await interceptor(url, options, isProtected);
        }

        let res = await fetch(url, options);
        let isError = !res.ok;

        // HANDLE FULFILLED RESPONSE
        if(!isError){
            for (const {onFulfilled} of this.responseInterceptors){
                res = await onFulfilled(res);
            }

            const data = await res.json().catch(() => null)
            if(!res.ok) throw res;
            return data
        }

        // HANDLE ERROR 
        // const data = await res.json().catch(() => null);

        const reqConfig : ReqConfigType  =  {
            url,
            body: options.body || undefined,
            options: options,
            isProtected
        }

        let responseError = res;

        // let responseError = new HttpError({
        //     url,
        //     config:{
        //         body: options.body || undefined,
        //         options: options,
        //         isProtected
        //     },
        //     status: res.status,
        //     message: data.message,
        //     data,
        //     detail:data?.detail
        // });

        for (const {onError} of this.responseInterceptors){
            responseError = await onError(reqConfig, res)
        }
        throw responseError 
    }

    private __setRequestOptions__(options:RequestInit){
        return{
            ...this.presetOptions,
            ...options,
            headers:{
                ...this.presetOptions.headers,
                ...options.headers
            }
        }
    }

    private async ___requestWithBody__(method:RequestOptions["method"], url:string, body?: RequestInit["body"], options?:RequestMethodOptions, isProtected?:boolean){
        const reqUrl = `${this.baseUrl}${url}`;

        const reqOption : RequestInit = this.__setRequestOptions__({
            body: body? JSON.stringify(body) : undefined,
            ...options
        });

        const res = await this.__requestMechanism__(reqUrl, {method, ...reqOption}, isProtected)
        return res
    }

    async GET(url:string, mainOption:MethodRequestOptions){
        const {isProtected, options} = mainOption
        const reqUrl = `${this.baseUrl}${url}`;
        const reqOption : RequestInit = options? this.__setRequestOptions__(options):{};
        
        const res = await this.__requestMechanism__(reqUrl,{method:"GET", ...reqOption}, isProtected);
        return res
    }

    async POST(url:string, reqOption: MethodRequestOptions){
        const {body, isProtected, options} = reqOption
        return await this.___requestWithBody__("POST", url, body, options, isProtected)
    }

    async PUT(url:string, reqOption: MethodRequestOptions){
        const {body, isProtected, options} = reqOption
        return await this.___requestWithBody__("PUT", url, body, options, isProtected)
    }

    async PATCH(url:string, reqOption: MethodRequestOptions){
        const {body, isProtected, options} = reqOption
        return this.___requestWithBody__("PATCH", url, body, options, isProtected)
    }
    
    async DELETE(url:string, reqOption: MethodRequestOptions){
        const {body, isProtected, options} = reqOption
        return this.___requestWithBody__("DELETE", url, body, options, isProtected)
    }

    useRequest(method:RequestInit["method"], url:string, reqOption: MethodRequestOptions){
        switch (method) {
            case "GET":
                return this.GET(url, reqOption);
            case "POST":
                return this.POST(url, reqOption);
            case "PUT":
                return this.PUT(url, reqOption);
            case "PATCH":
                return this.PATCH(url, reqOption);
            case "DELETE":
                return this.DELETE(url, reqOption);
        
            default:
                throw Error("Method not supported!!");
        }
    }
} 
