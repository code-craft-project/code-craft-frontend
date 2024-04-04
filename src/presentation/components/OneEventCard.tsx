import { useEffect, useState } from 'react';
// import OneEventImg from '../../assets/Images/OneEventImg.png';
type eventData = {
    image:string,
    title:string,
    date:string,
}
function OneEventCard({eventData}:{eventData:eventData}) {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        // Create an HTMLImageElement instance and set its src to the provided image URL
        const img = new Image();
        img.src = eventData.image;
        img.onload = () => {
            setImageSrc(eventData.image);
        };
    }, [eventData.image]);
  return (
    <div className='flex flex-col w-56 h-44 m-3 '>
        <div className=' overflow-hidden'>

        <img src={imageSrc} alt={eventData.title} className='w-full h-[60%] hover:scale-110 transition-all duration-300'/>
        </div>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start'>
                <h1 className='font-semibold cursor-pointer hover:text-primary-blue transition-color duration-200'>{eventData.title}</h1>
                <p className='text-sm opacity-75'>{eventData.date}</p>
            </div>
            <button className='bg-white bg-opacity-30 rounded-md px-2 text-sm hover:bg-opacity-50 transition-color duration-100'>Learn More</button>
        </div>
    </div>
  )
}

export default OneEventCard