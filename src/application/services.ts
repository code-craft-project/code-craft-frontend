import axios from "axios";
import { AxiosHttp } from "./services/AxiosHttp";
import ChallengesService from "./services/ChallengesService";
import OrganizationsSerivce from "./services/OrganizationsSerivce";
import UserAuthentication from "./services/UserAuthentication";
import EventsService from "./services/EventsService";

export const axiosHttp = new AxiosHttp(axios, localStorage, true);

export const challengesService = new ChallengesService(axiosHttp);
export const userAuthentication = new UserAuthentication(axiosHttp);
export const eventsService = new EventsService(axiosHttp);
export const organizationsService = new OrganizationsSerivce(axiosHttp);
