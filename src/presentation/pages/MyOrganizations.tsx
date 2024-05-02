import { NavLink } from 'react-router-dom';
import { styles } from '../../application/consts';
import image from '../../assets/Images/organizationSlide.png';
import OrganizationCard from '../components/OrganizationCard';
import useOrganizations from '../../application/hooks/useOrganizations';

function MyOrganizations() {
  const {organizations} = useOrganizations()
  return (
    <div className='flex flex-col items-center mt-20 gap-16'>
        <div className="w-[88%] h-72 flex items-center justify-center rounded-xl opacity-60" style={{ backgroundImage: `url('${image}')`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
           <div className=' text-black'>
                <h1 className='text-4xl text-center font-bold'>Your Organizations</h1>
                <p className='text-center'>Label, categorize, prioritize: conquer work chaos.</p>
           </div>
        </div>
        <div className='flex justify-end w-[88%]'>
            <NavLink to={'/organization/create'} className={`transition-all duration-200 active:scale-105 hover:opacity-80 rounded-lg px-3 py-1 font-semibold ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>CREATE NEW ORGANIZATION</NavLink>
        </div>
        <div className='w-[88%] flex flex-col gap-5'>
          {organizations && organizations.map(organization => ( <OrganizationCard organization={{id:organization.id, name:organization.name, logo:'logo', type:organization.type}} /> ))}
        </div>
    </div>
  )
}

export default MyOrganizations