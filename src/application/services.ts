import axios from "axios";
import { AxiosHttp } from "./services/AxiosHttp";
import ChallengesService from "./services/ChallengesService";
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