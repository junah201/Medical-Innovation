import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export type AxiosInterceptorReqConfig = InternalAxiosRequestConfig;
export type AuthReqConfig = any;
export type ReqRejected = any;

export type AxiosInterceptorRes = AxiosResponse<any, any>;
export type AxiosRes = AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> | any;

export type EndPoint = string;
export type Query = object | undefined;
export type Params = {
  [key: string]: string | number;
};
export interface DataForm {
  [key: string]: any;
}
export type ID = number | string;
