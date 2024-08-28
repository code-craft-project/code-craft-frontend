import { Icon } from "@iconify/react/dist/iconify.js"
import { useContext, useEffect, useState } from "react";

import EventCard from "../components/EventCard.tsx";
import OrganizationChallenges from "../components/dashboard/OrganizationChallenges.tsx";
import useOrganizationDashboard from "../../application/hooks/useOrganizationDashboard.ts";
import OrganizationDashboardContext from "../../application/contexts/OrganizationDashboardContext.ts";
import OrganizationEvents from "../components/dashboard/OrganizationEvents.tsx";
import OrganizationMembers from "../components/dashboard/OrganizationMembers.tsx";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator.tsx";
import moment from "moment";
import OrganizationSettings from "./OrganizationSettings.tsx";
import { userProfilePicture } from "../../application/consts.ts";
import OrganizationJobPosts from "../components/dashboard/OrganizationJobPosts.tsx";
import DashboardHeader from "../components/dashboard/DashboardHeader.tsx";

type OrganizationTabs = 'dashboard' | 'members' | 'events' | 'challenges' | 'job_posts' | 'settings';

const challengeLevelColor: ChallengeLevelColor = {
    easy: 'text-green-500',
    medium: 'text-red-500',
    hard: 'text-yellow-500'
};

function OrganizationDashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const useOrganizationDashboardState = useOrganizationDashboard();
    const [selectedTab, setSelectedTab] = useState<OrganizationTabs>('dashboard');

    useEffect(() => {
        if (id && useOrganizationDashboardState.isLoading) {
            useOrganizationDashboardState.getOrganizationById(parseInt(id));
            useOrganizationDashboardState.getCurrentMember(parseInt(id));
        }
    }, [id]);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const tab = urlParams.get('tab');
        if (tab) {
            setSelectedTab(tab as OrganizationTabs);
        }
    }, []);

    useEffect(() => {
        if (!useOrganizationDashboardState.isMember) {
            setTimeout(() => {
                navigate("/home")
            }, 1000);
        }
    }, [useOrganizationDashboardState.isMember]);

    if (useOrganizationDashboardState.isLoading || useOrganizationDashboardState.isMemberLoading) {
        return (
            <div className="w-full h-screen bg-black flex items-center justify-center">
                <LoadingIndicator />
            </div>
        )
    }

    if (!useOrganizationDashboardState.isMember) {
        return (
            <div className="text-gray-50 h-screen bg-black w-full flex items-center justify-center">
                You are not a Member.
                <a className="text-blue-700 hover:text-blue-600 hover:underline duration-300 cursor-pointer mx-2" href="/sign-in"> Click here to redirect manually,</a>
                Redirecting to Home Page...
            </div>);
    }

    const goTo = (tab: OrganizationTabs) => {
        var url = new URL(window.location.href);
        url.search = '';
        url.searchParams.set('tab', tab);

        history.pushState(null, '', url);

        setSelectedTab(tab);
    }

    return (
        <OrganizationDashboardContext.Provider value={useOrganizationDashboardState}>
            <div className='w-full md:h-screen relative flex flex-col items-center bg-black '>
                <div className="w-full md:h-screen absolute top-0 left-0 bg-black flex flex-col md:flex-row items-center overflow-auto">
                    <div className="p-2 rounded-r-lg fixed z-30 top-auto md:static bg-gray-900 flex flex-row md:flex-col items-center w-full md:w-fit justify-between">
                        <div onClick={() => goTo('dashboard')} className={`text-2xl py-4 transition-all hover:scale-125 cursor-pointer hover:text-yellow-500 ${selectedTab == 'dashboard' ? "text-yellow-500 scale-125" : ""}`}><Icon icon="material-symbols:dashboard" /></div>
                        {
                            useOrganizationDashboardState.hasPermissions('admin') && (
                                <div onClick={() => goTo('members')} className={`text-2xl py-4 transition-all hover:scale-125 cursor-pointer hover:text-yellow-500 ${selectedTab == 'members' ? "text-yellow-500 scale-125" : ""}`}><Icon icon="tdesign:member" /></div>
                            )
                        }
                        {
                            useOrganizationDashboardState.hasPermissions('events_manager') && (
                                <div onClick={() => goTo('events')} className={`text-2xl py-4 transition-all hover:scale-125 cursor-pointer hover:text-yellow-500 ${selectedTab == 'events' ? "text-yellow-500 scale-125" : ""}`}><Icon icon="mdi:events" /></div>
                            )
                        }
                        {
                            useOrganizationDashboardState.hasPermissions('challenges_manager') && (
                                <div onClick={() => goTo('challenges')} className={`text-2xl py-4 transition-all hover:scale-125 cursor-pointer hover:text-yellow-500 ${selectedTab == 'challenges' ? "text-yellow-500 scale-125" : ""}`}><Icon icon="jam:code" /></div>
                            )
                        }
                        {
                            useOrganizationDashboardState.hasPermissions('job_posts_manager') && (
                                <div onClick={() => goTo('job_posts')} className={`text-2xl py-4 transition-all hover:scale-125 cursor-pointer hover:text-yellow-500 ${selectedTab == 'job_posts' ? "text-yellow-500 scale-125" : ""}`}><Icon icon="fluent-mdl2:work" /></div>
                            )
                        }
                        {
                            useOrganizationDashboardState.hasPermissions('admin') && (
                                <div onClick={() => goTo('settings')} className={`text-2xl py-4 transition-all hover:scale-125 cursor-pointer hover:text-yellow-500 ${selectedTab == 'settings' ? "text-yellow-500 scale-125" : ""}`}><Icon icon="uil:setting" /></div>
                            )
                        }
                    </div>
                    <div className="flex-grow w-full h-full flex flex-col items-center md:px-8">
                        <DashboardHeader />
                        <div className="w-full flex-grow flex flex-col items-center py-8">
                            {selectedTab == 'dashboard' && (<DashboardComponent />)}
                            {selectedTab == 'members' && (<OrganizationMembers />)}
                            {selectedTab == 'events' && (<OrganizationEvents />)}
                            {selectedTab == 'challenges' && (<OrganizationChallenges />)}
                            {selectedTab == 'job_posts' && (<OrganizationJobPosts />)}
                            {selectedTab == 'settings' && (<OrganizationSettings />)}
                        </div>
                    </div>
                </div>
            </div>
        </OrganizationDashboardContext.Provider>

    )
}

