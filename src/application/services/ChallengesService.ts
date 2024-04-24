import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class ChallengesService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getChallengeById(challengeId: number): Promise<HttpResponse<ChallengeEntity>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeEntity>>(`/api/challenges/${challengeId}`)).data;
    }
}