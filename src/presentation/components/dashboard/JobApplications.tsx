import { Icon } from "@iconify/react/dist/iconify.js";
import JobApplication from "./JobApplication";
import { useEffect } from "react";
import useJobApplications from "../../../application/hooks/useJobApplications";
import { useParams } from "react-router-dom";

interface JobApplicationsProps {
    jobPost: JobPostEntity;
};

export default function JobApplications({ jobPost }: JobApplicationsProps) {
    const { id } = useParams();
    const { jobApplications, getJobApplications } = useJobApplications();

    useEffect(() => {
        if (id && jobPost.id) {
            getJobApplications(parseInt(id), jobPost.id);
        }
    }, []);

    return (
        <div className="w-full flex flex-col">
            <div className="text-gray-50 text-2xl mb-2 font-semibold">Job Applications</div>
            <div className="text-gray-200">These are the applications for:</div>
            <div className="w-full flex flex-col bg-transparent mb-10">

                <div className="w-full flex flex-col mt-2">
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

            <div className="w-full flex flex-wrap">
                {
                    jobApplications.map((jobApplication, index) => {
                        return (
                            <div className="w-1/2 flex flex-col pr-2 pb-2">
                                <JobApplication key={index} jobApplication={jobApplication} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}