function DashboardComponent() {
    const { id } = useParams();
    const { dashboardStats, getOrganizationDashboardStats, isDashboardStatsLoading } = useContext(OrganizationDashboardContext);

    useEffect(() => {
        if (id && isDashboardStatsLoading) {
            getOrganizationDashboardStats(parseInt(id));
        }
    }, [id]);

    return (
        <div className="w-full flex flex-col pb-8">
            <div className="w-full flex">
                <div className="font-bold text-gray-50 text-2xl md:text-3xl">Welcome to Dashboard</div>
            </div>
            <div className="w-full flex flex-col md:flex-row mt-8">
                <div className="md:w-1/4 w-full flex flex-col bg-gray-950 rounded-3xl">
                    <div className="px-4 py-2 font-semibold text-gray-50 text-xl">Latest Event</div>
                    <div className="w-full flex flex-col items-center px-4">
                        <div className="w-full py-4">
                            {
                                dashboardStats.latest_events.length > 0 && (
                                    <EventCard event={dashboardStats.latest_events[0]} />
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="md:w-3/4 w-full flex flex-wrap items-center md:pl-8 gap-8 md:gap-0">
                    <div className="flex-1 w-full h-full flex flex-col items-center bg-gray-950 rounded-3xl p-4">
                        <div className="text-2xl font-bold text-gray-50">Members</div>
                        <div className="my-8 text-7xl">
                            <Icon icon="mdi:users" />
                        </div>
                        <div className="text-yellow-600 text-5xl font-bold">{dashboardStats.total_members}</div>
                        <div className="flex-grow w-full"></div>
                        <div className="text-sm font-semibold text-gray-400 cursor-pointer hover:text-gray-200 duration-300">view</div>
                    </div>
                    <div className="flex-1 w-full h-full flex flex-col items-center bg-gray-950 rounded-3xl md:ml-8 p-4">
                        <div className="text-2xl font-bold text-gray-50">Events</div>
                        <div className="my-8 text-7xl">
                            <Icon icon="mdi:events" />
                        </div>
                        <div className="text-yellow-600 text-5xl font-bold">{dashboardStats.total_events}</div>
                        <div className="flex-grow w-full"></div>
                        <div className="text-sm font-semibold text-gray-400 cursor-pointer hover:text-gray-200 duration-300">view</div>
                    </div>
                    <div className="flex-1 w-full h-full flex flex-col items-center bg-gray-950 rounded-3xl md:ml-8 p-4">
                        <div className="text-2xl font-bold text-gray-50">Challenges</div>
                        <div className="my-8 text-7xl">
                            <Icon icon="jam:code" />
                        </div>
                        <div className="text-yellow-600 text-5xl font-bold">{dashboardStats.total_challenges}</div>
                        <div className="flex-grow w-full"></div>
                        <div className="text-sm font-semibold text-gray-400 cursor-pointer hover:text-gray-200 duration-300">view</div>
                    </div>
                    <div className="flex-1 w-full h-full flex flex-col items-center bg-gray-950 rounded-3xl md:ml-8 p-4">
                        <div className="text-2xl font-bold text-gray-50">Participants</div>
                        <div className="my-8 text-7xl">
                            <Icon icon="fluent:people-team-20-filled" />
                        </div>
                        <div className="text-yellow-600 text-5xl font-bold">{dashboardStats.total_participants}</div>
                        <div className="flex-grow w-full"></div>
                        <div className="text-sm font-semibold text-gray-400 cursor-pointer hover:text-gray-200 duration-300">view</div>
                    </div>
                </div>

            </div>
            <div className="mt-8 w-full flex flex-col md:flex-row gap-16 md:gap-0 flex-grow">
                <div className="md:w-1/2 w-full flex flex-col bg-gray-950 rounded-3xl">
                    <div className="px-4 py-3 text-gray-50 text-xl font-semibold">Latest Challenges</div>
                    <div className="w-full flex flex-col px-4 overflow-x-scroll scrollbar-none gap-2 md:gap-0">
                        <div className="p-2 w-full flex items-center ">
                            <div className="flex-1 text-gray-200 text-sm font-medium">Title</div>
                            <div className="flex-1 text-gray-200 text-sm font-medium">Topic</div>
                            <div className="flex-1 text-gray-200 text-sm font-medium">Difficulty</div>
                            <div className="flex-1"></div>
                        </div>
                        <div className="w-4/5 h-px bg-gray-500 rounded-lg"></div>
                        <div className="w-full px-2">
                            {
                                dashboardStats.latest_challenges.map((challenge, index) => {
                                    return (
                                        <NavLink key={index} to={`/challenges/${challenge.id}`} className="w-full flex gap-2 md:gap-0 items-center py-2 overflow-x-scroll md:overflow-auto">
                                            <div className="flex-1 font-semibold text-nowrap">{challenge.title}</div>
                                            <div className="flex-1 font-semibold text-nowrap">{challenge.topic}</div>
                                            <div className={`flex-1 font-semibold text-nowrap ${challengeLevelColor[challenge.level]}`}>{challenge.level}</div>
                                            <div className="flex-1 flex flex-col items-end">
                                                <div className='flex gap-2 items-center hover:underline'>
                                                    <Icon icon="ph:chat-fill" style={{ color: 'white' }} width="18" height="18" />
                                                    Discussion
                                                </div>
                                            </div>
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="md:ml-8 md:w-1/2 w-full flex flex-col bg-gray-950 rounded-3xl">
                    <div className="px-4 py-3 text-gray-50 text-xl font-semibold">New Members</div>
                    <div className="w-full flex-grow flex flex-col px-4">
                        <div className="w-full flex items-center gap-2 md:gap-0 bg-gray-900 overflow-x-scroll scrollbar-none rounded-lg px-4 py-2">
                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">Profile Picture</div>
                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">First Name</div>
                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">Last Name</div>
                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">Role</div>
                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">Joined At</div>
                        </div>
                        <div className="w-full flex-grow overflow-x-scroll md:overflow-x-auto" >
                            {
                                isDashboardStatsLoading && (
                                    <div className="w-full flex flex-col items-center ">
                                        <LoadingIndicator />
                                    </div>
                                )
                            }
                            {
                                dashboardStats.latest_members.map((member, index) => {
                                    return (
                                        <div key={index} className="w-full flex gap-2 md:gap-0 items-center px-4 py-2 ">
                                            <div className="flex-1">
                                                <img src={member.user?.profile_image_url || userProfilePicture} className="w-10 h-10 bg-gray-800 rounded-full object-cover" />
                                            </div>
                                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">{member.user?.first_name}</div>
                                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">{member.user?.last_name}</div>
                                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">{member.role}</div>
                                            <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">{moment(member.created_at).format("DD-MM-yyyy HH:mm")}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationDashboard; 