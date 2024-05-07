import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardModel from "./DashboardModel";
import CreateOrganizationChallenge from "../CreateOrganizationChallenge";
import { userProfilePicture } from "../../../application/consts";
import useDashboardModel from "../../../application/hooks/useDashboardModel";

const challengeLevelColor: ChallengeLevelColor = {
    easy: 'text-green-500',
    medium: 'text-yellow-500',
    hard: 'text-red-600'
};

const challengeLevelBgColor: ChallengeLevelColor = {
    easy: 'bg-green-500/20',
    medium: 'bg-yellow-500/20',
    hard: 'bg-red-500/20'
};

export default function OrganizationChallenges() {
    const { id } = useParams();
    const { challenges, isChallengesLoading, getOrganizationChallenges, deleteOrganizationChallenge } = useContext(OrganizationDashboardContext);
    const useDashboardModelValue = useDashboardModel();
    const [editChallenge, setEditChallenge] = useState<ChallengeEntity | undefined>(undefined);

    useEffect(() => {
        if (id && isChallengesLoading) {
            getOrganizationChallenges(parseInt(id));
        }
    }, [id]);

    return (
        <div className="w-full flex-grow flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-8 py-5">
            <div className="w-full flex items-center mb-8">
                <div className="w-full flex flex-col items-start">
                    <div className="text-3xl font-bold">Challenges</div>
                    <div className="mt-2 text-sm text-gray-300">{"Manage your challenges"}</div>
                </div>
            </div>
            <div className="w-full flex items-center mb-4">
                <div onClick={() => useDashboardModelValue.open()} className="flex items-center active:scale-105 text-gray-50  duration-300 px-8 py-1 rounded-lg bg-yellow-600 cursor-pointer select-none">
                    <Icon icon="icon-park-outline:source-code" />
                    <div className="ml-2 font-meduim ">Create New Challenge</div>
                </div>
            </div>
            <div className="w-full flex flex-col">
                {/* <div className="w-full flex items-center bg-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex-[3]">
                        <div className="text-sm font-semibold text-gray-50">Title</div>
                    </div>
                    <div className="flex-[2]">
                        <div className="text-sm font-semibold text-gray-50">Topic</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-50">Difficulty</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-50">Type</div>
                    </div>
                    <div className="flex-[2]">
                        <div className="text-sm font-semibold text-gray-50">Creator</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-50">Comments</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-50">Submissions</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-50">Actions</div>
                    </div>
                </div> */}
                <div className="w-full flex flex-col overflow-auto my-4">
                    {
                        isChallengesLoading && (
                            <div className="w-full flex flex-col items-center">
                                <LoadingIndicator />
                            </div>
                        )
                    }
                    <div className="w-full max-h-screen flex flex-wrap overflow-auto">
                        {
                            challenges.map((challenge, index) => {
                                const editChallenge = () => {
                                    setEditChallenge(challenge);
                                    useDashboardModelValue.open();
                                }

                                return (
                                    <div key={index} className="w-1/3 flex flex-col pb-4 pr-4">
                                        <div className="w-full flex flex-col bg-gray-900 rounded-xl p-4">
                                            <NavLink to={`/challenges/${challenge.id}`}>
                                                <div className="text-gray-50 hover:text-gray-300 duration-300 font-semibold text-xl">{challenge.title}</div>
                                            </NavLink>

                                            <div className="w-full flex items-center justify-between mt-4">
                                                <div className="text-gray-50 text-xs font-semibold bg-gray-100/20 px-4 rounded-full capitalize">{challenge.topic}</div>
                                                <div className={`w-fit text-xs font-semibold ${challengeLevelColor[challenge.level]} ${challengeLevelBgColor[challenge.level]} rounded-full px-4 capitalize`}>{challenge.level}</div>
                                            </div>
                                            <div className="w-full flex items-center mt-2">
                                                <Icon icon="material-symbols:category-outline" className="text-lg" />
                                                <div className="ml-2 text-gray-50 text-sm font-semibold capitalize">{challenge.type.split('_').join(' ')}</div>
                                            </div>
                                            <div className="flex items-center mt-4">
                                                <img src={challenge.creator?.profile_image_url || userProfilePicture} className="w-6 h-6 rounded-full" />
                                                <div className="text-gray-50 text-xs font-semibold ml-2">
                                                    {challenge.creator?.first_name} {challenge.creator?.last_name}
                                                </div>
                                            </div>
                                            <div className="w-full flex items-center justify-between mt-4">
                                                <div className="flex items-center">
                                                    <Icon icon="fa-solid:comments" className="text-lg" />
                                                    <div className="text-gray-50 ml-2 text-sm font-semibold">{challenge.comments} Comments</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Icon icon="mdi:file-code" className="text-lg" />
                                                    <div className="text-gray-50 ml-2 text-sm font-semibold">{challenge.submissions} Submissions</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-8">
                                                <div onClick={editChallenge} className="bg-yellow-700 w-1/2 py-2 rounded-xl flex items-center justify-center mr-1 active:scale-110 duration-300 cursor-pointer hover:bg-yellow-800 select-none">
                                                    <Icon icon="lucide:edit" />
                                                    <div className="text-gray-300 text-xl ml-2 font-semibold" title="Edit">Edit</div>
                                                </div>
                                                <div onClick={() => { deleteOrganizationChallenge(parseInt(id || '0'), challenge.id!) }} className="bg-red-700 w-1/2 py-2 rounded-xl flex items-center justify-center ml-1 active:scale-110 duration-300 cursor-pointer hover:bg-red-800 select-none">
                                                    <Icon icon="material-symbols:delete" />
                                                    <div className="text-gray-300 text-xl ml-2 font-semibold" title="Edit">Delete</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <DashboardModel useDashboardModel={useDashboardModelValue} >
                <CreateOrganizationChallenge editChallenge={editChallenge} />
            </DashboardModel>
        </div>
    )
}