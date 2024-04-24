import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import ChallengeDescription from "./ChallengeDescription";
import ChallengeSubmissions from "./ChallengeSubmissions";
import ChallengeComments from "./ChallengeComments";

interface ChallengeBoxProps {
    challenge: ChallengeEntity;
};

type Tab = 'description' | 'submissions' | 'comments';

export default function ChallengeBox({ challenge }: ChallengeBoxProps) {
    const [selectedTab, setSelectedTab] = useState<Tab>('description');

    const isSelected = (tabName: Tab): boolean => {
        return tabName == selectedTab;
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center bg-gradient-to-b from-slate-950 to-blue-950 rounded-lg overflow-auto">
            <div className="w-full flex items-center bg-blue-900">
                <div className={`flex items-center py-2 px-4 cursor-pointer hover:text-gray-300 ${isSelected('description') ? "text-gray-50" : "text-gray-400"}`} onClick={() => setSelectedTab('description')}>
                    <Icon icon="tabler:file-description" />
                    <div className="ml-1 text-sm font-semibold">Description</div>
                </div>

                <div className="h-1/2 w-px bg-gray-50"></div>

                <div className={`flex items-center py-2 px-4 cursor-pointer hover:text-gray-300 ${isSelected('submissions') ? "text-gray-50" : "text-gray-400"}`} onClick={() => setSelectedTab('submissions')}>
                    <Icon icon="mdi:recent" />
                    <div className="ml-1 text-sm font-semibold">Submissions</div>
                </div>

                <div className="h-1/2 w-px bg-gray-50"></div>

                <div className={`flex items-center py-2 px-4 cursor-pointer hover:text-gray-300 ${isSelected('comments') ? "text-gray-50" : "text-gray-400"}`} onClick={() => setSelectedTab('comments')}>
                    <Icon icon="mdi:comments-text-outline" />
                    <div className="ml-1 text-sm font-semibold">Comments</div>
                </div>
            </div>

            <div className="w-full flex-grow flex flex-col items-center px-4 overflow-auto">
                {selectedTab == "description" && <ChallengeDescription title={challenge.title} level={challenge.level} topic={challenge.topic} description={challenge.description} />}
                {selectedTab == "submissions" && <ChallengeSubmissions />}
                {selectedTab == "comments" && <ChallengeComments />}
            </div>

            <div className="w-full flex items-center bg-transparent absolute bottom-0 left-0">
                <div className={`flex items-center py-2 px-4 cursor-pointer text-gray-50 hover:text-gray-300 bg-blue-900 rounded-tr-xl ${isSelected('comments') ? "text-gray-50" : "text-gray-400"}`} onClick={() => setSelectedTab('comments')}>
                    <Icon icon="mdi:comments-text-outline" />
                    <div className="ml-1 text-sm font-semibold">236</div>
                </div>
            </div>
        </div>
    )
}