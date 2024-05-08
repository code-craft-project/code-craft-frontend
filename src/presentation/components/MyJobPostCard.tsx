import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useState } from "react";
import usePopup from "../../application/hooks/usePopup";
import useJobPost from "../../application/hooks/useJobPost";

interface MyJobPostCardProps {
    jobPost: JobPostEntity;
    viewJobApplications: () => void;
};

function MyJobPostCard({ jobPost, viewJobApplications }: MyJobPostCardProps) {
    const popupContentOptions: PopupContent = { title: 'jobPost', method: 'update', id: jobPost.id }
    const { onopen, children } = usePopup(popupContentOptions);
    const [activeJobPostMenu, setActiveJobPostMenu] = useState<boolean>(false);
    const handleJobPostUpdate = () => {
        setActiveJobPostMenu(!activeJobPostMenu)
        onopen()
    }
    const { deleteJobPost } = useJobPost()

    const handleJobPostDelete = () => {
        setActiveJobPostMenu(!activeJobPostMenu)
        console.log("first")
        if (jobPost.id)
            deleteJobPost(jobPost.id)
    }
    return (
        <div className="w-full flex flex-col relative bg-transparent p-4 rounded-xl hover:py-2 hover:px-6 hover:bg-gray-900 duration-300 cursor-pointer">
            {/* <div className="w-full flex items-center">
        <div>
            <img src={jobPost.organization?.profile_image_url || organizationProfilePicture} className="w-10 h-10 rounded-md" />
        </div>
    </div> */}
            <div className="w-full flex flex-col mt-2">
                {/* <div className="font-semibo ld text-sm text-gray-50">{jobPost.organization?.name}</div> */}
                <NavLink to={`/job-posts/${jobPost.id}`} className="text-lg text-gray-50">{jobPost.role}</NavLink>
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
            <Icon
                className='absolute top-2 right-0 cursor-pointer hover:bg-white/20 rounded-md p-1'
                icon="charm:menu-kebab"
                width="24"
                height="24"
                onClick={() => setActiveJobPostMenu(!activeJobPostMenu)}
            />
            {activeJobPostMenu && (
                <motion.div
                    className="border-2  border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600 absolute top-5 right-3 bg-black p-3 rounded-lg shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ul className=''>
                        <li onClick={handleJobPostUpdate} className="my-1 cursor-pointer transition-all p-1 duration-200 text-sm flex hover:bg-white hover:bg-opacity-10 rounded-lg items-center gap-2 text-nowrap">
                            <Icon icon="material-symbols:update" width="18" height="18" />
                            <div>Update Job Post</div>
                        </li>
                        <li onClick={handleJobPostDelete} className="my-1 cursor-pointer p-1 transition-all duration-200 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                            <Icon icon="icons8:cancel" width="18" height="18" />
                            <div>Delete Job Post</div>
                        </li>
                        <li onClick={() => { viewJobApplications(); setActiveJobPostMenu(false); }} className="my-1 cursor-pointer p-1 transition-all duration-200 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                            <Icon icon="mdi:resume" width="18" height="18" />
                            <div>View Job Applications</div>
                        </li>
                    </ul>
                </motion.div>
            )}
            {children}
        </div>
    )
}

export default MyJobPostCard