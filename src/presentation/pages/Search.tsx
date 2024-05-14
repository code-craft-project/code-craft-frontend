import { Icon } from '@iconify/react';
import { styles } from '../../application/consts.ts';
import { useEffect, useState } from 'react';
import useSearch from '../../application/hooks/useSearch.ts';
import ChallengeCard from '../components/ChallengeCard.tsx';
import EventCard from '../components/EventCard.tsx';
import JobPostCardForSearchResult from '../components/JobPostCardForSearchResult.tsx';
import OrganizationCardForSearchResult from '../components/OrganizationCardForSearchResult.tsx';

type SearchTab = 'all' | 'job_posts' | 'challenges' | 'organizations' | 'events';

export default function Search() {
    const [selectedTab, setSelectedTab] = useState<SearchTab>('all');
    const [didSearch, setDidSearch] = useState(false);

    const {
        query, setQuery,
        challenges, searchChallenges,
        events, searchEvents,
        jobPosts, searchJobPosts,
        organizations, searchOrganizations,
        resetSearchResult
    } = useSearch();

    const searchButtonHandler = (ev: any) => {
        ev.preventDefault();

        setDidSearch(true);

        if (selectedTab == 'all') {
            searchChallenges();
            searchJobPosts();
            searchEvents();
            searchOrganizations();
            return;
        }

        if (selectedTab == 'challenges') {
            searchChallenges();
            return;
        }

        if (selectedTab == 'events') {
            searchEvents();
            return;
        }

        if (selectedTab == 'job_posts') {
            searchJobPosts();
            return;
        }

        if (selectedTab == 'organizations') {
            searchOrganizations();
            return;
        }
    }

    useEffect(() => {
        resetSearchResult();
        setDidSearch(false);
    }, [selectedTab]);

    return (
        <div className='w-full flex-grow mt-16'>
            <h1 className='font-semibold text-2xl'>What Are You Searching For ?</h1>
            <div className='relative w-full mt-8 mb-4'>
                <form onSubmit={searchButtonHandler}>
                    <input value={query} onChange={(ev) => { setQuery(ev.target.value); }} type="text" placeholder='Search something..' className='w-full px-12 py-2 bg-transparent border-1.5 rounded-lg text-gray-50 font-medium outline-none' />
                </form>
                <Icon onClick={searchButtonHandler} icon="iconoir:search" className=" h-10 w-10 px-1.5 cursor-pointer absolute left-2 top-0 text-white opacity-75" />
            </div>
            <div className='w-full flex gap-x-4 justify-start items-center'>
                <div onClick={() => { setSelectedTab('all') }} className={`px-4 py-2 text-gray-50 cursor-pointer active:scale-105 duration-300 hover:bg-yellow-700/20 text-sm rounded-lg ${selectedTab == 'all' ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}` : ''}`}>All</div>
                <div onClick={() => { setSelectedTab('events') }} className={`px-4 py-2 text-gray-50 cursor-pointer active:scale-105 duration-300 hover:bg-yellow-700/20 text-sm rounded-lg ${selectedTab == 'events' ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}` : ''}`}>Events</div>
                <div onClick={() => { setSelectedTab('challenges') }} className={`px-4 py-2 text-gray-50 cursor-pointer active:scale-105 duration-300 hover:bg-yellow-700/20 text-sm rounded-lg ${selectedTab == 'challenges' ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}` : ''}`}>Challenges</div>
                <div onClick={() => { setSelectedTab('job_posts') }} className={`px-4 py-2 text-gray-50 cursor-pointer active:scale-105 duration-300 hover:bg-yellow-700/20 text-sm rounded-lg ${selectedTab == 'job_posts' ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}` : ''}`}>Job Posts</div>
                <div onClick={() => { setSelectedTab('organizations') }} className={`px-4 py-2 text-gray-50 cursor-pointer active:scale-105 duration-300 hover:bg-yellow-700/20 text-sm rounded-lg ${selectedTab == 'organizations' ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}` : ''}`}>Organizations</div>
            </div>

            {
                didSearch ? (
                    <div className='w-full flex-grow flex flex-col mt-8'>
                        {
                            (selectedTab == 'all' || selectedTab == 'challenges') && (
                                <div className='w-full flex flex-col mb-8'>
                                    <ChallengesSearchResult challenges={challenges} didSearch={didSearch} />
                                </div>
                            )
                        }
                        {
                            (selectedTab == 'all' || selectedTab == 'events') && (
                                <div className='w-full flex flex-col mb-8'>
                                    <EventsSearchResult events={events} didSearch={didSearch} />
                                </div>
                            )
                        }
                        {
                            (selectedTab == 'all' || selectedTab == 'job_posts') && (
                                <div className='w-full flex flex-col mb-8'>
                                    <JobPostsSearchResult jobPosts={jobPosts} didSearch={didSearch} />
                                </div>
                            )
                        }
                        {
                            (selectedTab == 'all' || selectedTab == 'organizations') && (
                                <div className='w-full flex flex-col mb-8'>
                                    <OrganizationsSearchResult organizations={organizations} didSearch={didSearch} />
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div className='mt-8 text-sm text-gray-400 whitespace-pre-line'>{"No results yet. Enter a search query to get started."}</div>
                )
            }
        </div>
    )
}

interface ChallengesSearchResultProps {
    challenges: ChallengeEntity[];
    didSearch: boolean;
};

function ChallengesSearchResult({ challenges, didSearch }: ChallengesSearchResultProps) {
    return (
        <div className='w-full flex flex-col'>
            <div className="text-xl mb-4 font-semibold text-gray-50">Challenges:</div>
            {
                (challenges.length == 0 && didSearch) ? (
                    <div className='w-full text-gray-400 text-sm flex items-center'><Icon icon="zondicons:question" className='mr-2' />Didn't find anything.</div>
                ) : (
                    <div className='w-1/2 flex flex-col'>
                        {
                            (challenges.length > 0) && (
                                <>
                                    <div className="w-full flex items-center py-2">
                                        <div className='flex-1 font-semibold'>Status</div>
                                        <div className='flex-[3] font-semibold'>Title</div>
                                        <div className='flex-1 font-semibold'>Difficulty</div>
                                        <div className='flex-1 font-semibold'></div>
                                    </div>
                                    <div className='w-4/5 h-px bg-gray-400'></div>
                                </>
                            )
                        }
                        {
                            challenges.map((challenge, index) => {
                                return (
                                    <ChallengeCard key={index} challenge={challenge} />
                                )
                            })
                        }
                    </div>
                )
            }

        </div>
    )
}

interface EventsSearchResultProps {
    events: EventEntity[];
    didSearch: boolean;
};

function EventsSearchResult({ events, didSearch }: EventsSearchResultProps) {
    return (
        <div className='w-full flex flex-col'>
            <div className="text-xl mb-4 font-semibold text-gray-50">Events:</div>
            {
                (events.length == 0 && didSearch) ? (
                    <div className='w-full text-gray-400 text-sm flex items-center'><Icon icon="zondicons:question" className='mr-2' />Didn't find anything.</div>
                ) : (
                    <div className='w-full flex flex-wrap'>
                        {
                            events.map((event, index) => {
                                return (
                                    <div key={index} className='w-1/5 pr-4 mb-8'>
                                        <EventCard event={event} />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

interface JobPostsSearchResultProps {
    jobPosts: JobPostEntity[];
    didSearch: boolean;
};

function JobPostsSearchResult({ jobPosts, didSearch }: JobPostsSearchResultProps) {
    return (
        <div className='w-full flex flex-col'>
            <div className="text-xl mb-4 font-semibold text-gray-50">Job Posts:</div>
            {
                (jobPosts.length == 0 && didSearch) ? (
                    <div className='w-full text-gray-400 text-sm flex items-center'><Icon icon="zondicons:question" className='mr-2' />Didn't find anything.</div>
                ) : (
                    <div className='w-full flex flex-wrap'>
                        {
                            jobPosts.map((jobPost, index) => {
                                return (
                                    <div key={index} className='w-1/5 pr-4 mb-8'>
                                        <JobPostCardForSearchResult jobPost={jobPost} />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

interface OrganizationsSearchResultProps {
    organizations: OrganizationEntity[];
    didSearch: boolean;
};

function OrganizationsSearchResult({ organizations, didSearch }: OrganizationsSearchResultProps) {
    return (
        <div className='w-full flex flex-col'>
            <div className="text-xl mb-4 font-semibold text-gray-50">Organizations:</div>
            {
                (organizations.length == 0 && didSearch) ? (
                    <div className='w-full text-gray-400 text-sm flex items-center'><Icon icon="zondicons:question" className='mr-2' />Didn't find anything.</div>
                ) : (
                    <div className='w-full flex flex-wrap'>
                        {
                            organizations.map((organization, index) => {
                                return (
                                    <div key={index} className='w-1/5 pr-4 mb-4'>
                                        <OrganizationCardForSearchResult organization={organization} />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}