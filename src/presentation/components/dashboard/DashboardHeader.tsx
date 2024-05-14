import { NavLink } from 'react-router-dom';
import profile from '../../../assets/Images/profile.png';
import { useContext, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import { navbarVariants } from '../../../application/data/FramerVariants';
import OrganizationDashboardContext from '../../../application/contexts/OrganizationDashboardContext';
import { organizationProfilePicture } from '../../../application/consts';
import { Icon } from '@iconify/react/dist/iconify.js';
import UserSessionContext from '../../../application/contexts/UserSessionContext';

export default function DashboardHeader() {
    const { signOut } = useContext(UserSessionContext);
    const { organization, member } = useContext(OrganizationDashboardContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.div
            className={`shadow-xl w-full flex justify-between items-center px-8 bg-gray-900 py-2 rounded-xl mt-2`}
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center">
                <img
                    src={organization.profile_image_url || organizationProfilePicture}
                    alt=""
                    className="w-8 h-8 rounded-full"
                />
                <h1 className="ml-2 font-medium text-md">{organization.name}</h1>
            </div>
            <div className='flex items-center relative'>
                <div className='mr-8 cursor-pointer select-none active:scale-125 duration-300 text-gray-50 relative'>
                    <Icon icon="ri:notification-line" />
                    <div className='w-3 h-3 text-center align-middle bg-red-600 rounded-full absolute -top-1 -right-1 text-[8px]'>2</div>
                </div>
                <div onClick={() => { setIsMenuOpen(state => !state); }} className='flex items-center cursor-pointer select-none active:scale-110 duration-300'>
                    <img
                        src={`${member.user?.profile_image_url || profile}`}
                        className='rounded-full h-10 w-10 cursor-pointer border-3 border-gray-50'
                        alt=""
                    />
                    <div className='ml-2 flex flex-col'>
                        <div className='text-sm text-gray-50 font-semibold'>{member.user?.username}</div>
                        <div className='text-xs text-gray-400 capitalize'>{member.role.split("_").join(" ")}</div>
                    </div>
                    <div className='text-gray-50 ml-2'>
                        <Icon icon="mingcute:down-fill" />
                    </div>
                </div>
                <div className='absolute right-0 top-2/3'>
                    <AnimatePresence>
                        {
                            isMenuOpen && (
                                <motion.div
                                    variants={{
                                        open: {
                                            marginTop: '0.5rem',
                                            opacity: 1
                                        },
                                        close: {
                                            marginTop: '-0.5rem',
                                            opacity: 0
                                        }
                                    }}
                                    animate='open'
                                    initial='close'
                                    exit='close'
                                    className='flex flex-col bg-gray-800 rounded-lg shadow-lg shadow-gray-700 py-2 min-w-52'>
                                    <NavLink to={'/home'}>
                                        <div className='w-full flex items-center py-2 hover:bg-gray-700 cursor-pointer rounded-lg px-8 text-gray-50 duration-300'>
                                            <div><Icon icon="ic:round-home" /></div>
                                            <div className='ml-2 text-nowrap'>Home</div>
                                        </div>
                                    </NavLink>
                                    <div onClick={() => { signOut(); }} className='w-full flex items-center py-2 hover:bg-gray-700 cursor-pointer rounded-lg px-8 text-gray-50 duration-300'>
                                        <div><Icon icon="material-symbols:logout" /></div>
                                        <div className='ml-2 text-nowrap'>Sign Out</div>
                                    </div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}