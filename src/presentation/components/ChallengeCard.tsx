import { NavLink } from "react-router-dom"
import { Icon } from '@iconify/react';

interface ChallengeCardProps {
  challenge: ChallengeEntity;
};

const challengeLevelColor: ChallengeLevelColor = {
  easy: 'text-green-500',
  medium: 'text-red-500',
  hard: 'text-yellow-500'
};

function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <NavLink to={`/challenges/${challenge.id}`} className="w-full flex items-center py-2">
      <div className="flex-1">
        <div className={`w-fit rounded-xl px-2 font-semibold ${challenge.status == 'Done' ? "bg-green-500" : "bg-white bg-opacity-50"}`}>{challenge.status || "Not Started"}</div>
      </div>
      <div className="flex-1 font-semibold">{challenge.title}</div>
      <div className={`flex-1 font-semibold ${challengeLevelColor[challenge.level]}`}>{challenge.level}</div>
      <div className="flex-1 flex flex-col items-end">
        <div className='flex gap-2 items-center hover:underline'>
          <Icon icon="ph:chat-fill" style={{ color: 'white' }} width="18" height="18" />
          Discussion
        </div>
      </div>
    </NavLink>
  )
}

export default ChallengeCard