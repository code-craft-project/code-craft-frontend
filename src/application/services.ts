import axios from "axios";
import { AxiosHttp } from "./services/AxiosHttp";
import ChallengesService from "./services/ChallengesService";
import OrganizationsSerivce from "./services/OrganizationsSerivce";
import UserAuthentication from "./services/UserAuthentication";

const accessToken = localStorage.getItem("access_token");

const axiosInstance = axios.create({
    headers: {
        Authorization: accessToken ? accessToken : undefined,
    },
});

export const axiosHttp = new AxiosHttp(axiosInstance);

export const challengesService = new ChallengesService(axiosHttp);
export const userAuthentication = new UserAuthentication(axiosHttp);
export const organizationsService = new OrganizationsSerivce(axiosHttp);
