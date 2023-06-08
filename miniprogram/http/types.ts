/**
 * http请求方法枚举
 */
export enum HttpMethod1 {
  GET = "GET",
  get = "GET",
  POST = "POST",
  post = "POST",
  DELETE = "DELETE",
  delete = "DELETE",
  PUT = "PUT",
  put = "PUT",
}

export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT";
export interface HttpAttribute {
  base_url: string;
  url: string;
  data: any;
  method: HttpMethod;
  header: any;
  request: any;
}

export interface HttpParameter {
  data: any;
  url: string;
  method: HttpMethod;
}

export interface HttpResponseType {
  code?: string;
  data?: object;
  msg?: string;
}
