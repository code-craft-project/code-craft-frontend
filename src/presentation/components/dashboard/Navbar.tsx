import { NavLink } from 'react-router-dom';
import logo from '../../../assets/Images/Logo.svg';
import profile from '../../../assets/Images/profile.png';
import { Icon } from '@iconify/react';
import { useContext } from 'react';
import UserSessionContext from '../../../application/contexts/UserSessionContext';
import { motion } from "framer-motion"
import { navbarVariants } from '../../../application/data/FramerVariants';

function Navbar() {
    const userSession = useContext(UserSessionContext)

    return (
        <motion.div
            className={`shadow-xl ${styles.container_cen} w-11/12 ml-12 flex justify-center items-center px-8 bg-gray-900 rounded-lg py-2`}
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
                {
                    (userSession.isValidSession) && (
                        <div className={`${styles.container}`}>
                            <motion.div
                                className='flex items-center mr-8'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.div
                                    className='relative cursor-pointer'
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className='w-3 h-3 flex justify-center items-center rounded-full absolute bottom-3 left-3 text-xs bg-red-600' style={{ fontSize: "8px" }}>2</div>
                                    <Icon icon="ri:notification-line" style={{ color: "white" }} />
                                </motion.div>
                            </motion.div>
                            <NavLink to={'/settings'}>
                                <img
                                    src={`${userSession.userSession.user?.profile_image_url ? userSession.userSession.user?.profile_image_url :profile}`}
                                    className='rounded-full h-10 w-10 border-3 cursor-pointer'
                                    alt=""
                                />
                            </NavLink>
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