import OneEventCard from '../components/OneEventCard';
import OneEventImg from '../../assets/Images/OneEventImg.png';
import OrganizationImg from '../../assets/Images/OrganizationImg.png';
import OneChallengeCard from '../components/OneChallengeCard';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

function SingleOrganization() {
  return (
    <div className="mt-24 px-28">
        <div className='flex'>
            <div className="w-1/2 pr-5">
                <h1 className="text-3xl py-5">Microsoft</h1>
                <p className='pt-5'>
                    Microsoft Corporation is an American multinational corporation and technology company headquartered in Redmond, Washington. It is also incorporated in Washington.Microsoft's best-known software products are the Windows line of operating systems, the Microsoft 365 suite of productivity applications, and the Edge web browser. 
                </p>
                <div className='py-2'>
                    <span className='opacity-60 mr-2'>Owner:</span>
                    <span>Bill Gates</span>
                </div>
                <div className='py-2'>
                    <span className='opacity-60 mr-2'>Organization Type:</span>
                    <span>Company</span>
                </div>
            </div>
            <div className='w-1/2'>
                <img src={OrganizationImg} alt="" className='rounded-[20px]'/>
            </div>
        </div>
        <div className='my-20'>
            <h1 className="text-3xl mb-10">Company events</h1>
            <div className='flex flex-wrap w-[100%] '>
                {Array.from({length:7}).map((_,index)=>(
                    <div key={index}>
                        <OneEventCard eventData={{image:OneEventImg, title:'#101Tech', date:'Mars 01 10:00 AM'}}/>
                    </div>
                ))}
            </div>          
        </div>
        <div className="text-sm my-20 w-[60%] ml-2">
            <h1 className="text-3xl py-5">Company Challenges</h1>
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
            <div className='flex justify-end w-full'>
                <NavLink to='/challenges' className='px-5 flex py-2 my-3 border transition-all duration-300 rounded-lg border-white hover:scale-105 hover:bg-white hover:text-black'>
                    Show all company challenges
                    <Icon icon="material-symbols-light:double-arrow" width="18" height="18" />
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default SingleOrganization