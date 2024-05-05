import OrganizationImg from '../../assets/Images/OrganizationImg.png';
import { NavLink, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useOrganization from '../../application/hooks/useOrganization';
import { useEffect } from 'react';
import EventCard from '../components/EventCard';
import ChallengeCard from '../components/ChallengeCard';

function OrganizationPage() {
    const { id } = useParams();
    const { organization, getOrganizationById, events, getOrganizationEvents, challenges, getOrganizationChallenges } = useOrganization();

    useEffect(() => {
        if (id) {
            getOrganizationById(parseInt(id));
            getOrganizationEvents(parseInt(id), 0, 10);
            getOrganizationChallenges(parseInt(id));
        }
    }, [id]);

    return (
        <div className="mt-24 w-full">
            <div className='flex justify-between'>
                <div className="w-2/3 pr-16">
                    <h1 className="text-3xl">{organization.name}</h1>
                    <p className='mt-8 whitespace-pre-line'>
                        {organization.description}
                    </p>
                    <div className='mt-8'>
                        <span className='text-white/60 font-semibold mr-2'>Owner:</span>
                        <span>{`${organization.creator?.first_name} ${organization.creator?.last_name}`}</span>
                    </div>
                    <div className=''>
                        <span className='text-white/60 font-semibold mr-2'>Organization Type:</span>
                        <span className='capitalize'>{organization.type}</span>
                    </div>
                </div>
                <div className='w-1/3 h-80'>
                    <img src={organization.profile_image_url ? organization.profile_image_url : OrganizationImg} alt="" className='rounded-3xl bg-white w-full h-full object-contain' />
                </div>
            </div>
            <div className='my-20'>
                <h1 className="text-3xl mb-4 font-semibold">Events:</h1>
                <div className='flex flex-wrap w-full'>
                    {
                        events.map((event, index) => {
                            return (
                                <div key={index} className='w-1/5 pr-4'>
                                    <EventCard event={event} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="text-sm my-20 w-[60%] ml-2">
                <h1 className="text-3xl mb-4 font-semibold">Challenges:</h1>
                <div >
                    <div className="w-full flex items-center py-2">
                        <div className='flex-1 font-semibold'>Status</div>
                        <div className='flex-1 font-semibold'>Title</div>
                        <div className='flex-1 font-semibold'>Difficulty</div>
                        <div className='flex-1 font-semibold'></div>
                    </div>
                    <div className='w-4/5 h-px bg-gray-400'></div>
                    {challenges.map((challenge, index) => (
                        <ChallengeCard key={index} challenge={challenge} />
                    ))}
                </div>
            </div>
            <div className='w-full flex flex-col items-center'>
                <NavLink to='/challenges' className='flex items-center px-8 py-2 border transition-all duration-300 rounded-lg border-white hover:scale-105 hover:bg-white hover:text-black'>
                    {"View more challenges"}
                    <Icon icon="material-symbols-light:double-arrow" width="18" height="18" />
                </NavLink>
            </div>
        </div>
    )
}

export default OrganizationPage;