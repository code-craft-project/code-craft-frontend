import axios from "axios";
import { AxiosHttp } from "./services/AxiosHttp";
import ChallengesService from "./services/ChallengesService";
import OrganizationsSerivce from "./services/OrganizationsSerivce";
import UserAuthentication from "./services/UserAuthentication";
import EventsService from "./services/EventsService";

const accessToken = localStorage.getItem("access_token");

const axiosInstance = axios.create({
    headers: {
        Authorization: accessToken ? accessToken : undefined,
    },
});

export const axiosHttp = new AxiosHttp(axiosInstance);

export const challengesService = new ChallengesService(axiosHttp);
export const userAuthentication = new UserAuthentication(axiosHttp);
<<<<<<< HEAD
export const eventsService = new EventsService(axiosHttp);
=======
export const organizationsService = new OrganizationsSerivce(axiosHttp);
>>>>>>> 4dfcedb9da5044719f37a0def08b1122b05d1a4c
