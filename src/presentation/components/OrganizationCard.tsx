import { NavLink } from 'react-router-dom';
import OrganizationImg from '../../assets/Images/OrganizationImg.png';
import { Icon } from '@iconify/react/dist/iconify.js';
import ImageModal from './ImageModal';
import { useState } from 'react';

function OrganizationCard ({ organization }: { organization: OrganizationCard }) {
    const [showPopup, setShowPopup] = useState(false);

    return (
    <div className="w-[28rem] border-2 border-blue-900 border-b-yellow-600 border-r-yellow-600  border-opacity-70 rounded-lg px-5 py-5 flex flex-col justify-between items-start">
        <div className='flex items-start w-full'>
            <img onClick={() => setShowPopup(true)} src={organization.logo ? organization.logo : OrganizationImg} alt="Organization Logo" className='w-1/3 h-28 rounded-lg cursor-pointer'/>
            <div className='flex flex-col justify-between gap-3 w-2/3 h-24'>
                <div className='w-full flex items-center justify-end mb-3'>
                    <div className='flex items-center gap-3'>
                        {organization.type === 'company' ? <Icon icon="mdi:company" width="18" height="18" /> : <Icon icon="simple-icons:codersrank" width="18" height="18" />}
                        <div className='capitalize font-semibold'>{organization.type}</div>
                    </div>
                </div>
                <div className='w-full flex flex-col '>
                    <div className='font-bold text-3xl w-full pl-2'>{organization.name}</div>
                    <div className='flex justify-between w-full items-center pl-2'>
                        <div className='opacity-80'>Creator: ______________</div>
                        <div className='font-meduim text-meduim px-2 w-2/5 text-nowrap truncate'>{organization.creator?.first_name} {organization.creator?.last_name}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full flex items-center justify-between'>
            <NavLink to={`/organization/${organization.id}/dashboard`} className={`bg-primary-yellow/90 font-semibold px-3 py-1 rounded-lg  mt-5 hover:opacity-90 active:scale-105 transition-all duration-300 `}>Go To Dashboard</NavLink>
            <NavLink to={`/organization/${organization.id}`} className={`bg-gradient-to-b from-gray-500/30 from-32% to-white/55 to-32% font-semibold px-3 py-1 rounded-lg  mt-5 hover:opacity-90 active:scale-105 transition-all duration-300 `}>Show More Informations</NavLink>
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