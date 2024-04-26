import axios from "axios";
import { AxiosHttp } from "./services/AxiosHttp";
import ChallengesService from "./services/ChallengesService";
import OrganizationsSerivce from "./services/OrganizationsSerivce";

export const axiosHttp = new AxiosHttp(axios);
export const challengesService = new ChallengesService(axiosHttp);
export const organizationsService = new OrganizationsSerivce(axiosHttp);