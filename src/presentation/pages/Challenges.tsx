import { Icon, IconProps } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import { challengesTopics, styles } from '../../application/consts';
import LoadingIndicator from '../components/LoadingIndicator';
import ChallengeCard from '../components/ChallengeCard';
import UserSessionContext from '../../application/contexts/UserSessionContext';
import useChallenges from "../../application/hooks/useChallenges";

type TopicsIconsMap = {
    [key in ChallengeTopic]: React.ReactElement<IconProps, string | React.JSXElementConstructor<any>>;
};

const topics: TopicsIconsMap = {
    "all topics": <Icon icon="ph:code" width="18" height="18" />,
    "data structures": <Icon icon="carbon:data-structured" width="18" height="18" />,
    "problem solving": <Icon icon="carbon:data-structured" width="18" height="18" />,
    "algorithms": <Icon icon="mdi:flowchart" width="18" height="18" />,
    "databases": <Icon icon="material-symbols-light:database" width="18" height="18" />
};

const isActiveBackground = `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`;

function Challenges() {
    const { isValidSession, userProgress, getUserProgress } = useContext(UserSessionContext);
    const { challenges, filtredChallenges, filterChallenges, isChallengesLoading, getChallenges, getChallengesByTopic } = useChallenges();
    const [selectedTopic, setSelectedTopic] = useState<ChallengeTopic>('all topics');
    const [challengeFilters, setChallengeFilters] = useState<ChallengeFilters>({ difficulty: [] });

    const hasFilter = () => {
        return challengeFilters.difficulty.length > 0;
    }

    useEffect(() => {
        if (isValidSession) {
            getUserProgress();
        }
    }, []);

    useEffect(() => {
        if (selectedTopic == 'all topics') {
            getChallenges();
        } else {
            getChallengesByTopic(selectedTopic,);
        }
    }, [selectedTopic]);

    useEffect(() => {
        if (hasFilter()) {
            filterChallenges(challengeFilters);
        }
    }, [challengeFilters]);

    const handleLevelFilter = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value as ChallengeLevel;
        setChallengeFilters(state => {
            const oldDifficultyState = state.difficulty;
            if (oldDifficultyState.includes(value)) {
                const newDifficultyState: ChallengeLevel[] = [];
                oldDifficultyState.forEach(level => {
                    if (level != value) {
                        newDifficultyState.push(level);
                    }
                });
                return { ...state, difficulty: newDifficultyState };
            } else {
                return { ...state, difficulty: [...oldDifficultyState, value] };
            }
        })
    }

    const countChallengesByLevel = (challengeLevel: ChallengeLevel): number => {
        let counter = 0;

        challenges.forEach(e => {
            const level = e.level.toLowerCase() as ChallengeLevel;
            if (level == challengeLevel) {
                counter += 1;
            }
        });

        return counter;
    }
    return (
        <div className='w-full mt-20'>
            <h1 className="opacity-60 pt-8 mb-2">All Challenges</h1>
            <div className="flex flex-col md:flex-row gap-16 pb-16 w-full">
                <div className="md:w-2/3 w-full">
                    <div className="scroll-container w-full scrollbar-none ">
                        <div className="flex py-2 gap-2 relative items-center flex-wrap">
                            {
                                challengesTopics.map((topic, index) => {
                                    const selectTopic = () => {
                                        setSelectedTopic(topic);
                                    }

                                    return (
                                        <div key={index} onClick={selectTopic} className={`cursor-pointer hover:opacity-75 w-full md:w-fit transition-opacity duration-300 flex items-center px-4 py-1 rounded-lg ${topic == selectedTopic ? isActiveBackground : 'border-1.5'}`}>
                                            {topics[topic]}
                                            <span className="ml-2 whitespace-nowrap capitalize">{topic}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="text-sm">
                        <div>
                            <div className="w-full flex items-center py-2">
                                <div className='flex-1 font-semibold'>Status</div>
                                <div className='flex-[3] font-semibold'>Title</div>
                                <div className='flex-1 font-semibold'>Difficulty</div>
                                <div className='flex-1 font-semibold'></div>
                            </div>
                            <div className='w-4/5 h-px bg-gray-400'></div>
                            {
                                (!isChallengesLoading && challenges.length == 0) && (
                                    <div className="w-full text-center py-2 font-medium text-gray-500">No Challenges yet</div>
                                )
                            }
                            {
                                isChallengesLoading && (
                                    <div className="w-full flex flex-col items-center py-4">
                                        <LoadingIndicator />
                                    </div>
                                )
                            }
                            {
                                (hasFilter() ? filtredChallenges : challenges).map((challenge, index) => {
                                    return (
                                        <div key={index}>
                                            <ChallengeCard challenge={challenge} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex-grow flex flex-col items-center">
                    {/* ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  */}
                    <div className={`w-full border-2 border-blue-900 border-b-yellow-600 border-r-yellow-600 flex gap-10 items-center justify-center px-10 py-6 rounded-lg font-semibold`}>
                        <div className="flex flex-col items-center justify-center border-4 border-blue-950 bg-blue-900 rounded-full w-20 h-20">
                            {/* <img src={profile} className='rounded-full h-10 w-10 border-3' alt="" /> */}
                            <span className="text-gray-300 text-xs">Total</span>
                            <span className="text-gray-50">{`${userProgress.total_correct_submissions}/${userProgress.total_submissions}`}</span>
                        </div>
                        <div>
                            <div className="flex gap-5">
                                <span className="flex-1 text-green-600 text-sm">Easy</span>
                                <span className="text-sm text-gray-50">{`${userProgress.correct_easy_submissions}/${userProgress.total_easy_submissions}`}</span>
                            </div>
                            <div className="flex gap-5">
                                <span className="flex-1 text-yellow-600 text-sm">Medium</span>
                                <span className="text-sm text-gray-50">{`${userProgress.correct_medium_submissions}/${userProgress.total_medium_submissions}`}</span>
                            </div>
                            <div className="flex gap-5">
                                <span className="flex-1 text-red-600 text-sm">Hard</span>
                                <span className="text-sm text-gray-50">{`${userProgress.correct_hard_submissions}/${userProgress.total_hard_submissions}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`w-full border-2 border-blue-900 border-t-yellow-600 border-r-yellow-600 flex flex-col gap-5 items-start px-6 py-4 rounded-lg font-semibold h-56 mt-4`}>
                        <div className="text-xl text-gray-100">Filters</div>
                        <div className="text-gray-50 font-medium">By Difficulty:</div>
                        <div>
                            <div className="flex items-center">
                                <input onChange={handleLevelFilter} value={"easy"} checked={challengeFilters.difficulty.includes('easy')} type="checkbox" />
                                <span className="ml-2 text-sm">{`Easy (${countChallengesByLevel('easy')})`}</span>
                            </div>
                            <div className="flex items-center mt-1">
                                <input onChange={handleLevelFilter} value={"medium"} checked={challengeFilters.difficulty.includes('medium')} type="checkbox" />
                                <span className="ml-2 text-sm">{`Medium (${countChallengesByLevel('medium')})`}</span>
                            </div>
                            <div className="flex items-center mt-1">
                                <input onChange={handleLevelFilter} value={"hard"} checked={challengeFilters.difficulty.includes('hard')} type="checkbox" />
                                <span className="ml-2 text-">{`Hard (${countChallengesByLevel('hard')})`}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Challenges;