import axios from "axios";
import { AxiosHttp } from "./services/AxiosHttp";
import ChallengesService from "./services/ChallengesService";

export const axiosHttp = new AxiosHttp(axios);
export const challengesService = new ChallengesService(axiosHttp);