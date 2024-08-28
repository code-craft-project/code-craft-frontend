import { NavLink } from 'react-router-dom';
import { styles } from '../../application/consts';
import image from '../../assets/Images/organizationSlide.png';
import OrganizationCard from '../components/OrganizationCard';
import useOrganizations from '../../application/hooks/useOrganizations';
import { Icon } from '@iconify/react/dist/iconify.js';

function MyOrganizations() {
  const { organizations } = useOrganizations()

  return (
    <div className='w-full flex flex-col items-center mt-20 gap-16'>
      <div className='w-full h-72 relative flex items-center justify-center '>
        <div className="w-full h-full absolute top-0 left-0 rounded-xl opacity-50" style={{ backgroundImage: `url('${image}')`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
        <div >
          <h1 className='text-4xl text-center font-bold'>Your Organizations</h1>
          <p className='text-center'>Label, categorize, prioritize: conquer work chaos.</p>
        </div>
      </div>
      <div className='flex justify-end w-full'>
        <NavLink to={'/organization/create'} className={`transition-all duration-200 active:scale-105 hover:opacity-80 rounded-lg px-3 py-1 w-full md:w-80 text-nowrap flex justify-center items-center  font-semibold text-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
          <Icon icon="ion:create" width="24" height="24" className='mx-2'/>
          CREATE NEW ORGANIZATION
        </NavLink>
      </div>
      <div className='w-full flex flex-wrap gap-5'>
        {organizations && organizations.map(organization => (<OrganizationCard organization={{ id: organization.id as number, name: organization.name, logo: organization.profile_image_url as string, type: organization.type!, creator: organization.creator}} />))}
      </div>
    </div>
  )
}

export default MyOrganizations