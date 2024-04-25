import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class UserAuthentication {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async signIn(user: UserCredentials): Promise<HttpResponse<UserSession>> {
        return (await this.axiosHttp.post<HttpResponse<UserSession>>('/api/auth/sign_in',user as any)).data
    }

    async signUp(user: UserEntity): Promise<HttpResponse<UserEntity>> {
        return (await this.axiosHttp.post<HttpResponse<UserEntity>>('/api/auth/sign_up',user as any)).data
    }

}