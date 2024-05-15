import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class UsersService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getUserProgress(): Promise<HttpResponse<UserProgress>> {
        return (await this.axiosHttp.get<HttpResponse<UserProgress>>('/api/users/my_progress')).data
    }

    async getUserSkills(): Promise<HttpResponse<SkillEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<SkillEntity[]>>('/api/users/me/skills')).data
    }

    async addNewSkills(skill_name: string): Promise<HttpResponse<SkillEntity>> {
        return (await this.axiosHttp.post<HttpResponse<SkillEntity>>('/api/users/me/skills/create',{name:skill_name})).data
    }

    async removeSkillById(skill_id: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/users/me/skills/${skill_id}/delete`)).data
    }
}