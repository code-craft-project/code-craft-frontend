import axios from "axios";
import { AxiosHttp } from "./services/AxiosHttp";
import ChallengesService from "./services/ChallengesService";
import OrganizationsSerivce from "./services/OrganizationsSerivce";
import UserAuthentication from "./services/UserAuthentication";
import EventsService from "./services/EventsService";
import JobPostsService from "./services/JobPostsService";
import UsersService from "./services/UsersService";
import FilesUploadServices from "./services/FilesUploadServices";
import SeachService from "./services/SearchService";

export const axiosHttp = new AxiosHttp(axios, localStorage, true);

export const challengesService = new ChallengesService(axiosHttp);
export const userAuthentication = new UserAuthentication(axiosHttp);
export const eventsService = new EventsService(axiosHttp);
export const organizationsService = new OrganizationsSerivce(axiosHttp);
export const jobPostsService = new JobPostsService(axiosHttp);
export const usersService = new UsersService(axiosHttp);
export const filesUploadServices = new FilesUploadServices(axiosHttp);
export const searchService = new SeachService(axiosHttp);
