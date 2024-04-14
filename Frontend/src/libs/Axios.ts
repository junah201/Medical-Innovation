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
} from '@/types';

const { VITE_API_URL } = import.meta.env as Record<
  string,
  string
>;

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

  #setAuthReq(
    config: AxiosInterceptorReqConfig
  ): AuthReqConfig {
    const { headers } = config;
    const newConfig = {
      ...config,
      headers: {
        ...headers,
        Authorization: `Bearer ${this.#cookie.get(
          COOKIE.KEY.ACCESS_TOKEN
        )}`,
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
      this.#cookie.set(
        COOKIE.KEY.ACCESS_TOKEN,
        authorization,
        {
          ...COOKIE.CONFIG.DEFAULT,
        }
      );
    }

    if (refreshtoken) {
      this.#cookie.set(
        COOKIE.KEY.REFRESH_TOKEN,
        refreshtoken,
        {
          ...COOKIE.CONFIG.DEFAULT,
        }
      );
    }

    return res;
  }

  #resOnError(error: AxiosRes) {
    return Promise.reject(error);
  }

  get<T = any>(endPoint: EndPoint) {
    return this.#instance<T>({
      method: METHOD.GET,
      url: endPoint,
    });
  }

  getByQuery<T = any>(endPoint: EndPoint, query: Query) {
    return this.#instance<T>({
      method: METHOD.GET,
      url: endPoint,
      params: {
        ...query,
      },
    });
  }

  getByParams<T = any>(endPoint: EndPoint, params: Params) {
    return this.#instance<T>({
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

  postMultipartFormData(
    endPoint: EndPoint,
    data: FormData,
    headers = {}
  ) {
    return this.#instance({
      method: 'POST',
      url: `${endPoint}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
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

  put(endPoint: EndPoint, data: object) {
    return this.#instance({
      method: METHOD.PUT,
      url: endPoint,
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

  delete(endPoint: EndPoint) {
    return this.#instance({
      method: METHOD.DELETE,
      url: `${endPoint}`,
    });
  }
}
