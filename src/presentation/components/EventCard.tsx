import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import usePopup from '../../application/hooks/usePopup';

interface EventCardProps {
    event: EventEntity;
};

function EventCard({ event }: EventCardProps) {
        const {children, onopen} = usePopup({title:'event',method:'update',id:event.id})
        const isOnGoing = () => {
        const startDate = new Date(event.start_at);
        const endDate = new Date(event.end_at);
        const currentDate = new Date();
        
        return (currentDate >= startDate) && (currentDate <= endDate);
    }
    const [activeEventMenu, setActiveEventMenu] = useState<boolean>(false); 

    const handleEventUpdate = () => {
        console.log("first")
        setActiveEventMenu(!activeEventMenu) 
        onopen()
    }
    return (
        <div className='w-full flex flex-col'>
            <div className={`flex relative flex-col w-full h-full ${!isOnGoing() ? 'border border-white rounded-xl border-opacity-35 px-1' : ''}`}>
                <div className='rounded-lg overflow-hidden '>
                    {
                        isOnGoing() ? (
                            <img src={event.logo_url} alt={event.title} className='w-full object-contain rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer' />
                        ) : (
                            <div className='w-full py-10 hover:scale-110 transition-all duration-300'>
                                <span className='py-0.5 px-2 rounded-md bg-primary-blue my-2'>{moment(new Date(event.start_at)).format("DD-MM-YYYY HH:mm:ss")}</span>
                            </div>
                        )
                    }
                    <Icon
                        className='absolute top-2 right-0 z-50 cursor-pointer hover:bg-white/20 rounded-md p-1' 
                        icon="charm:menu-kebab" 
                        width="24"
                        height="24"
                        onClick={() => setActiveEventMenu(!activeEventMenu) }     
                    />
                {activeEventMenu && (
                    <motion.div 
                        className="absolute top-5 right-3 bg-black border-2  border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600 z-50 w-36 h-24 p-3 rounded-lg shadow-sm overflow-hidden" 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className=''>
                            <li  onClick={handleEventUpdate}  className="my-1 cursor-pointer transition-all p-1 duration-200 text-sm flex hover:bg-white hover:bg-opacity-10 rounded-lg items-center gap-2 text-nowrap">
                                <Icon icon="material-symbols:update" width="18" height="18" />
                                <div>Update Event</div>
                            </li>
                            <li onClick={() => setActiveEventMenu(!activeEventMenu) } className="my-1 cursor-pointer p-1 transition-all duration-200 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                <Icon icon="icons8:cancel" width="18" height="18" />
                                <NavLink to="/my-organizations">Delete Event</NavLink>
                            </li>
                        </ul>
                    </motion.div>
                )}
                </div>
                <div className={`flex items-end justify-between mt-2`}>
                    <div className='flex flex-col items-start'>
                        <NavLink to={`/single-event/${event.id}`} className='font-semibold cursor-pointer hover:text-primary-blue transition-color duration-200'>{event.title}</NavLink>
                        {/* <div className='text-sm text-gray-400 font-medium'>{event.description}</div> */}
                        <p className='text-xs opacity-75 mt-2'>{moment(new Date(event.start_at)).format("DD-MM-YYYY HH:mm:ss")}</p>
                        <div className='flex items-center mt-2'>
                            {event.is_public ? (<Icon icon="material-symbols:public" />) : ""}
                            {!event.is_public ? (<Icon icon="material-symbols:lock" />) : ""}
                            <div className='ml-1 text-sm font-semibold'>{event.is_public ? "Public" : "Private"}</div>
                        </div>
                        <div className='flex items-center mt-2'>
                            {event.is_team_based ? (<Icon icon="fluent:people-team-20-filled" />) : ""}
                            <div className='ml-1 text-sm font-semibold'>{event.is_team_based ? "Team based" : ""}</div>
                        </div>
                    </div>
                    {/* <button className='bg-white text-nowrap bg-opacity-30 rounded-md px-2 text-sm hover:bg-opacity-50 transition-color duration-100'>Learn More</button> */}
                </div>
            </div>
            {children}
        </div>

    )
}

export default EventCard;