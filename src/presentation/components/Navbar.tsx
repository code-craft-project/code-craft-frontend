import { NavLink } from 'react-router-dom';
import logo from '../../assets/Images/Logo.svg';
import profile from '../../assets/Images/profile.png';
import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import UserSessionContext from '../../application/contexts/UserSessionContext';
import {  motion } from "framer-motion"

function Navbar() {
    const userSession = useContext(UserSessionContext)
    const [activeMenu, setActiveMenu] = useState<boolean>(false); 
    const variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
    <motion.div 
        className={`w-full absolute gap-20 bg-black top-0 left-0 z-50 shadow-xl py-3 ${styles.container_cen}`}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
    >
        <NavLink to='/' className="flex items-center w-[15%]">
            <motion.img 
                src={logo} 
                alt="" 
                className="w-8 h-8" 
            />
            <h1 className=" font-medium text-md">Challenger mentality</h1>
        </NavLink>
        <motion.div className={`${styles.container_end} w-[68%] `}>
            <motion.div className={`${styles.container} w-96`}  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <NavLink to='/home' className='cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Home</NavLink>
                <NavLink to='/challenges' className='cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Challenges</NavLink>
                <NavLink to='/jobs-post' className='cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Job Posts</NavLink>
                <NavLink to='/events' className='cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Events</NavLink>
                {userSession.access_token == "" && (<NavLink to='sign-in' className='px-3 py-1 transition-transform  duration-300 rounded-xl bg-white bg-opacity-30 active:scale-105 hover:opacity-90'>Sign in</NavLink>)}
            </motion.div>
            {userSession.access_token !== "" && ( 
            <div className={`${styles.container} w-1/5 `}>
                <motion.div 
                    className='flex justify-around w-20'
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.5 }}
                >
                    <Icon icon="iconamoon:search-thin"  style={{color: "white"}} />
                    <motion.div 
                        className='relative cursor-pointer'
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className='w-3 h-3 flex justify-center items-center rounded-full absolute bottom-3 left-3 text-xs bg-red-600' style={{fontSize:"8px"}}>2</div>
                        <Icon icon="ri:notification-line"  style={{color: "white"}} />
                    </motion.div>
                </motion.div>
                <img 
                    src={profile} 
                    className='rounded-full relative h-10 w-10 border-3 cursor-pointer' 
                    alt="" 
                    onClick={() => setActiveMenu(!activeMenu) }     
                />
                {activeMenu && (
                    <motion.div 
                        className="absolute top-14 right-24 bg-white bg-opacity-10 z-50 w-36 h-32 p-5 rounded-lg shadow-sm overflow-hidden" 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul>
                            <li  onClick={() => setActiveMenu(!activeMenu) } className="my-3 text-sm flex hover:bg-white hover:bg-opacity-10 rounded-lg items-center gap-2 text-nowrap">
                                <Icon icon="material-symbols:settings" width="18" height="18" />
                                <NavLink to="/settings">Settings</NavLink>
                            </li>
                            <li onClick={() => setActiveMenu(!activeMenu) } className="my-3 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                <Icon icon="icon-park-solid:permissions" width="18" height="18" />
                                <a href="#">Other</a>
                            </li>
                            <li onClick={() => setActiveMenu(!activeMenu) } className="my-3 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                <Icon icon="tabler:logout" width="18" height="18" />
                                <a href="/logout">Logout</a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </div>)
            }
        </motion.div>
    </motion.div>
  )
}


const styles = {
    container: " flex justify-around items-center",
    container_between: " flex justify-between items-center",
    container_cen:' flex justify-center items-center',
    container_end:' flex justify-end items-center',
    btn: "px-16 py-2 rounded-lg ",
    btn_info: "bg-yellow-600",
    btn_success: "bg-green-600",
    btn_error: "bg-red-600",
};
export default Navbar