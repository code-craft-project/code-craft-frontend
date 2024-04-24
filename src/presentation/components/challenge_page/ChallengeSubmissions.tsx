import { Icon } from "@iconify/react/dist/iconify.js";

export default function ChallengeSubmissions() {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex items-center bg-blue-800/60 rounded-lg px-4 py-1 my-2">
                <div className="flex-1 text-md text-gray-50">Status</div>
                <div className="flex-1 text-md text-gray-50">Language</div>
                <div className="flex-1 text-md text-gray-50">Memory</div>
            </div>

            <div className="w-full flex items-center px-4 py-1 mb-2">
                <div className="flex-1 text-sm font-medium text-red-500">Wrong Answer</div>
                <div className="flex-1">
                    <div className="w-fit px-4 font-semibold text-xs bg-blue-800 rounded-full text-gray-50">JavaScript</div>
                </div>
                <div className="flex-1 flex items-center">
                    <Icon icon="material-symbols:memory" className="text-xl" />
                    <div className="text-md text-gray-50 ml-1">49.7MB</div>
                </div>
            </div>

            <div className="w-full flex items-center px-4 py-1 mb-2">
                <div className="flex-1 text-sm font-medium text-green-500">Accepted</div>
                <div className="flex-1">
                    <div className="w-fit px-4 font-semibold text-xs bg-blue-800 rounded-full text-gray-50">JavaScript</div>
                </div>
                <div className="flex-1 flex items-center">
                    <Icon icon="material-symbols:memory" className="text-xl" />
                    <div className="text-md text-gray-50 ml-1">50.3MB</div>
                </div>
            </div>
        </div>
    )
}