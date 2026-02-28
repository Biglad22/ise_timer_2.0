
type RequestOptions = RequestInit
type RequestMethodOptions = Omit<RequestInit, "body"|"method">
type RequestInterceptor = (url:string, config: RequestOptions, isProtected?:boolean)=>Promise<[string, RequestInit]> | [string, RequestInit];
type ResponseInterceptor = (response:Response)=>Promise<Response>;

export class FetchWrapper {
    baseUrl:string = "";
    presetOptions: RequestMethodOptions;
    requestInterceptors: Array<RequestInterceptor> = []
    responseInterceptors: Array<ResponseInterceptor> = []
    
    constructor(baseUrl:string="", options?: RequestMethodOptions){
        this.baseUrl = baseUrl;
        this.presetOptions = options ? options : {} as RequestMethodOptions
    }
    
    useRequestInterceptor(callback:RequestInterceptor){
        this.requestInterceptors.push(callback)
    }
    
    useResponseInterceptor(callback:ResponseInterceptor){
        this.responseInterceptors.push(callback)
    }

    async __requestMechanism__(url:string, options: RequestInit, isProtected?:boolean){

        for(const interceptor of this.requestInterceptors){
            [url, options] = await interceptor(url, options, isProtected);
        }

        let res = await fetch(url, options);
        
        for (const interceptor of this.responseInterceptors) {
            res = await interceptor(res)
        }
        
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          throw {
            statusCode: res.status,
            message: data?.message || "Something went wrong",
            details: data?.details || null,
          }
        }
    
        if (data?.status === "error") {
          throw {
            statusCode: res.status,
            message: data.message,
            details: data.details,
          }
        }

        return data
    }

    __setRequestOptions__(options:RequestInit){
        return{
            ...this.presetOptions,
            ...options,
            headers:{
                ...this.presetOptions.headers,
                ...options.headers
            }
        }
    }

    async ___requestWithBody__(method:RequestOptions["method"], url:string, body?: Record<string,any>, options?:RequestMethodOptions, isProtected?:boolean){
        const reqUrl = `${this.baseUrl}${url}`;

        const reqOption : RequestInit = this.__setRequestOptions__({
            body: body? JSON.stringify(body) : undefined,
            ...options
        });

        const res = await this.__requestMechanism__(reqUrl, {method, ...reqOption}, isProtected)
        return res
    }

    async GET(url:string, mainOption:{options?: RequestMethodOptions, isProtected?:boolean}){
        const {isProtected, options} = mainOption
        const reqUrl = `${this.baseUrl}${url}`;
        const reqOption : RequestInit = options? this.__setRequestOptions__(options):{};
        
        const res = await this.__requestMechanism__(reqUrl,{method:"GET", ...reqOption}, isProtected);
        return res
    }

    async POST(url:string, reqOption: {body?: Record<string,any>, options?:RequestMethodOptions, isProtected?:boolean}){
        const {body, isProtected, options} = reqOption
        return await this.___requestWithBody__("POST", url, body, options, isProtected)
    }

    async PUT(url:string, reqOption: {body?: Record<string,any>, options?:RequestMethodOptions, isProtected?:boolean}){
        const {body, isProtected, options} = reqOption
        return await this.___requestWithBody__("PUT", url, body, options, isProtected)
    }

    async PATCH(url:string, reqOption: {body?: Record<string,any>, options?:RequestMethodOptions, isProtected?:boolean}){
        const {body, isProtected, options} = reqOption
        return this.___requestWithBody__("PATCH", url, body, options, isProtected)
    }
    
    async DELETE(url:string, reqOption: {body?: Record<string,any>, options?:RequestMethodOptions, isProtected?:boolean}){
        const {body, isProtected, options} = reqOption
        return this.___requestWithBody__("DELETE", url, body, options, isProtected)
    }
} 
