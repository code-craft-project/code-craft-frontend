import OneEventCard from "../OneEventCard"
import OneEventImg from '../../../assets/Images/OneEventImg.png';

function Events() {
  return (
    <div>
        <div className="mx-28 bg-white bg-opacity-10 mt-10 rounded-xl">
            <h1 className="m-5 pt-5 text-lg font-semibold">Ongoing Events</h1>
            <div className='flex flex-wrap w-[100%] px-2'>
                {Array.from({length:10}).map((_,index)=>(
                    <div key={index} className="m-1">
                        <OneEventCard eventData={{logo_url:OneEventImg, title:'#101Tech', start_at:'2024-03-26T19:00:00Z', end_at:'2024-05-28T19:00:00Z'}}/>
                    </div>
                ))}
            </div>
        </div>
        <div className="mx-28 mt-14 bg-white bg-opacity-10 rounded-xl">
            <h1 className="m-5 pt-5 text-lg font-semibold">Upcoming Events</h1>
            <div className='flex flex-wrap w-[100%] '>
                {Array.from({length:8}).map((_,index)=>(
                    <div key={index}>
                    <OneEventCard eventData={{logo_url:OneEventImg, title:'#101Tech', start_at:'2024-05-26T19:00:00Z', end_at:'2024-05-28T19:00:00Z'}}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Events