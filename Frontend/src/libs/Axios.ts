import axios from 'axios';
import { Cookies } from 'react-cookie';

import { METHOD, COOKIE } from '@/constants';
import {
  AxiosInterceptorReqConfig,
  AuthReqConfig,
  ReqRejected,
  AxiosInterceptorRes,
  AxiosRes,
  EndPoint,
  Query,
  Params,
  DataForm,
  ID,
} from '@/types';

const { VITE_API_URL } = import.meta.env;

export class Axios {
  #instance;
  #auth;
  #cookie;

  constructor(isAuthReq = false) {
    this.#instance = axios.create({
      baseURL: `${VITE_API_URL}`,
    });
    this.#auth = isAuthReq;
    this.#cookie = new Cookies();
    this.#setInterceptor();
  }

  /* Interceptor */
  #setInterceptor() {
    this.#instance.interceptors.request.use(
      this.#reqMiddleWare.bind(this),
      this.#reqOnError.bind(this)
    );
    this.#instance.interceptors.response.use(
      this.#resMiddleWare.bind(this),
      this.#resOnError.bind(this)
    );
  }

  /* Req */
  #reqMiddleWare(config: AxiosInterceptorReqConfig) {
    let newConfig = config;
    if (this.#auth) newConfig = this.#setAuthReq(newConfig);

    return newConfig;
  }

  #setAuthReq(config: AxiosInterceptorReqConfig): AuthReqConfig {
    const { headers } = config;
    const newConfig = {
      ...config,
      headers: {
        ...headers,
        Authorization: `${this.#cookie.get(COOKIE.KEY.ACCESS_TOKEN)?.replace('%', ' ')}`,
      },
    };

    return newConfig;
  }

  #reqOnError(error: ReqRejected) {
    return Promise.reject(error);
  }

  /* Res */
  #resMiddleWare(res: AxiosInterceptorRes) {
    const { authorization, refreshtoken } = res.headers;

    if (authorization) {
      this.#cookie.set(COOKIE.KEY.ACCESS_TOKEN, authorization, {
        ...COOKIE.CONFIG.DEFAULT,
      });
    }

    if (refreshtoken) {
      this.#cookie.set(COOKIE.KEY.REFRESH_TOKEN, refreshtoken, {
        ...COOKIE.CONFIG.DEFAULT,
      });
    }

    return res;
  }

  #resOnError(error: AxiosRes) {
    return Promise.reject(error);
  }

  get(endPoint: EndPoint) {
    return this.#instance({
      method: METHOD.GET,
      url: endPoint,
    });
  }

  getByQuery(endPoint: EndPoint, query: Query) {
    return this.#instance({
      method: METHOD.GET,
      url: endPoint,
      params: {
        ...query,
      },
    });
  }

  getByParams(endPoint: EndPoint, params: Params) {
    return this.#instance({
      method: METHOD.GET,
      url: `${endPoint}`,
      params: params,
    });
  }

  post(endPoint: EndPoint, data: DataForm) {
    return this.#instance({
      method: METHOD.POST,
      url: `${endPoint}`,
      data,
    });
  }

  postMultipartFormData(endPoint: EndPoint, data: FormData) {
    return this.#instance({
      method: 'POST',
      url: `${endPoint}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  }

  postFormUnlencoded(endPoint: EndPoint, data: DataForm) {
    return this.#instance({
      method: METHOD.POST,
      url: `${endPoint}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    });
  }

  put(endPoint: EndPoint, data: object, id: ID | undefined = undefined) {
    return this.#instance({
      method: METHOD.PUT,
      url: !!id || id === '' || id === 0 ? `${endPoint}/${id}` : endPoint,
      data,
    });
  }

  patch(endPoint: EndPoint, data: object = {}) {
    return this.#instance({
      method: METHOD.PATCH,
      url: endPoint,
      data,
    });
  }

  putFormData(endPoint: EndPoint, data: DataForm) {
    return this.#instance({
      method: METHOD.PUT,
      url: `${endPoint}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  }

  delete(endPoint: EndPoint, id: ID) {
    return this.#instance({
      method: METHOD.DELETE,
      url: `${endPoint}/${id}`,
    });
  }
}