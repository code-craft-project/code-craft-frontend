import { Icon } from '@iconify/react'
import GradientColor from '../../application/data/GradientColor.ts'
import OneEventImg from '../../assets/Images/OneEventImg.png';
import OneEventCard from '../components/OneEventCard';
import { NavLink } from 'react-router-dom';

function Search() {
    const { styles } = GradientColor()
    return (
        <div className='w-full p-y16 mt-8'>
            <h1 className='font-semibold text-2xl'>What are you searching for?</h1>
            <div className='w-full flex gap-x-10 justify-start items-center my-5'>
                <NavLink to='/' className={`px-2 py-1 text-sm rounded-lg`}>All</NavLink>
                <NavLink to='/' className={`px-2 py-1 text-sm rounded-lg`}>Challenges</NavLink>
                <NavLink to='/' className={`px-2 py-1 text-sm rounded-lg `}>Job Posts</NavLink>
                <NavLink to='/' className={`px-2 py-1 text-sm rounded-lg  ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>Organizations</NavLink>
            </div>
            <div className='relative w-full'>
                <input type="text" placeholder='Search something..' className='w-full px-12 py-2 bg-transparent border-1.5 rounded-lg' />
                <Icon icon="iconoir:search" className=" h-10 w-10 px-1.5 cursor-pointer absolute left-2 top-0 text-white opacity-75" />
            </div>
            <h2 className="font-semibold text-2xl py-10">Events</h2>
            <div className='flex flex-wrap w-[100%] '>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index}>
                        <OneEventCard eventData={{ logo_url: OneEventImg, title: '#101Tech', start_at: 'Mars 01 10:00 AM', end_at: '', id: 0 }} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search