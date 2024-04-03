import { NavLink } from 'react-router-dom';
import logo from '../../assets/Images/Logo.svg';
import profile from '../../assets/Images/profile.png';
import { Icon } from '@iconify/react';

function Navbar() {
  return (
    <div className={`w-full absolute bg-black top-0 left-0 z-50 shadow-xl py-3 ${styles.container_cen}`}>
        <NavLink to='/' className="flex items-center w-[15%]">
            <img src={logo} alt="" className="w-8 h-8" />
            <h1 className=" font-medium text-md">Challenger mentality</h1>
        </NavLink>
        <div className={`${styles.container_end} w-[68%] `}>
            <div className={`${styles.container} w-96`}>
                <NavLink to='/home' className='cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Home</NavLink>
                <NavLink to='/challenges' className='cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Challenges</NavLink>
                <NavLink to='/jobs_post' className='cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Job Posts</NavLink>
                <NavLink to='/events' className='cursor-pointer opacity-60 hover:opacity-80 transition-all duration-500 menu__link'>Events</NavLink>
                <NavLink to='sign_in' className='px-3 py-1 transition-transform  duration-300 rounded-xl bg-white bg-opacity-30 active:scale-105 hover:opacity-90'>Sign in</NavLink>
            </div>
            {/* <div className={`${styles.container} w-1/5 `}>
                <div className='flex justify-around w-20'>
                    <Icon icon="iconamoon:search-thin"  style={{color: "white"}} />
                    <div className='relative cursor-pointer'>
                        <div className='w-3 h-3 flex justify-center items-center rounded-full absolute bottom-3 left-3 text-xs bg-red-600' style={{fontSize:"8px"}}>2</div>
                        <Icon icon="ri:notification-line"  style={{color: "white"}} />
                    </div>
                </div>
                <img src={profile} className='rounded-full h-10 w-10 border-3' alt="" />
            </div> */}

        </div>
    </div>
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