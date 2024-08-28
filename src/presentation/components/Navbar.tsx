import { NavLink } from 'react-router-dom';
import logo from '../../assets/Images/Logo.svg';
import profile from '../../assets/Images/profile.png';
import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import UserSessionContext from '../../application/contexts/UserSessionContext';
import { motion } from "framer-motion"
import useUserSession from '../../application/hooks/useUserSession';
import { userAuthentication } from '../../application/services';
import ToastContext from '../../application/contexts/ToastContext';
import { navbarVariants } from '../../application/data/FramerVariants';

function Navbar() {
    const userSession = useContext(UserSessionContext)
    const { signOut } = useUserSession()
    const [activeMenu, setActiveMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = (_p0: string) => { toastManager.alertSuccess('Success Message') }
    const alertErroreHandler = (_p0: string) => { toastManager.alertError("Error Message"); }

    const HandleSignOut = async () => {
        try {
            setActiveMenu(false);
            const response = await userAuthentication.signOut();
            if (response.status == "success") {
                signOut();
                alertSuccessHandler("Sign out successful");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                console.error('Sign out failed:', response.message);
                alertErroreHandler("Sign out failed");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Sign out failed");
        }
    }

    return (
        <motion.nav
            className={`w-full shadow-xl ${styles.container_cen} px-2 lg:px-8 absolute`}
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center w-full">
                {/* Logo */}
                <NavLink to='/' className="flex items-center">
                    <motion.img
                        src={logo}
                        alt="Logo"
                        className="w-8 h-8"
                    />
                    <h1 className="ml-2 font-medium text-md">Challenger mentality</h1>
                </NavLink>
                <div className="lg:hidden relative cursor-pointer">
                    <Icon icon="ri:notification-line" className='text-white' />
                    <div className="absolute -top-1 -right-2 bg-red-600 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                        2
                    </div>
                </div>
                {/* Menu Icon for Small Screens */}
                <button
                    className="lg:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Icon icon="mdi:menu" width="30" height="30" />
                </button>
                

                {/* Links for Medium and Larger Screens */}
                <motion.div className={`${styles.container_end} hidden lg:flex space-x-8`}>
                    <NavLink to='/home' className='menu__link'>Home</NavLink>
                    <NavLink to='/challenges' className='menu__link'>Challenges</NavLink>
                    <NavLink to='/job-posts' className='menu__link'>Job Posts</NavLink>
                    <NavLink to='/events' className='menu__link'>Events</NavLink>
                    {
                        (!userSession.isValidSession) && (
                            <NavLink to='sign-in' className='px-4 py-2 bg-yellow-600 text-gray-50 rounded-xl'>Sign In</NavLink>)
                    }
                </motion.div>

                {/* User Profile and Notifications for Logged-In Users */}
                {
                    userSession.isValidSession && (
                        <div className="hidden lg:flex items-center space-x-4">
                            <NavLink to='/search'>
                                <Icon icon="iconamoon:search-thin" className='text-white cursor-pointer' />
                            </NavLink>
                            <div className="relative cursor-pointer">
                                <Icon icon="ri:notification-line" className='text-white' />
                                <div className="absolute -top-1 -right-2 bg-red-600 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                                    2
                                </div>
                            </div>
                            <img
                                src={userSession.userSession.user?.profile_image_url || profile}
                                className='h-10 w-10 rounded-full cursor-pointer'
                                alt="Profile"
                                onClick={() => setActiveMenu(!activeMenu)}
                            />
                            {activeMenu && (
                                <motion.div
                                    className="absolute border-2  border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600 top-16 right-20 bg-black z-50 w-52 h-52 flex items-center justify-center rounded-lg shadow-sm overflow-hidden"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ul>
                                        <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-700">Settings</NavLink>
                                        <NavLink to="/organization/create" className="block px-4 py-2 hover:bg-gray-700">Create Organization</NavLink>
                                        <NavLink to="/my-organizations" className="block px-4 py-2 hover:bg-gray-700">My Organizations</NavLink>
                                        <li onClick={HandleSignOut} className="block px-4 py-2 cursor-pointer hover:bg-gray-700">Logout</li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    )
                }
            </div>

            {/* Dropdown Menu for Small Screens */}
            {isOpen && (
                <motion.div
                    className="lg:hidden flex flex-col space-y-4 mt-4 px-4 text-center absolute -top-4 py-8 right-0 inset-x-0 z-50 bg-black"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    exit={{ height: 0, opacity: 0 }}
                >
                    {/* Close Icon */}
                    <div className='w-full flex justify-end px-4'>
                        <Icon
                            icon="mingcute:close-line"
                            width="24"
                            height="24"
                            className='hover:bg-primary-yellow rounded-full hover:text-white'
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                    {
                    userSession.isValidSession && (
                        <div className="flex items-center justify-center space-x-4">
                            <img
                                src={userSession.userSession.user?.profile_image_url || profile}
                                className='h-10 w-10 rounded-full cursor-pointer'
                                alt="Profile"
                                onClick={() => setActiveMenu(!activeMenu)}
                            />
                            {activeMenu && (
                                <motion.div
                                    className="absolute border-2 border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600 top-20 md:top-16 right-20 bg-black z-50 w-52 h-52 flex items-center justify-center rounded-lg shadow-sm overflow-hidden"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ul>
                                        <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-700">Settings</NavLink>
                                        <NavLink to="/organization/create" className="block px-4 py-2 hover:bg-gray-700">Create Organization</NavLink>
                                        <NavLink to="/my-organizations" className="block px-4 py-2 hover:bg-gray-700">My Organizations</NavLink>
                                        <li onClick={HandleSignOut} className="block px-4 py-2 cursor-pointer hover:bg-gray-700">Logout</li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    )
                    }
                    {/* Navigation Links */}
                    <NavLink to='/home' className='menu__link' onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to='/challenges' className='menu__link' onClick={() => setIsOpen(false)}>Challenges</NavLink>
                    <NavLink to='/job-posts' className='menu__link' onClick={() => setIsOpen(false)}>Job Posts</NavLink>
                    <NavLink to='/events' className='menu__link' onClick={() => setIsOpen(false)}>Events</NavLink>
                    {
                        !userSession.isValidSession && (
                            <NavLink to='sign-in' className='px-4 py-2 bg-yellow-600 text-gray-50 rounded-xl' onClick={() => setIsOpen(false)}>Sign In</NavLink>
                        )
                    }
                    {
                        userSession.isValidSession && (
                            <div className="flex flex-col items-center">
                                <NavLink to='/search' className='text-white' onClick={() => setIsOpen(false)}>Search</NavLink>
                            </div>
                        )
                    }
                </motion.div>
            )}
        </motion.nav>
    );
}

const styles = {
    container_cen: 'flex justify-between items-center',
    container_end: 'flex items-center justify-end',
    menu__link: 'text-white opacity-60 hover:opacity-100 transition-all duration-300'
};

export default Navbar;