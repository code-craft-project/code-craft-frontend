import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type AxiosHttpResponse<T> = AxiosResponse<T>;

export type HttpResponseStatus = 'success' | 'error';

export interface HttpResponse<T> {
  status: HttpResponseStatus;
  data: T;
  message?: string;
};

export class AxiosHttp {
  constructor(private axiosInstance: AxiosInstance, private localStorage: Storage, private withCredentials: boolean = false) {
    this.init();
  }

  private init() {
    if (this.withCredentials) {
      const data = this.localStorage.getItem('user_session');
      if (data) {
        const userSession = JSON.parse(data) as UserSession;
        this.axiosInstance.defaults.headers.common['Authorization'] = userSession.access_token;
      }
    }
  }

  reload() {
    this.init();
  }

  async get<Result>(uri: string, config = { headers: {} }): Promise<AxiosResponse<Result>> {


    return this.axiosInstance.get<Result>(uri, config);
  }

  async put<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>> {
    return this.axiosInstance.put<Result>(uri, data);
  }

  async post<Result, Payload = never>(uri: string, data?: Payload, config?: AxiosRequestConfig): Promise<AxiosResponse<Result>> {
    return this.axiosInstance.post<Result>(uri, data, config);
  }

  async delete<Result>(uri: string): Promise<AxiosResponse<Result>> {
    return this.axiosInstance.delete<Result>(uri);
  }
}