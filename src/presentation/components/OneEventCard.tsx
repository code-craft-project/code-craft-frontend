import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function OneEventCard({eventData}:{eventData:eventDataCard}) {
    const [imageSrc, setImageSrc] = useState<string | undefined>('');
    const [isOnGoing, setIsOnGoing] = useState<boolean>(false);
    const startDate:any = new Date(eventData.start_at);
    const endDate:any = new Date(eventData.end_at);

    useEffect(() => {
        const isEventHappeningNow = (): boolean => {
            const currentDate = new Date();   
            // Parse the ISO 8601 timestamps into Date objects
            return currentDate >= startDate && currentDate <= endDate;
        }

        setIsOnGoing(isEventHappeningNow())
       
    }, []);
    useEffect(() =>{
        if(isOnGoing){
            // Create an HTMLImageElement instance and set its src to the provided image URL
            const img: any = new Image();
            img.src = eventData.logo_url;
            img.onload = () => {
                setImageSrc(eventData.logo_url);
            };
        }  
    },[isOnGoing]);
  return (
    <div  className={`flex flex-col w-56 h-44 m-3 ${!isOnGoing ? 'border border-white rounded-xl border-opacity-35 px-1' : ''}`}>
        <div className=' overflow-hidden'>
        {isOnGoing
            ? <img src={imageSrc} alt={eventData.title} className='w-full h-[90%] hover:scale-110 transition-all duration-300'/>
            :   <div className='w-full py-10 hover:scale-110 transition-all duration-300'>
                    <span className='py-0.5 px-2 rounded-md bg-primary-blue my-2'>{startDate.getDate()}-{(startDate.getMonth()+ 1).toString().padStart(2, '0')}-{startDate.getFullYear()} {startDate.getHours().toString().padStart(2, '0')}:{startDate.getMinutes().toString().padStart(2, '0') }</span>
                </div>
        }
        </div>
        <div className={`flex items-end justify-between `}>
            <div className='flex flex-col items-start'>
                <NavLink to={'/single-event/2'} className='font-semibold cursor-pointer hover:text-primary-blue transition-color duration-200'>{eventData.title}</NavLink>
                <p className='text-xs opacity-75 ext-nowrap'>{startDate.getDate()}-{(startDate.getMonth()+ 1).toString().padStart(2, '0')}-{startDate.getFullYear()} {startDate.getHours().toString().padStart(2, '0')}:{startDate.getMinutes().toString().padStart(2, '0') } AM</p>
            </div>
            <button className='bg-white text-nowrap bg-opacity-30 rounded-md px-2 text-sm hover:bg-opacity-50 transition-color duration-100'>Learn More</button>
        </div>
    </div>
    )
}

export default OneEventCard