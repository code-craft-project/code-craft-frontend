import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import moment from "moment";
import LoadingIndicator from "../LoadingIndicator";
import { userProfilePicture } from "../../../application/consts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import useOrganizationMember from "../../../application/hooks/useOrganizationMember";

export default function OrganizationMembers() {
    const { id } = useParams();
    const { members, getOrganizationMembers, isMembersLoading } = useContext(OrganizationDashboardContext);
    const [activeEventMenu, setActiveEventMenu] = useState<boolean>(false);
    const {member, setMember, deleteMember} = useOrganizationMember()
    useEffect(() => {
        if (id && isMembersLoading) {
            getOrganizationMembers(parseInt(id));
        }
    }, [id]);

    const handleDeleteMember = (member_id: number) => {
        setMember({ ...member, user_id: member_id }); 
        deleteMember();
        setActiveEventMenu(!activeEventMenu);
    };

    return (
        <div className="w-full h-full flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-8 py-5">
            <div className="w-full flex mb-8">
                <div className="w-full flex flex-col items-start">
                    <div className="text-3xl font-bold">Members</div>
                    <div className="text-xs text-gray-300">{"Manage your organization members and their account permissions here"}</div>
                </div>
                <button
                    className={`w-fit font-meduim px-8 py-1 rounded-lg hover:opacity-90 active:scale-105 transition-all duration-300 bg-primary-yellow text-nowrap flex items-center mb-8`}
                >
                    <Icon icon="tdesign:member" width="18" height="18" />
                <div className="ml-2 font-medium">Add Member</div>
                </button>
            </div>
            <div className="w-full flex-grow flex flex-col">
                <div className="w-full flex items-center bg-gray-900 rounded-lg px-4 py-2">
                    <div className="flex-1 text-sm font-semibold text-gray-200">Profile Picture</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200">First Name</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200">Last Name</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200">Role</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200">Joined At</div>
                </div>
                <div className="w-full flex-grow overflow-auto">
                    {
                        isMembersLoading && (
                            <div className="w-full flex flex-col items-center">
                                <LoadingIndicator />
                            </div>
                        )
                    }
                    {
                        members.map((member, index) => {
                            return (
                                <div key={index} className="w-full flex items-center px-4 py-2 relative">
                                    <div className="flex-1">
                                        <img src={member.user?.profile_image_url || userProfilePicture} className="w-10 h-10 bg-gray-800 rounded-full object-cover" />
                                    </div>
                                    <div className="flex-1 text-sm font-semibold text-gray-200">{member.user?.first_name}</div>
                                    <div className="flex-1 text-sm font-semibold text-gray-200">{member.user?.last_name}</div>
                                    <div className="flex-1 text-sm font-semibold text-gray-200">{member.role}</div>
                                    <div className="flex-1 text-sm font-semibold text-gray-200">{moment(member.created_at).format("DD-MM-yyyy HH:mm")}</div>
                                    <Icon
                                        className='absolute top-4 right-8 cursor-pointer text-white hover:bg-white/20 rounded-md p-1'
                                        icon="charm:menu-kebab"
                                        width="24"
                                        height="24"
                                        onClick={() => setActiveEventMenu(!activeEventMenu)}
                                    />
                                    {activeEventMenu && (
                                        <motion.div
                                            className="absolute top-8 right-12 bg-black border-2  border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600 z-50 p-3 rounded-lg shadow-sm"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ul className=''>
                                                <li onClick={(ev) => { ev.preventDefault(); setActiveEventMenu(state => !state); }} className="my-1 cursor-pointer transition-all p-1 duration-200 text-sm flex hover:bg-white hover:bg-opacity-10 rounded-lg items-center gap-2 text-nowrap">
                                                    <Icon icon="material-symbols:update" width="18" height="18" />
                                                    <div>Update Role Member</div>
                                                </li>
                                                <li onClick= {() => { handleDeleteMember(member.user_id)}} className="my-1 cursor-pointer p-1 transition-all duration-200 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                                    <Icon icon="icons8:cancel" width="18" height="18" />
                                                    <div>Delete Member</div>
                                                </li>
                                            </ul>
                                        </motion.div>
                                    )}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                (members.length > 10) && (
                    <div className="w-full flex items-center justify-end">
                        <div className="text-gray-50 bg-yellow-600 rounded-lg px-8 py-1 font-semibold cursor-pointer hover:bg-gray-700 duration-300">Next</div>
                    </div>
                )
            }
        </div>
    )
}
