import {  useParams } from 'react-router-dom';
import SingleEventImg from '../../assets/Images/SingleEventImg.png';
import OneChallengeCard from '../components/OneChallengeCard';
import { Icon } from '@iconify/react';
import GradientColor from "../../application/data/GradientColor.ts";
import useEvent from '../../application/hooks/useEvent.ts';
import { useEffect, useState } from 'react';

function SingleEvent() {
  const { styles } = GradientColor();
  const { event, getEventById, getEventChallenges, eventChallenges } = useEvent()
  const {id} = useParams()
  const [days,setDays] = useState<number>()

  useEffect(() => {
    if(id) {
      getEventById(parseInt(id))
      getEventChallenges(parseInt(id))
    }
  }, [])

  useEffect(() => {
    if (event.start_at && event.end_at) {
    setDays(calculateDays(event.start_at, event.end_at))
    }
  },[event]);

  const calculateDays = (startDateString:string, endDateString:string):number  => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return days;
  }

  return (
    <div className="mt-24 px-28 flex flex-col items-center">
      {event && (
        <div className='flex '>
          <div className="w-1/2 pr-5">
            <h1 className="text-3xl py-5">{event.title}</h1>
            <p className='pt-5'>{event.description}</p>
            <div className='py-1'>
              <span className='opacity-60 mr-2'>Creator:</span>
              <span>{event.organization_id}</span>
            </div>
            <div className='py-1'>
              <span className='opacity-60 mr-2'>Start at:</span>
              <span>{event.start_at}</span>
            </div>
            <div className='py-1'>
              <span className='opacity-60 mr-2'>End at:</span>
              <span>{event.end_at}</span>
            </div>
          </div>
          <div className='w-1/2'>
              <img src={event.logo_url ?event.logo_url  :SingleEventImg} alt="" className='rounded-[20px]' />
          </div>
        </div>
      )}
      <div className='my-20 w-full flex flex-col items-center'>
        <h1 className="text-3xl py-10 text-center">Features</h1>
        <div className='flex justify-around w-[90%]'>
          <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active}  ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <span className='font-semibold text-lg'>Topics</span>
            <div className='flex flex-col'>
              <span>-Front End</span>
              <span>-Back End</span>
            </div>
          </div>
          <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <span className='font-semibold text-lg'>{event.is_public? `${<Icon icon="material-symbols:public" width="18" height="18" />} Public`: `${<Icon icon="simple-icons:privateinternetaccess" width="18" height="18" />} Private`}</span>
            <div className='flex flex-col'>
              <span>-Front End </span><span>-Back End</span>
            </div>
          </div>
          <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <span className='font-semibold text-lg'>Days</span><span>{days} days</span>
          </div>
          <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <span className='font-semibold text-lg'>Towards</span>
            <div className='flex flex-col'>
              <span>-First</span><span>-Second</span><span>-Three</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm mb-20 w-[60%] ml-2 ">
        <h1 className="text-3xl py-5 text-center">Event Challenges</h1>
        <div >
          <div className="flex items-center py-2 w-[80%] gap-16">
            <div className="w-[14rem]">
              <span className=" px-2">Status</span>
            </div>
            <div className=" w-80 text-center">
              <span>Title</span>
            </div>
            <span className="w-[10rem] text-end">Difficulty</span>
            <span className="text-nowrap">Maximum Score</span>
          </div>
          <hr className="w-[80%]" />
          {eventChallenges.map((challenge, index) => (
            <div key={index}>
              <OneChallengeCard challenge={{ status: challenge.status, title: challenge.title, difficulty: challenge.level , maximumScore: challenge.score }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleEvent