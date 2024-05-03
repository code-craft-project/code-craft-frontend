import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class JobPostsService {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async getJobPosts(pagesNbr: number): Promise<HttpResponse<JobPostEntity[]>> {
        return (await this.axiosHttp.get<HttpResponse<JobPostEntity[]>>(`api/jobposts/?page=${pagesNbr}`)).data
    }   
    
    async getJobPostById(jobId: number): Promise<HttpResponse<JobPostEntity>> {
        return (await this.axiosHttp.get<HttpResponse<JobPostEntity>>(`/api/jobposts/${jobId}`)).data;
    }

    async applyJobPost(jobId: number): Promise<HttpResponse<JobApplicationEntity>> {
        return (await this.axiosHttp.get<HttpResponse<JobApplicationEntity>>(`/api/jobposts/${jobId}/apply`)).data;
    }

    async updateJobPost(jobId: number,job:any): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/jobposts/${jobId}/update`,job)).data;
    }

    async deleteJobPost(jobId: number): Promise<HttpResponse<any>> {
        return (await this.axiosHttp.post<HttpResponse<any>>(`/api/jobposts/${jobId}/delete`)).data;
    }

    async createJobPost(job:any): Promise<HttpResponse<JobPostEntity>> {
        return (await this.axiosHttp.post<HttpResponse<JobPostEntity>>(`/api/jobposts/create`,job)).data;
    }

}