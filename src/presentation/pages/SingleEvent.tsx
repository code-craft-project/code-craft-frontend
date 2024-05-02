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
            <div className="text-3xl py-5">{event.title}</div>
            <div className='pt-5'>
              <div className='font-semibold text-lg'>Description:</div>
              {event.description}
            </div>
            <div className='py-1 flex items-center gap-2'>
              <Icon className='opacity-60' icon="icons8:organization" width="18" height="18" />
              <div className='opacity-60 mr-2'>Creator:</div>
              <div>{event.organization_id}</div>
            </div>
            <div className='py-1 flex items-center gap-2'>
              <Icon className='opacity-60' icon="icon-park-solid:stopwatch-start" width="18" height="18" />
              <div className='opacity-60 mr-2'>Start at:</div>
              <div>{event.start_at}</div>
            </div>
            <div className='py-1 flex items-center gap-2'>
              <Icon className='opacity-60' icon="mdi:clock-end" width="18" height="18" />
              <div className='opacity-60 mr-2'>End at:</div>
              <div>{event.end_at}</div>
            </div>
            {event.is_team_based && 
            (<div className='py-1 flex items-center gap-2'>
              <div className='flex items-center gap-2'>
                <Icon className='opacity-60' icon="fluent:people-team-16-filled" width="18" height="18" />
                <div className=' mr-2 opacity-60'>Team based:</div>
                {/* <div>{event.is_team_based ? 'true' : 'false'},</div> */}
              </div>
              <div className='flex items-center gap-2'>
                <div>Max Team Members:</div>
                <div>{event.max_team_members}</div>
              </div>
            </div>
            )}
          </div>
          <div className='w-1/2'>
              <img src={event.logo_url ?event.logo_url  :SingleEventImg} alt="" className='rounded-[20px]' />
          </div>
        </div>
      )}
      <div className='my-20 w-full flex flex-col items-center'>
        <div className="text-3xl py-10 text-center">Features</div>
        <div className='flex justify-around w-[90%]'>
          <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active}  ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <div className='font-semibold text-lg flex items-center gap-1'><Icon icon="material-symbols:topic" width="18" height="18" />Topics</div>
            <div className='flex flex-col'>
              <div>- Front End</div>
              <div>- Back End</div>
            </div>
          </div>
          <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <div className='font-semibold text-lg flex '>{event.is_public? <div className='flex items-center gap-2'> <Icon icon="ic:baseline-public" width="18" height="18" /> Public </div>: <div className='flex items-center gap-2'> <Icon icon="simple-icons:privateinternetaccess" width="18" height="18" /> Private </div>}</div>
          </div>
          <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <div className='font-semibold text-lg flex items-center gap-1'><Icon icon="ci:calendar-days" width="18" height="18" />Days</div><div>{days} days</div>
          </div>
          <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <div className='font-semibold text-lg'>Towards</div>
            <div className='flex flex-col'>
              <div>- First</div><div>- Second</div><div>- Three</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm mb-20 w-[60%] ml-2 ">
        <div className="text-3xl py-5 text-center">Event Challenges</div>
        <div >
          <div className="flex items-center py-2 w-[80%] gap-16">
            <div className="w-[14rem]">
              <div className=" px-2">Status</div>
            </div>
            <div className=" w-80 text-center">
              <div>Title</div>
            </div>
            <div className="w-[10rem] text-end">Difficulty</div>
            <div className="text-nowrap">Maximum Score</div>
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