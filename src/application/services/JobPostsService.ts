import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class JobPostsService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getJobPosts(pagesNbr: number): Promise<HttpResponse<JobPostEntity>> {
        return (await this.axiosHttp.get<HttpResponse<JobPostEntity>>(`api//jobposts/?page=${pagesNbr}`)).data
    }   
    
}