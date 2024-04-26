import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class OrganizationsSerivce {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getOrganizationById(organizationId: number): Promise<HttpResponse<OrganizationEntity>> {
        return (await this.axiosHttp.get<HttpResponse<OrganizationEntity>>(`/api/organizations/${organizationId}`)).data;
    }

    async getOrganizationEvents(organizationId: number, page: number, limits: number): Promise<HttpResponse<EventEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<EventEntity[]>>(`/api/organizations/${organizationId}/events?page=${page}&limits=${limits}`)).data;
    }

    async getOrganizationChallenges(organizationId: number): Promise<HttpResponse<ChallengeEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeEntity[]>>(`/api/organizations/${organizationId}/challenges`)).data;
    }
}