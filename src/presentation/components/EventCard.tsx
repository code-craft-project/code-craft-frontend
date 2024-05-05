import { Icon } from '@iconify/react/dist/iconify.js';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { eventLogoPicture } from '../../application/consts';

interface EventCardProps {
    event: EventEntity;
};

function EventCard({ event }: EventCardProps) {
    return (
        <div className='w-full flex flex-col'>
            <NavLink to={`/events/${event.id}`} className={`flex flex-col w-full h-full`}>
                <div className='rounded-lg overflow-hidden'>
                    <img src={event.logo_url || eventLogoPicture} alt={event.title} className='w-full object-contain rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer' />
                </div>
                <div className={`flex items-end justify-between mt-2`}>
                    <div className='flex flex-col items-start'>
                        <div className='font-semibold cursor-pointer hover:text-gray-300 transition-color duration-200'>{event.title}</div>
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
            </NavLink>
        </div>

    )
}

export default EventCard;