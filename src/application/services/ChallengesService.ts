import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class ChallengesService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getChallengeById(challengeId: number): Promise<HttpResponse<ChallengeEntity>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeEntity>>(`/api/challenges/${challengeId}`)).data;
    }

    async getTestCasesByChallengeId(challengeId: number): Promise<HttpResponse<TestCaseEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<TestCaseEntity[]>>(`/api/challenges/${challengeId}/test_cases`)).data;
    }

    async getSubmissions(challengeId: number): Promise<HttpResponse<SubmissionEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<SubmissionEntity[]>>(`/api/challenges/${challengeId}/submissions`)).data;
    }
}