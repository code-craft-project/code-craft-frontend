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

    async currentUser(): Promise<HttpResponse<UserEntity>> {
        return (await this.axiosHttp.get<HttpResponse<UserEntity>>('/api/users/me')).data
    }
    
    async updateUser(user: any): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<UserEntity>>('/api/users/me',user)).data
    }

    async getUserById(userId: any): Promise<HttpResponse<UserEntity>> {
        return (await this.axiosHttp.get<HttpResponse<UserEntity>>(`/api/users/${userId}`)).data
    }

}