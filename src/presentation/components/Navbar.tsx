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
    const [activeMenu, setActiveMenu] = useState<boolean>(false);

    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = (_p0: string) => { toastManager.alertSuccess('Success Message') }
    const alertErroreHandler = (_p0: string) => { toastManager.alertError("Error Message"); }

    const HandleSignOut = async () => {
        try {
            const response = await userAuthentication.signOut()
            if (response.status == "success") {
                signOut()
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
            alertErroreHandler("Creation failed");
        }
    }

    return (
        <motion.div
            className={`w-full shadow-xl ${styles.container_cen}`}
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            transition={{ duration: 0.5 }}
        >
            <NavLink to='/' className="flex items-center">
                <motion.img
                    src={logo}
                    alt=""
                    className="w-8 h-8"
                />
                <h1 className="ml-2 font-medium text-md">Challenger mentality</h1>
            </NavLink>
            <motion.div className={`${styles.container_end} flex-grow`}>
                <motion.div className={`${styles.container}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <NavLink to='/home' className='mr-8 cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Home</NavLink>
                    <NavLink to='/challenges' className='mr-8 cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Challenges</NavLink>
                    <NavLink to='/jobs-post' className='mr-8 cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Job Posts</NavLink>
                    <NavLink to='/events' className='mr-8 cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Events</NavLink>
                    {
                        (!userSession.isValidSession) && (
                            <NavLink to='sign-in' className='px-8 py-1 transition-transform duration-300 rounded-xl bg-yellow-600 text-gray-50 active:scale-105 flex items-center'>
                                <Icon icon="vaadin:sign-in" />
                                <div className='ml-2 font-semibold'>Sign In</div>
                            </NavLink>)
                    }
                </motion.div>
                {
                    (userSession.isValidSession) && (
                        <div className={`${styles.container}`}>
                            <motion.div
                                className='flex items-center mr-8'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <NavLink to={'/search'} className="mr-4">
                                    <Icon icon="iconamoon:search-thin" className='text-white hover:scale-105 transition-all duration-200 cursor-pointer' />
                                </NavLink>
                                <motion.div
                                    className='relative cursor-pointer'
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className='w-3 h-3 flex justify-center items-center rounded-full absolute bottom-3 left-3 text-xs bg-red-600' style={{ fontSize: "8px" }}>2</div>
                                    <Icon icon="ri:notification-line" style={{ color: "white" }} />
                                </motion.div>
                            </motion.div>
                            <img
                                src={profile}
                                className='rounded-full h-10 w-10 border-3 cursor-pointer'
                                alt=""
                                onClick={() => setActiveMenu(!activeMenu)}
                            />
                            {activeMenu && (
                                <motion.div
                                    className="absolute border-2  border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600 top-14 right-24 bg-white bg-opacity-10 z-50 w-52 h-44 p-5 rounded-lg shadow-sm overflow-hidden"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ul>
                                        <NavLink to="/settings" onClick={() => setActiveMenu(!activeMenu)} className="my-3 cursor-pointer transition-all duration-200  p-2 text-sm flex hover:bg-white hover:bg-opacity-10 rounded-lg items-center gap-2 text-nowrap">
                                            <Icon icon="material-symbols:settings" width="18" height="18" />
                                            <div>Settings</div>
                                        </NavLink>
                                        <NavLink to="/my-organizations" onClick={() => setActiveMenu(!activeMenu)} className="my-3 cursor-pointer transition-all duration-200  p-2 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                            <Icon icon="mdi:company" width="18" height="18" />
                                            <div>My Organizations</div>
                                        </NavLink>
                                        <li onClick={() => setActiveMenu(!activeMenu)} className="my-3 cursor-pointer transition-all duration-200  p-2 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                            <Icon icon="tabler:logout" width="18" height="18" />
                                            <button onClick={HandleSignOut}>Logout</button>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    )
                }
            </motion.div>
        </motion.div>
    )
}


const styles = {
    container: "flex items-center",
    container_between: " flex justify-between items-center",
    container_cen: ' flex justify-center items-center',
    container_end: ' flex justify-end items-center',
    btn: "px-16 py-2 rounded-lg ",
    btn_info: "bg-yellow-600",
    btn_success: "bg-green-600",
    btn_error: "bg-red-600",
};
export default Navbar