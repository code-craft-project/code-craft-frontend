import { useContext, useEffect, useState } from "react";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import usePopup from "../../../application/hooks/usePopup";
import MyJobPostCard from "../MyJobPostCard";
import DashboardModel from "./DashboardModel";
import JobApplications from "./JobApplications";
import useDashboardModel from "../../../application/hooks/useDashboardModel";

export default function OrganizationJobPosts() {
    const { id } = useParams();
    const { jobPosts, isJobPostsLoading, getOrganizationJobPosts } = useContext(OrganizationDashboardContext);
    const popupContentOptions: PopupContent = { title: 'jobPost', method: 'create' }
    const { onopen, children } = usePopup(popupContentOptions);

    const useDashboardModelValue = useDashboardModel();
    const [selectedJobPost, setSelectedJobPost] = useState<JobPostEntity>({ title: '', contractType: 'full-time', description: '', location: '', organization_id: 0, role: '', type: 'remote' });

    useEffect(() => {
        if (id && isJobPostsLoading) {
            getOrganizationJobPosts(parseInt(id));
        }
    }, [id]);



    return (
        <div className="w-full h-full flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-8 ">
            <div className="w-full flex mb-8">
                <div className="w-full flex flex-col items-start">
                    <div className="text-3xl font-bold">Job Posts</div>
                    <div className="text-xs text-gray-300">{"Manage Job Posts"}</div>
                </div>
                <button
                    onClick={onopen}
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
                            const viewJobApplications = () => {
                                setSelectedJobPost(jobPost);
                                useDashboardModelValue.open();
                            }

                            return (
                                <div key={index} className="w-1/4 pr-4 mb-4">
                                    <MyJobPostCard jobPost={jobPost} viewJobApplications={viewJobApplications} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {children}
            <DashboardModel useDashboardModel={useDashboardModelValue} >
                <JobApplications jobPost={selectedJobPost} />
            </DashboardModel>
        </div>
    )
}