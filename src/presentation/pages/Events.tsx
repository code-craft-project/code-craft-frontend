import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import Event from '../../assets/Images/Event.png';
import OneEventCard from '../components/OneEventCard';
import OneEventImg from '../../assets/Images/OneEventImg.png';

function Events() {

  return (
    <div className="mt-20 p-16 mx-3">   
        <div className='flex '>
            <div className='p-10 flex flex-col items-start'>
                <h1 className='text-3xl'>Get ready to showcase your <br /> skills and compete in <br /> thrilling events challenges!</h1>
                <div className='flex justify-start mt-16'>
                    <div className='flex '>
                        <Icon icon="iconoir:search"  style={{color: "black "}}   className="bg-white rounded-l-sm flex h-10 w-10 px-3 cursor-pointer"/>
                        <input type="text" placeholder="Public Events" className=" bg-white px-8 w-[20rem] py-2 text-black outline-none"/>
                    </div>
                    <NavLink to="/sign-in" className="bg-primary-yellow bg-opacity-80  font-meduim px-4 py-2 rounded-r-sm ">Search</NavLink>
                </div>
            </div>
            <div className='w-1/2 px-10'>
                <img src={Event} alt="" className='scale-125 '/>
            </div>
        </div>
        <h2 className="font-semibold text-2xl p-10">Public Events</h2>
        <div className='flex flex-wrap w-[100%] px-10'>
            {Array.from({length:10}).map((_,index)=>(
                <div key={index}>
                    <OneEventCard eventData={{logo_url:OneEventImg, title:'#101Tech', start_at:'2024-04-20T19:00:00Z', end_at:'2024-04-25T19:00:00Z'}}/>
                </div>
            ))}
        </div>

    </div>
  )
}

export default Events