import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import Event from '../../assets/Images/Event.png';
import OneEventCard from '../components/OneEventCard';
import OneEventImg from '../../assets/Images/OneEventImg.png';
import useEvents from '../../application/hooks/useEvents';
function Events() {
    const {events} = useEvents();
    return (
        <div className="w-full mt-20">
            <div className='w-full flex flex-col md:flex-row justify-between'>
                <div className='py-10 flex flex-col order-2 md:order-1 items-start'>
                    <h1 className='text-3xl'>Get ready to showcase your <br className='hidden md:block'/> skills and compete in <br className='hidden md:block'/> thrilling events challenges!</h1>
                    <div className='flex justify-start mt-16'>
                    <div className="flex relative ">
                        <input type="text" placeholder="Public Events" className=" bg-white rounded-l-sm px-10 w-full md:w-[22rem] py-2 text-black outline-primary-yellow" />
                        <Icon icon="iconoir:search" className=" h-10 w-10 px-2 cursor-pointer absolute left-0 text-black opacity-40" />
                    </div>
                    <NavLink to="/search" className="bg-primary-yellow bg-opacity-80  font-medium px-4 py-2 rounded-r-sm ">Search</NavLink>
                    </div>
                </div>
                <div className='md:w-1/2 order-1 md:order-2 w-full px-10'>
                    <img src={Event} alt="" className='md:scale-125 ' />
                </div>
            </div>
            <h2 className="w-full font-semibold text-2xl py-6">Public Events</h2>
            <div className='flex flex-wrap justify-center md:justify-start w-full'>
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