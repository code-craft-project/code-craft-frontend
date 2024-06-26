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

    async createEvent(organizationId: number, event: EventEntity): Promise<HttpResponse<EventEntity>> {
        return (await this.axiosHttp.post<HttpResponse<EventEntity>, EventEntity>(`/api/events/create`, { ...event, organization_id: organizationId })).data;
    }

    async updateEvent(event: EventEntity): Promise<HttpResponse<EventEntity>> {
        const updatedEvent: EventEntity = {
            title: event.title,
            description: event.description,
            is_public: event.is_public,
            start_at: event.start_at,
            end_at: event.end_at,
            is_team_based: event.is_team_based,
            max_team_members: event.max_team_members,
            logo_url: event.logo_url
        };

        return (await this.axiosHttp.post<HttpResponse<EventEntity>, EventEntity>(`/api/events/${event.id}/update`, updatedEvent)).data;
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

    async createEventChallenge(eventId: number, eventChallenge: ChallengeEntity): Promise<HttpResponse<ChallengeEntity>> {
        return (await this.axiosHttp.post<HttpResponse<ChallengeEntity>, ChallengeEntity>(`/api/events/${eventId}/challenges/create`, eventChallenge)).data;
    }

    async getEventTeams(eventId: number): Promise<HttpResponse<TeamEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<TeamEntity[]>>(`/api/events/${eventId}/teams`)).data;
    }

    async getUserTeam(eventId: number): Promise<HttpResponse<TeamEntity | null>> {
        return (await this.axiosHttp.get<HttpResponse<TeamEntity | null>>(`/api/events/${eventId}/teams/me`)).data;
    }

    async deleteChallenge(eventId: number, challenge_id: number): Promise<HttpResponse<undefined>> {
        return (await this.axiosHttp.post<HttpResponse<undefined>>(`/api/events/${eventId}/challenges/${challenge_id}/delete`)).data;
    }

    async updateEventChallenge(event_id: number, challenge: ChallengeEntity): Promise<HttpResponse<ChallengeEntity>> {
        const updateChallenge: ChallengeEntity = {
            title: challenge.title,
            description: challenge.description,
            is_public: challenge.is_public,
            topic: challenge.topic,
            level: challenge.level,
            type: challenge.type
        };

        return (await this.axiosHttp.post<HttpResponse<ChallengeEntity>, ChallengeEntity>(`/api/events/${event_id}/challenges/${challenge.id}/update`, updateChallenge)).data;
    }

    async updateEventChallengeTestCases(event_id: number, challenge_id: number, testCases: TestCaseEntity[]): Promise<HttpResponse<undefined>> {
        return (await this.axiosHttp.post<HttpResponse<undefined>, { test_cases: TestCaseEntity[] }>(`/api/events/${event_id}/challenges/${challenge_id}/update_test_cases`, { test_cases: testCases })).data;
    }

    async deleteEventById(eventId: number): Promise<HttpResponse<undefined>> {
        return (await this.axiosHttp.post<HttpResponse<undefined>>(`/api/events/${eventId}/delete`)).data;
    }
}