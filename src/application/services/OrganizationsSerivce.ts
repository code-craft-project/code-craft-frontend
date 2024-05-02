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

    async getOrganizationJobPosts(organizationId: number): Promise<HttpResponse<JobPostEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<JobPostEntity[]>>(`/api/organizations/${organizationId}/job_posts`)).data;
    }

    async getOrganizationMembers(organizationId: number): Promise<HttpResponse<MemberEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<MemberEntity[]>>(`/api/organizations/${organizationId}/members`)).data;
    }

    async getOrganizationDashboardStats(organizationId: number): Promise<HttpResponse<OrganizationDashboardStats>> {
        return (await this.axiosHttp.get<HttpResponse<OrganizationDashboardStats>>(`/api/organizations/${organizationId}/dashboard`)).data;
    }

    async getCurrentMember(organizationId: number): Promise<HttpResponse<MemberEntity>> {
        return (await this.axiosHttp.get<HttpResponse<MemberEntity>>(`/api/organizations/${organizationId}/members/me`)).data;
    }

    async updateOrganization(organizationId: number, organization: OrganizationEntity): Promise<HttpResponse<OrganizationEntity>> {
        return (await this.axiosHttp.post<HttpResponse<OrganizationEntity>, OrganizationEntity>(`/api/organizations/${organizationId}/update`, organization)).data;
    }

    async createOrganization(organization: OrganizationEntity): Promise<HttpResponse<OrganizationEntity>> {
        return (await this.axiosHttp.post<HttpResponse<OrganizationEntity>, OrganizationEntity>(`/api/organizations/create`, organization)).data;
    }

    async getMyOrganization(): Promise<HttpResponse<OrganizationEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<OrganizationEntity[]>>(`/api/organizations/me`)).data
    }
}