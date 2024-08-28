import { NavLink } from 'react-router-dom';
import OrganizationImg from '../../assets/Images/OrganizationImg.png';
import { Icon } from '@iconify/react/dist/iconify.js';
import ImageModal from './ImageModal';
import { useState } from 'react';

function OrganizationCard ({ organization }: { organization: OrganizationCard }) {
    const [showPopup, setShowPopup] = useState(false);

    return (
    <div className="md:w-[28rem] w-full border-2 border-blue-900 border-b-yellow-600 border-r-yellow-600  border-opacity-70 rounded-lg px-5 py-5 flex flex-col justify-between items-start">
        <div className='flex items-start w-full'>
            <img onClick={() => setShowPopup(true)} src={organization.logo ? organization.logo : OrganizationImg} alt="Organization Logo" className='w-1/3 h-32 rounded-lg cursor-pointer'/>
            <div className='flex flex-col justify-around w-2/3 h-32'>
                <div className='w-full flex items-center justify-end mb-3'>
                    <div className='flex items-center gap-3'>
                        {organization.type === 'company' ? <Icon icon="mdi:company" width="18" height="18" /> : <Icon icon="simple-icons:codersrank" width="18" height="18" />}
                        <div className='capitalize font-semibold'>{organization.type}</div>
                    </div>
                </div>
                <div className='font-bold text-2xl  md:pl-2 w-full truncate'>{organization.name}</div>
            </div>
        </div>
        <div className='w-full flex flex-col md:flex-row items-center justify-between'>
            <NavLink to={`/organization/${organization.id}/dashboard`} className={`bg-primary-yellow/90 w-full md:w-fit text-center font-semibold px-3 py-1 rounded-lg  mt-5 hover:opacity-90 active:scale-105 transition-all duration-300 `}>Go To Dashboard</NavLink>
            <NavLink to={`/organization/${organization.id}`} className={`bg-gradient-to-b w-full md:w-fit text-center from-gray-500/30 from-32% to-white/55 to-32% font-semibold px-3 py-1 rounded-lg  mt-5 hover:opacity-90 active:scale-105 transition-all duration-300 `}>Show More Informations</NavLink>
        </div>
        <ImageModal
            showModal={showPopup}
            onClose={() => setShowPopup(false)}
            imageSrc={organization.logo}
            title={organization.logo}
        />
    </div>
  )
}

export default OrganizationCard