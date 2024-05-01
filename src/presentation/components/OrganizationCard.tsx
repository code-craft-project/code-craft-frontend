import { NavLink } from 'react-router-dom';
import OrganizationImg from '../../assets/Images/OrganizationImg.png';

function OrganizationCard ({ organization }: { organization: OrganizationCard }) {
    return (
    <div className="w-full border border-white border-opacity-70 rounded-lg px-8 py-5 flex justify-between items-end">
        <div className='flex gap-2 items-center'>
            <img src={OrganizationImg} alt="" className='w-32 h-20 rounded-lg '/>
            <div className='flex flex-col gap-3'>
                <span className='font-semibold text-lg'>{organization.name}</span>
                <span className='opacity-75'>{organization.type}</span>
            </div>
        </div>
        <NavLink to={`/organization/${organization.id}/dashboard`} className={`bg-primary-yellow font-meduim px-3 py-1 rounded-lg  mt-5 hover:opacity-90 active:scale-105 transition-all duration-300 `}>Go TO DASHBOARD</NavLink>
    </div>
  )
}

export default OrganizationCard