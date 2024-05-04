import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='w-full flex flex-col items-start my-5'>
      <div className='flex items-center justify-around'>
        <h1 className='text-gray-50 text-lg font-medium mr-8'>Follow Us:</h1>
        <NavLink className='hover:opacity-85 text-gray-50 transition-all duration-300 mr-4' to='/'>
          <Icon icon="mdi:linkedin" style={{ color: "white", height: "24px", width: "24px" }} />
        </NavLink>
        <NavLink className='hover:opacity-85 text-gray-50 transition-all duration-300 mr-4' to='/'>
          <Icon icon="mdi:github" style={{ color: "white", height: "24px", width: "24px" }} />
        </NavLink>
        <NavLink className='hover:opacity-85 text-gray-50 transition-all duration-300 mr-4' to='/'>
          <Icon icon="ri:instagram-fill" style={{ color: "white", height: "24px", width: "24px" }} />
        </NavLink>
      </div>
      <hr className='w-full border-1 border-white my-4' />
      <div className='w-full flex items-center'>
        <NavLink className={`hover:opacity-85 transition-all duration-300 mr-8 text-gray-50 text-sm font-medium hover:text-gray-300`} to='/'>Challenge mentality</NavLink>
        <NavLink className={`hover:opacity-85 transition-all duration-300 mr-8 text-gray-50 text-sm font-medium hover:text-gray-300`} to='/about-us'>About us</NavLink>
        <NavLink className={`hover:opacity-85 transition-all duration-300 mr-8 text-gray-50 text-sm font-medium hover:text-gray-300`} to='privacy'>Privacy</NavLink>
        <NavLink className={`hover:opacity-85 transition-all duration-300 mr-8 text-gray-50 text-sm font-medium hover:text-gray-300`} to='terms'>Terms</NavLink>
      </div>
    </div>
  )
}

export default Footer