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

    async getComments(challengeId: number): Promise<HttpResponse<ChallengeCommentEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeCommentEntity[]>>(`/api/challenges/${challengeId}/comments`)).data;
    }

    async createComment(challengeId: number, comment: ChallengeCommentEntity): Promise<HttpResponse<ChallengeCommentEntity>> {
        return (await this.axiosHttp.post<HttpResponse<ChallengeCommentEntity>, ChallengeCommentEntity>(`/api/challenges/${challengeId}/comments/create`, comment)).data;
    }

    async replyTOComment(challengeId: number, commentId: number, comment: ChallengeCommentEntity): Promise<HttpResponse<ChallengeCommentEntity>> {
        return (await this.axiosHttp.post<HttpResponse<ChallengeCommentEntity>, ChallengeCommentEntity>(`/api/challenges/${challengeId}/comments/${commentId}/reply`, comment)).data;
    }

    async toggleLikeComment(challengeId: number, commentId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/challenges/${challengeId}/comments/${commentId}/toggle_like`)).data;
    }

    async getChallenges(): Promise<HttpResponse<ChallengeEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeEntity[]>>("/api/challenges/")).data;
    }

    async getChallengesByTopic(topic: ChallengeTopic): Promise<HttpResponse<ChallengeEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeEntity[]>>(`/api/challenges/topic/${topic}`)).data;
    }

    async createTestCases(challenge_id: number, test_cases: TestCaseEntity[]): Promise<HttpResponse<TestCaseEntity[]>> {
        return (await this.axiosHttp.post<HttpResponse<TestCaseEntity[]>, { test_cases: TestCaseEntity[] }>(`/api/challenges/${challenge_id}/test_cases/create`, { test_cases })).data;
    }
}