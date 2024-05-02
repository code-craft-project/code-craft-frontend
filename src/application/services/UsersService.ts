import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class UsersService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getUserProgress(): Promise<HttpResponse<UserProgress>> {
        return (await this.axiosHttp.get<HttpResponse<UserProgress>>('/api/users/my_progress')).data
    }
}