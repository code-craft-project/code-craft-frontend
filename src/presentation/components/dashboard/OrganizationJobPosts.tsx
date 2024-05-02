import { useContext, useEffect } from "react";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import { NavLink, useParams } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import { Icon } from "@iconify/react/dist/iconify.js";
import usePopup from "../../../application/hooks/usePopup";

export default function OrganizationJobPosts() {
    const { id } = useParams();
    const { jobPosts, isJobPostsLoading, getOrganizationJobPosts } = useContext(OrganizationDashboardContext);
    const popupContentOptions: PopipContent = {title: 'jobPost',method:'create'}
    const {  onopen, children } = usePopup(popupContentOptions);
  
    useEffect(() => {
        if (id && isJobPostsLoading) {
            getOrganizationJobPosts(parseInt(id));
        }
    }, [id]);

    const handleOpenPopup = () => {
        onopen();
    };

    return (
        <div className="w-full h-full flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-8 py-5">
            <div className="w-full flex mb-8">
                <div className="w-full flex flex-col items-start">
                    <div className="text-3xl font-bold">Job Posts</div>
                    <div className="text-xs text-gray-300">{"Manage Job Posts"}</div>
                </div>
                <button
                    onClick={handleOpenPopup}
                    className={`font-meduim px-3 py-1 rounded-lg mt-5 hover:opacity-90 active:scale-105 transition-all duration-300 bg-primary-yellow text-nowrap`}
                    >
                    Create Job Post
                </button>
            </div>
            <div className="w-full flex flex-col flex-grow overflow-auto">
                <div className="w-full flex items-center flex-wrap">
                    {
                        isJobPostsLoading && (
                            <div className="w-full flex flex-col items-center">
                                <LoadingIndicator />
                            </div>
                        )
                    }
                    {
                        jobPosts.map((jobPost, index) => {
                            return (
                                <NavLink to={`/single-job-post/${jobPost.id}`} key={index} className="w-1/4 pr-4 mb-4">
                                    <div className="w-full flex flex-col bg-transparent p-4 rounded-xl hover:py-2 hover:px-6 hover:bg-gray-900 duration-300 cursor-pointer">
                                        {/* <div className="w-full flex items-center">
                                            <div>
                                                <img src={jobPost.organization?.profile_image_url || organizationProfilePicture} className="w-10 h-10 rounded-md" />
                                            </div>
                                        </div> */}
                                        <div className="w-full flex flex-col mt-2">
                                            {/* <div className="font-semibo ld text-sm text-gray-50">{jobPost.organization?.name}</div> */}
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
                        })
                    }
                </div>
            </div>
            {children}
        </div>
    )
}