import { NavLink } from "react-router-dom"
import { Icon } from '@iconify/react';

type Challenge = {
    status: 'Done'|'Not Started',
    title: string,
    difficulty: 'Hard'|'Meduim'|'Easy',
    maximumScore:number,
}
function OneChallengeCard({challenge}:  {challenge:Challenge}) {
  return (
    <div className="font-semibold flex   items-center gap-20 py-2">
        <span className={`${challenge.status == 'Done' ? "bg-green-500" : "bg-white opacity-50"} rounded-xl px-2`}>{challenge.status}</span>
        <span className="inline-block min-w-[3rem]">{challenge.title}</span>
        <span className={`${challenge.difficulty === 'Hard' ? "text-red-500" : challenge.difficulty === 'Easy' ? 'text-green-800' : 'text-[#FFA500]'} inline-block min-w-[3rem] `}>{challenge.difficulty}</span>
        <span className="inline-block min-w-[2rem]">{challenge.maximumScore}</span>
        <NavLink to='/' className='flex gap-2 items-center hover:underline'>
            <Icon icon="ph:chat-fill" style={{color: 'white'}} width="18" height="18" />
            Discussion
        </NavLink>
    </div>
  )
}

export default OneChallengeCard