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

    async createOrganizationChallenge(organization_id: number, challenge: ChallengeEntity): Promise<HttpResponse<ChallengeEntity>> {
        return (await this.axiosHttp.post<HttpResponse<ChallengeEntity>, ChallengeEntity>(`/api/organizations/${organization_id}/challenges/create`, challenge)).data;
    }

    async updateOrganizationChallenge(organization_id: number, challenge: ChallengeEntity): Promise<HttpResponse<ChallengeEntity>> {
        const updateChallenge: ChallengeEntity = {
            title: challenge.title,
            description: challenge.description,
            is_public: challenge.is_public,
            topic: challenge.topic,
            level: challenge.level,
            type: challenge.type
        };

        return (await this.axiosHttp.post<HttpResponse<ChallengeEntity>, ChallengeEntity>(`/api/organizations/${organization_id}/challenges/${challenge.id}/update`, updateChallenge)).data;
    }

    async updateOrganizationChallengeTestCases(organization_id: number, challenge_id: number, testCases: TestCaseEntity[]): Promise<HttpResponse<undefined>> {
        return (await this.axiosHttp.post<HttpResponse<undefined>, { test_cases: TestCaseEntity[] }>(`/api/organizations/${organization_id}/challenges/${challenge_id}/update_test_cases`, { test_cases: testCases })).data;
    }

    async deleteChallenge(organization_id: number, challenge_id: number): Promise<HttpResponse<undefined>> {
        return (await this.axiosHttp.post<HttpResponse<undefined>>(`/api/organizations/${organization_id}/challenges/${challenge_id}/delete`)).data;
    }

    async getJobApplications(organization_id: number, job_post_id: number): Promise<HttpResponse<JobApplicationEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<JobApplicationEntity[]>>(`/api/organizations/${organization_id}/job_posts/${job_post_id}/applications`)).data;
    }

    async deleteMemberRole(organization_id: number, member_id: number): Promise<HttpResponse<MemberEntity>> {
        return (await this.axiosHttp.post<HttpResponse<MemberEntity>>(`/api/organizations/${organization_id}/remove_member`, member_id)).data;
    }   
}