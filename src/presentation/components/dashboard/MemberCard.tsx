import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from "framer-motion";
import useOrganizationMember from "../../../application/hooks/useOrganizationMember";
import moment from "moment";
import { userProfilePicture } from "../../../application/consts";
import { useEffect, useState } from 'react';

function MemberCard({ memberData }: { memberData: MemberEntity } ) {
    const [activeEventMenu, setActiveEventMenu] = useState<boolean>(false);
    const { member, setMember, deleteMember, updateMember } = useOrganizationMember();
    const [isEditable,setIsEditable] = useState<boolean>(false)
    // const [role,setRole] = useState<MemberRole>(memberData.role)
    const handleDeleteMember = (member_id: number) => {
        setMember({ ...member, id: member_id });
        deleteMember();
        setActiveEventMenu(!activeEventMenu);
    };

    useEffect(() => {
        setMember(memberData);
    }, [memberData]);

    const handleRoleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(member)
        const updatedRole = ev.target.value as MemberRole;
        console.log(updatedRole)
        setMember((prevMember) => ({
            ...prevMember,
            role: updatedRole
        }));
    };
    useEffect(()=>{console.log(member)},[member])

    return (
        member ? (
            <div className="w-full flex items-center gap-2 md:gap-0 px-4 py-2 relative overflow-x-scroll scrollbar-none">
                <div className="flex-1">
                    <img src={member.user?.profile_image_url || userProfilePicture} className="w-10 h-10 bg-gray-800 rounded-full object-cover" />
                </div>
                <div className="flex-1 text-sm font-semibold text-nowrap text-gray-200">{member.user?.first_name}</div>
                <div className="flex-1 text-sm font-semibold text-nowrap text-gray-200">{member.user?.last_name}</div>
                {!isEditable 
                ? <div className="flex-1 text-sm font-semibold text-gray-200">{member.role}</div>
                :<div className='flex-1 text-sm font-semibold '>
                    <select className='py-1 px-2 bg-white/20 rounded-lg text-gray-200' value={member.role} onChange={handleRoleChange}>
                        <option value="events_manager">events_manager</option>
                        <option value="challenges_manager">challenges_manager</option>
                        <option value="job_posts_manager">job_posts_manager</option>
                    </select>
                </div>
                }
                <div className="flex-1 text-sm font-semibold text-nowrap text-gray-200">{moment(member.created_at).format("DD-MM-yyyy HH:mm")}</div>
                {!isEditable 
                ? <Icon
                    className='md:absolute top-4 right-16 md:right-8 cursor-pointer text-white hover:bg-white/20 rounded-md p-1'
                    icon="charm:menu-kebab"
                    width="24"
                    height="24"
                    onClick={() => setActiveEventMenu(!activeEventMenu)}
                    />
                :<div className="flex-1 flex items-center gap-3 absolute top-4 right-8 text-sm font-semibold text-gray-200">
                    <Icon className='text-green-500  cursor-pointer hover:opacity-75 transition-all duration-100 active:scale-105' onClick={()=> {updateMember(); setIsEditable(false)}} icon="material-symbols:save" width="18" height="18" />
                    <Icon icon="material-symbols:cancel" className="text-red-500 cursor-pointer hover:opacity-75 transition-all duration-100  active:scale-105" onClick={() => {setIsEditable(false); setMember({...member,role:memberData.role})}} width="18" height="18" />
                </div>
                }
                {activeEventMenu && (
                    <motion.div
                        className="absolute top-8 right-12 bg-black border-2 border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600 z-50 p-3 rounded-lg shadow-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className=''>
                            <li onClick={(ev) => { ev.preventDefault(); setActiveEventMenu(state => !state); setIsEditable(!isEditable)}} className="my-1 cursor-pointer transition-all p-1 duration-200 text-sm flex hover:bg-white hover:bg-opacity-10 rounded-lg items-center gap-2 text-nowrap">
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