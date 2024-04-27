import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";

const challengeLevelColor: ChallengeLevelColor = {
    easy: 'text-green-500',
    medium: 'text-red-500',
    hard: 'text-yellow-500'
  };

export default function OrganizationChallenges() {
    const { id } = useParams();
    const { challenges, isChallengesLoading, getOrganizationChallenges } = useContext(OrganizationDashboardContext);

    useEffect(() => {
        if (id && isChallengesLoading) {
            getOrganizationChallenges(parseInt(id));
        }
    }, [id]);

    return (
        <div className="w-full h-full flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-8 py-5">
            <div className="w-full flex mb-8">
                <div className="w-full flex flex-col items-start">
                    <div className="text-3xl font-bold">Challenges</div>
                    <div className="mt-2 text-sm text-gray-300">{"Manage your challenges"}</div>
                </div>
            </div>
            <div className="w-full flex flex-col flex-grow overflow-auto">
                <div className="w-full flex items-center bg-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex-1">
                        <div className="text-sm font-semibold">Title</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold">Topic</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold">Difficulty</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold">Type</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold">Creator</div>
                    </div><div className="flex-1">
                        <div className="text-sm font-semibold">Comments</div>
                    </div><div className="flex-1">
                        <div className="text-sm font-semibold">Submissions</div>
                    </div>
                </div>
                <div className="w-full flex flex-col flex-grow overflow-auto my-4">
                    {
                        isChallengesLoading && (
                            <div className="w-full flex flex-col items-center">
                                <LoadingIndicator />
                            </div>
                        )
                    }
                    {
                        challenges.map((challenge, index) => {
                            return (
                                <div key={index} className="w-full flex items-center px-4 py-2">
                                    <div className="flex-1 text-sm font-semibold">{challenge.title}</div>
                                    <div className="flex-1 text-sm font-semibold">{challenge.topic}</div>
                                    <div className={`flex-1 text-sm font-semibold ${challengeLevelColor[challenge.level]}`}>{challenge.level}</div>
                                    <div className="flex-1 text-sm font-semibold">{challenge.type}</div>
                                    <div className="flex-1 text-sm font-semibold">{challenge.creator?.username}</div>
                                    <div className="flex-1 text-sm font-semibold">{challenge.comments}</div>
                                    <div className="flex-1 text-sm font-semibold">{challenge.submissions}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}