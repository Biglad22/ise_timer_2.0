// import { MethodRequestOptions } from "./types";


// export class HttpError<T = unknown> extends Error {
//   url:string;
//   config:ConfigType;
//   status: number;
//   detail?:string;
//   data?: T

//   constructor(props:{url:string, config:ConfigType, status: number, message?: string, detail?:string, data?: T}) {
//     super(props.message)
//     this.status = props.status
//     this.data = props.data
//     this.url = props.url
//     this.config = props.config
//     this.message = props.message || props.detail || "UNKNOWN_ERROR"
//     this.detail = props.detail
//   }

// }