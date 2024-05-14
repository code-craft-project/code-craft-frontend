import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from "framer-motion";
import useOrganizationMember from "../../../application/hooks/useOrganizationMember";
import moment from "moment";
import { userProfilePicture } from "../../../application/consts";
import { useEffect, useState } from 'react';

function MemberCard({ memberData }: { memberData: { member: MemberEntity } }) {
    const [activeEventMenu, setActiveEventMenu] = useState<boolean>(false);
    const { member, setMember, deleteMember } = useOrganizationMember();

    const handleDeleteMember = (member_id: number) => {
        setMember({ ...member, user_id: member_id });
        deleteMember();
        setActiveEventMenu(!activeEventMenu);
    };

    useEffect(() => {
        setMember(memberData);
    }, [memberData]);

    return (
        member ? (
            <div className="w-full flex items-center px-4 py-2 relative">
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
                        className="absolute top-8 right-12 bg-black border-2 border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600 z-50 p-3 rounded-lg shadow-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className=''>
                            <li onClick={(ev) => { ev.preventDefault(); setActiveEventMenu(state => !state); }} className="my-1 cursor-pointer transition-all p-1 duration-200 text-sm flex hover:bg-white hover:bg-opacity-10 rounded-lg items-center gap-2 text-nowrap">
                                <Icon icon="material-symbols:update" width="18" height="18" />
                                <div>Update Role Member</div>
                            </li>
                            <li onClick={() => handleDeleteMember(member.user_id)} className="my-1 cursor-pointer p-1 transition-all duration-200 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                <Icon icon="icons8:cancel" width="18" height="18" />
                                <div>Delete Member</div>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </div>
        ) : <></>
    );
}

export default MemberCard;