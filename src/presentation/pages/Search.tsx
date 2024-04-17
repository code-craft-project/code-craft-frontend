import { Icon } from '@iconify/react'
import GradientColor from '../../application/data/GradientColor'
import OneEventImg from '../../assets/Images/OneEventImg.png';
import OneEventCard from '../components/OneEventCard';
import { NavLink } from 'react-router-dom';

function Search() {
    const {styles} = GradientColor()
  return (
    <div className='p-16 mt-8 ml-12'>
        <h1 className='font-semibold text-2xl'>What are you searching for?</h1>
        <div className='flex gap-x-10 justify-start items-center my-5'>
            <NavLink to='/' className={`px-2 py-1 text-sm rounded-lg`}>All</NavLink>
            <NavLink to='/' className={`px-2 py-1 text-sm rounded-lg`}>Challenges</NavLink>
            <NavLink to='/' className={`px-2 py-1 text-sm rounded-lg `}>Job Posts</NavLink>
            <NavLink to='/' className={`px-2 py-1 text-sm rounded-lg  ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>Organizations</NavLink>
        </div>
        <div className='relative w-[95%]'>
            <input type="text" placeholder='Search something..' className='w-full px-12 py-2 bg-transparent border-1.5 rounded-lg'/>
            <Icon icon="iconoir:search" className=" h-10 w-10 px-1.5 cursor-pointer absolute left-2 top-0 text-white opacity-75"/>
        </div>
        <h2 className="font-semibold text-2xl py-10">Events</h2>
        <div className='flex flex-wrap w-[100%] '>
            {Array.from({length:10}).map((_,index)=>(
                <div key={index}>
                    <OneEventCard eventData={{image:OneEventImg, title:'#101Tech', date:'Mars 01 10:00 AM'}}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Search