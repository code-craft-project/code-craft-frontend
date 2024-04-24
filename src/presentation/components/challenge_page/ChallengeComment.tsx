import { Icon } from "@iconify/react/dist/iconify.js";

export default function ChallengeComment() {
    return (
        <div className="w-full flex flex-col items-start hover:bg-gray-800/40 py-2 px-4">
            <div className="w-full flex items-center mt-2">
                <div className="h-7 w-7 bg-gray-300 rounded-full"></div>
                <div className="flex items-baseline ml-1">
                    <div className="text-gray-50 text-md ml-1">username</div>
                    <div className="text-gray-400 text-xs ml-1">2 days ago</div>
                </div>
            </div>
            <div className="pl-10 w-full mt-2">
                <div className="text-gray-300 text-xs border-1.5 border-gray-100 rounded-lg w-full py-2 px-4 whitespace-pre-wrap">
                    {"Good aproach! I liked the challenge with a lot of information and cool animations. I did one with javascript and react."}
                </div>
            </div>
            <div className="w-full flex items-center mt-4 pl-10">
                <div className="flex items-center cursor-pointer text-gray-50 hover:text-blue-600">
                    <Icon icon="ph:heart" />
                    <div className="text-xs font-semibold ml-2">22 Like</div>
                </div>
                <div className="flex items-center cursor-pointer text-gray-50 ml-8 hover:text-gray-400">
                    <Icon icon="mage:message-round" />
                    <div className="text-xs font-semibold ml-2">3 Reply</div>
                </div>
            </div>
        </div>
    )
}