import { Icon } from "@iconify/react/dist/iconify.js";

interface JobApplicationProps {
    jobApplication: JobApplicationEntity;
}

export default function JobApplication({ jobApplication }: JobApplicationProps) {
    return (
        <div className="w-full h-full flex flex-col p-4 bg-white/20 rounded-xl">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-gray-400 text-sm mr-4">Full Name:</div>
                    <div>{jobApplication.user?.first_name} {jobApplication.user?.last_name}</div>
                </div>
                <a href={`mailto:${jobApplication.user?.email}`} className="text-gray-50 font-semibold bg-green-600 hover:bg-green-500 px-8 py-2 rounded-xl active:scale-110 duration-300 select-none cursor-pointer flex items-center">
                    <Icon icon="material-symbols:mail" className="mr-2" />
                    Hire
                </a>
            </div>
            <div className="flex items-center">
                <div className="text-gray-400 text-sm mr-4">Email:</div>
                <div>{jobApplication.user?.email}</div>
            </div>
            <div className="flex flex-col">
                <div className="text-gray-400 text-sm mr-4">Cover Message:</div>
                <div className="text-gray-50 whitespace-pre-line py-4">{jobApplication.cover_message}</div>
            </div>
            <div className="flex items-center">
                <div className="text-gray-400 text-sm mr-4">Resume:</div>
                <a download href={jobApplication.resume_url} className="text-yellow-600 hover:text-yellow-700 duration-300 cursor-pointer">Download</a>
            </div>
        </div>
    )
}