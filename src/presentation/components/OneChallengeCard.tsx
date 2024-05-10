import { NavLink } from "react-router-dom"
import { Icon } from '@iconify/react';

type Challenge = {
    status: 'Done'|'Not Started',
    title: string,
    difficulty: 'Hard'|'Medium'|'Easy',
    maximumScore:number,
}
function OneChallengeCard({challenge}:  {challenge:Challenge}) {
  return (
    <div className="font-semibold flex items-center gap-16 py-2 ">
      <div className="w-[14rem]">
        <span className={`${challenge.status == 'Done' ? "bg-green-500" : "bg-white bg-opacity-50"} inline-block whitespace-nowrap rounded-xl px-2`}>{challenge.status}</span>
      </div>
      <div className="overflow-hidden w-80">
        <span className="inline-block w-full truncate cursor-pointer hover:text-primary-blue">{challenge.title}</span>
      </div>
      <span className={`${challenge.difficulty === 'Hard' ? "text-red-500" : challenge.difficulty === 'Easy' ? 'text-green-800' : 'text-[#FFA500]'} inline-block w-[10rem] `}>{challenge.difficulty}</span>
      <span className="inline-block min-w-[2rem]">{challenge.maximumScore}</span>
      <NavLink to='/' className='flex gap-2 items-center hover:underline'>
          <Icon icon="ph:chat-fill" style={{color: 'white'}} width="18" height="18" />
          Discussion
      </NavLink>
    </div>
  )
}

export default OneChallengeCard