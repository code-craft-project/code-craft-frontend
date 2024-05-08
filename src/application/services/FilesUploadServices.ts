import { AxiosHttp, HttpResponse } from "./AxiosHttp";

export default class FilesUploadServices {
    axiosHttp: AxiosHttp;

    constructor(axiosHttp: AxiosHttp) {
        this.axiosHttp = axiosHttp;
    }

    async uploadImage(image: File): Promise<HttpResponse<string>> {
        const formData = new FormData();
        formData.append('image', image);

        return (await this.axiosHttp.post<HttpResponse<string>, FormData>(`/api/upload/image`, formData)).data;
    }

    async uploadFile(image: File): Promise<HttpResponse<string>> {
        const formData = new FormData();
        formData.append('file', image);

        return (await this.axiosHttp.post<HttpResponse<string>, FormData>(`/api/upload/file`, formData)).data;
    }
}