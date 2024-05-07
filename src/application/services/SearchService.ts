import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class SeachService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async searchJobPosts(query: string): Promise<HttpResponse<JobPostEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<JobPostEntity[]>>(`/api/search/job_posts?q=${query}`)).data
    }

    async searchEvents(query: string): Promise<HttpResponse<EventEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<EventEntity[]>>(`/api/search/events?q=${query}`)).data
    }

    async searchOrganizations(query: string): Promise<HttpResponse<OrganizationEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<OrganizationEntity[]>>(`/api/search/organizations?q=${query}`)).data
    }

    async searchChallenges(query: string): Promise<HttpResponse<ChallengeEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeEntity[]>>(`/api/search/challenges?q=${query}`)).data
    }
}