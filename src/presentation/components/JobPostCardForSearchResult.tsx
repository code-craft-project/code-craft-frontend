import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { organizationProfilePicture } from "../../application/consts";

export default function JobPostCardForSearchResult({ jobPost }: { jobPost: JobPostEntity }) {
    return (
        <NavLink to={`/job-posts/${jobPost.id}`} >
            <div className="w-full h-full flex flex-col relative bg-transparent p-4 rounded-xl hover:bg-gray-900 duration-300 cursor-pointer">
                <div className="w-full flex items-center">
                    <div>
                        <img src={jobPost.organization?.profile_image_url || organizationProfilePicture} className="w-10 h-10 rounded-md" />
                    </div>
                </div>
                <div className="w-full flex flex-col mt-2">
                    <div className="font-semibo ld text-sm text-gray-50 mb-4">{jobPost.organization?.name}</div>
                    <div className="text-lg text-gray-50">{jobPost.role}</div>
                    <div className="text-xs text-gray-400">{jobPost.location}</div>
                </div>
                <div className="w-full flex items-center mt-2">
                    <div className="flex items-center text-gray-50">
                        <Icon icon="mdi:location" />
                        <div className="text-sm font-semibold ml-1">{jobPost.type}</div>
                    </div>
                    <div className="flex items-center text-gray-50 ml-4">
                        <Icon icon="material-symbols:work" />
                        <div className="text-sm font-semibold ml-1">{jobPost.contractType}</div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}