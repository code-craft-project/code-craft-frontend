import { NavLink } from 'react-router-dom';
import SingleEventImg from '../../assets/Images/SingleEventImg.png';
import OneChallengeCard from '../components/OneChallengeCard';
import { Icon } from '@iconify/react';
import GradientColor from '../components/GradiantColor';

function SingleEvent() {
  const { styles } = GradientColor();

  return (
    <div className="mt-24 px-28 flex flex-col items-center">
        <div className='flex '>
            <div className="w-1/2 pr-5">
                <h1 className="text-3xl py-5">GHack</h1>
                <p className='pt-5'>
                  gHack are a catalog of challenge based hackathons where attendees work in teams of 3 to 5 people to solve a series of technical challenges.                </p>
                <div className='py-1'>
                    <span className='opacity-60 mr-2'>Creator:</span>
                    <span>Company</span>
                </div>
                <div className='py-1'>
                    <span className='opacity-60 mr-2'>Start at:</span>
                    <span>03/02/2024</span>
                </div>
                <div className='py-1'>
                    <span className='opacity-60 mr-2'>End at:</span>
                    <span>03/15/2024</span>
                </div>
            </div>
            <div className='w-1/2'>
                <img src={SingleEventImg} alt="" className='rounded-[20px]'/>
            </div>
        </div>
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
              <span className='font-semibold text-lg'>Private</span>
              <div className='flex flex-col'>
                <span>-Front End </span><span>-Back End</span>
              </div>
            </div>
            <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
              <span className='font-semibold text-lg'>Days</span><span>3 days</span>
            </div>
            <div className={`w-32 h-32 p-5 flex flex-col items-center justify-center rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
              <span className='font-semibold text-lg'>Towards</span>
              <div  className='flex flex-col'>
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
                <hr className="w-[80%]"/>
                {Array.from({length: 8}).map((_,index)=>(
                <div key={index}>
                    <OneChallengeCard challenge={{status: 'Done', title: 'Bracket Combinations dsfdsf dsfsd', difficulty:'Hard', maximumScore: 13}}/>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default SingleEvent