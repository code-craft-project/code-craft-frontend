import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class EventsService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getEventById(eventId: number): Promise<HttpResponse<EventEntity>> {
        return (await this.axiosHttp.get<HttpResponse<EventEntity>>(`/api/events/${eventId}`)).data;
    }

    async getEvents(pagesNbr: number): Promise<HttpResponse<EventEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<EventEntity[]>>(`/api/events/?page=${pagesNbr}`)).data;
    }

    async createEvent(event: any): Promise<HttpResponse<EventEntity>> {
        return (await this.axiosHttp.post<HttpResponse<EventEntity>>(`/api/events/create`, event)).data;
    }

    async updateEvent(eventId: number, event: any): Promise<HttpResponse<EventEntity>> {
        return (await this.axiosHttp.post<HttpResponse<EventEntity>>(`/api/events/${eventId}/update`, event)).data;
    }

    async joinEvent(eventId: number, password: any): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/join_event`, password)).data;
    }

    async leaveEvent(eventId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/leave_event`)).data;
    }

    async createTeam(eventId: number, team: TeamEntity): Promise<HttpResponse<TeamEntity>> {
        return (await this.axiosHttp.post<HttpResponse<TeamEntity>, TeamEntity>(`/api/events/${eventId}/teams/create`, team)).data;
    }

    async updateTeam(eventId: number, team: TeamEntity): Promise<HttpResponse<TeamEntity>> {
        return (await this.axiosHttp.post<HttpResponse<TeamEntity>, TeamEntity>(`/api/events/${eventId}/teams/${team.id}/update`, {
            name: team.name,
            description: team.description,
            is_private: team.is_private
        })).data;
    }

    async deleteTeam(eventId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/teams/delete`)).data;
    }

    async joinTeam(eventId: number, joinTeam: JoinTeam): Promise<HttpResponse<TeamEntity>> {
        return (await this.axiosHttp.post<HttpResponse<TeamEntity>, JoinTeam>(`/api/events/${eventId}/teams/join`, joinTeam)).data;
    }

    async leaveTeam(eventId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/teams/leave`)).data;
    }

    async getEventChallenges(eventId: number): Promise<HttpResponse<ChallengeEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeEntity[]>>(`/api/events/${eventId}/challenges`)).data;
    }

    async getEventChallengesByTopic(eventId: number, topic: ChallengeTopic): Promise<HttpResponse<ChallengeEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<ChallengeEntity[]>>(`/api/events/${eventId}/challenges/topic/${topic}`)).data;
    }

    async createEventChallenges(eventId: number, eventChallenge: any): Promise<HttpResponse<ChallengeEntity[]>> {
        return (await this.axiosHttp.post<HttpResponse<ChallengeEntity[]>>(`/api/events/${eventId}/challenges`, eventChallenge)).data;
    }

    async getEventTeams(eventId: number): Promise<HttpResponse<TeamEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<TeamEntity[]>>(`/api/events/${eventId}/teams`)).data;
    }

    async getUserTeam(eventId: number): Promise<HttpResponse<TeamEntity | null>> {
        return (await this.axiosHttp.get<HttpResponse<TeamEntity | null>>(`/api/events/${eventId}/teams/me`)).data;
    }
}