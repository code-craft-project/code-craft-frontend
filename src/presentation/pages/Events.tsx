import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import Event from '../../assets/Images/Event.png';
import OneEventCard from '../components/OneEventCard';
import OneEventImg from '../../assets/Images/OneEventImg.png';
import useEvents from '../../application/hooks/useEvents';
function Events() {
    const {events} = useEvents();
    return (
        <div className="mt-20 p-16 mx-3">
            <div className='flex '>
                <div className='p-10 flex flex-col items-start'>
                    <h1 className='text-3xl'>Get ready to showcase your <br /> skills and compete in <br /> thrilling events challenges!</h1>
                    <div className='flex justify-start mt-16'>
                        <div className='flex '>
                            <Icon icon="iconoir:search" style={{ color: "black " }} className="bg-white rounded-l-sm flex h-10 w-10 px-3 cursor-pointer" />
                            <input type="text" placeholder="Public Events" className=" bg-white px-8 w-[20rem] py-2 text-black outline-none" />
                        </div>
                        <NavLink to="/sign-in" className="bg-primary-yellow bg-opacity-80  font-meduim px-4 py-2 rounded-r-sm ">Search</NavLink>
                    </div>
                </div>
                <div className='w-1/2 px-10'>
                    <img src={Event} alt="" className='scale-125 ' />
                </div>
            </div>
            <h2 className="font-semibold text-2xl p-10">Public Events</h2>
            <div className='flex flex-wrap w-[100%] px-10'>
                {events && events.map((event, index) => (
                    <div key={index}>
                        <OneEventCard eventData={{id:event.id as number, logo_url: OneEventImg, title: event.title, start_at: event.start_at, end_at: event.end_at }} />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Events