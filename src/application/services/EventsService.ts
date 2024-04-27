import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class EventsService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getEventById(eventId: number): Promise<HttpResponse<EventEntity>> {
        return (await this.axiosHttp.get<HttpResponse<EventEntity>>(`/api/events/${eventId}`)).data;
    }

    async getEvents(pagesNbr:number): Promise<HttpResponse<EventEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<EventEntity[]>>(`/api/events/?page=${pagesNbr}`)).data;
    }

    async createEvents(eventId: number,event:any): Promise<HttpResponse<EventEntity>> {
        return (await this.axiosHttp.post<HttpResponse<EventEntity>>(`/api/events/${eventId}/create`,event)).data;
    }

    async updateEvents(eventId: number,event:any): Promise<HttpResponse<EventEntity>> {
        return (await this.axiosHttp.post<HttpResponse<EventEntity>>(`/api/events/${eventId}/update`,event)).data;
    }

    async joinEvent(eventId: number,password:any): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/join_event`,password)).data;
    }

    async leaveEvent(eventId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/leave_event`)).data;
    }

    async createTeam(eventId: number,team:any): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/teams/create`,team)).data;
    }

    async deleteTeam(eventId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/teams/delete`)).data;
    }

    async joinTeam(eventId: number,team:any): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/teams/join`,team)).data;
    }

    async leaveTeam(eventId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/teams/leave`)).data;
    }

    async getEventChallenges(eventId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/challenges`)).data;
    }

    async createEventChallenges(eventId: number,eventChallenge:any): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/events/${eventId}/challenges`,eventChallenge)).data;
    }
}