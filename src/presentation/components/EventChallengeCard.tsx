import { NavLink } from "react-router-dom"

interface EventChallengeCardProps {
    challenge: ChallengeEntity;
};

const challengeLevelColor: ChallengeLevelColor = {
    easy: 'text-green-500',
    medium: 'text-yellow-500',
    hard: 'text-red-500'
};

export default function EventChallengeCard({ challenge }: EventChallengeCardProps) {
    return (
        <NavLink to={`/challenges/${challenge.id}`} className="w-full flex items-center py-2">
            <div className="flex-1">
                <div className={`w-fit rounded-xl px-2 font-semibold capitalize ${challenge.status == 'done' ? "bg-green-500" : (challenge.status == 'wrong answer' ? 'bg-red-500' : 'bg-gray-500')}`}>{challenge.status || "Not Started"}</div>
            </div>
            <div className="flex-1 font-semibold text-ellipsis whitespace-nowrap overflow-hidden" title={challenge.title}>{challenge.title}</div>
            <div className={`flex-1 font-semibold capitalize ${challengeLevelColor[challenge.level.toLowerCase() as ChallengeLevel]}`}>{challenge.level}</div>
            <div className="flex-1 font-semibold">{"100"}</div>
        </NavLink>
    )
}