import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='w-full flex flex-col justify-around items-start px-20 my-5 h-52'>
        <div className='w-[40%] flex justify-around'>
            <h1 className='text-2xl'> Follow us</h1>
            <NavLink className='hover:opacity-85 transition-all duration-300 ' to='/'>
              <Icon icon="mdi:linkedin"  style={{color: "white" , height:"32px", width:"32px"}} />
            </NavLink>
            <NavLink className='hover:opacity-85 transition-all duration-300 ' to='/'>
              <Icon icon="mdi:github"  style={{color: "white" , height:"32px", width:"32px"}} />
            </NavLink>
            <NavLink className='hover:opacity-85 transition-all duration-300 ' to='/'>
              <Icon icon="ri:instagram-fill"  style={{color: "white" , height:"32px", width:"32px"}} />
            </NavLink>
        </div>
        <hr className=' w-[95%] border-1 ml-9 border-white'/>
        <div className='w-[50%] flex justify-around'>
                <NavLink className={`hover:opacity-85 transition-all duration-300 `} to='/'>Challenge mentality</NavLink>
                <NavLink className={`hover:opacity-85 transition-all duration-300 `} to='/about-us'>About us</NavLink>
                <NavLink className={`hover:opacity-85 transition-all duration-300 `} to='privacy'>Privacy</NavLink>
                <NavLink className={`hover:opacity-85 transition-all duration-300 `} to='terms'>Terms</NavLink>
        </div>
    </div>
  )
}

export default Footer