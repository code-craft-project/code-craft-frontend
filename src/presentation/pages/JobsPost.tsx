import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import JobImg from '../../assets/Images/JobImg.png';
import GradientColor from '../../application/data/GradientColor.ts'
import JobPostCard from '../components/JobPostCard';
// import { useEffect } from 'react';
import useJobPosts from '../../application/hooks/useJobPosts.ts';

function JobsPost() {
  const { styles } = GradientColor()
  const { jobPosts } = useJobPosts()

  

  return (
    <>
      <div className='w-full py-16 flex flex-col items-center'>
        <div className='w-full flex flex-col md:flex-row justify-between'>
          <div className='md:w-1/2 w-full py-10 flex flex-col items-start order-2 md:order-1'>
            <h1 className='text-3xl md:text-6xl'>Find a job that suits your <br /> passion</h1>
            <div className='flex justify-start mt-16'>
              <div className="flex relative ">
                <input type="text" placeholder="Quick Search" className=" bg-white rounded-l-sm px-10 w-full md:w-[22rem] py-2 text-black outline-primary-yellow" />
                <Icon icon="iconoir:search" className=" h-10 w-10 px-2 cursor-pointer absolute left-0 text-black opacity-40" />
              </div>
              <NavLink to="/search" className="bg-primary-yellow bg-opacity-80 font-medium px-4 py-2 rounded-r-sm ">Search</NavLink>
            </div>
          </div>
          <div className='md:w-1/2 w-full order-1 md:order-2'>
            <img src={JobImg} alt="" className='w-full' />
          </div>
        </div>
        <div className='w-full flex flex-col items-center'>
          <div className='flex w-full flex-wrap gap-4 md:gap-0 justify-between py-2'>
            <h1 className='text-xl text-center w-full md:w-auto'>Our<br />Organizations</h1>
            <div className='flex justify-center items-center'>
              <Icon icon="ri:openai-fill" width="32" height="32" style={{ color: "white", marginRight: "5px" }} />
              <h1 className='text-xl'>Open AI</h1>
            </div>
            <div className='flex justify-center items-center'>
              <Icon icon="mdi:microsoft" width="32" height="32" style={{ color: "white", marginRight: "5px" }} />
              <h1 className='text-xl'>Microsoft</h1>
            </div>
            <div className='flex justify-center items-center'>
              <Icon icon="bi:google" width="32" height="32" style={{ color: "white", marginRight: "5px" }} />
              <h1 className='text-xl'>Google</h1>
            </div>
            <div className='flex justify-center items-center'>
              <Icon icon="bxl:upwork" width="32" height="32" style={{ color: "white", marginRight: "5px" }} />
              <h1 className='text-xl'>Upwork</h1>
            </div>
          </div>
          <hr className='w-full my-3' />
        </div>
        <div className='relative w-fit flex flex-col justify-center items-center mt-10'>
          <div className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <h1 className=' text-6xl font-semibold p-5 mr-3'>{jobPosts.length}</h1>
          </div>
          <Icon icon="material-symbols:add" width="32" height="32" className='absolute bottom-20 right-0 text-primary-yellow' />
          <p className='text-center opacity-60 font-semibold'>Total Job Posted</p>
        </div>
      </div>
      <div className="w-full flex scroll-container mx-auto scrollbar-none ">
        <div className="scroll-content flex gap-16 min-w-full pb-16">
          {jobPosts.map((job, index) => (
            <div key={index} >
              <JobPostCard cardStyle={'Large'} jobData={job} />
            </div>
          ))}
        </div>
      </div>
      <div className=' w-fit flex flex-col justify-center items-center mt-40 mx-auto'>
        <h1 className=' text-4xl font-semibold p-5 mr-3'>Explore the job</h1>
        <p className='text-center opacity-60 font-semibold'>Choose your favorite job</p>
      </div>
      <div className='w-full mx-auto flex flex-wrap md:h-52 my-20 justify-center'>
        <div className='p-2 bg-white mx-4 md:mx-10 mb-8 w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
          <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <Icon
              icon="clarity:mobile-line"
              width="32"
              height="32"
              className='text-primary-blue'
            />
            <h1>Mobile App Developer</h1>
          </div>
        </div>
        <div className='p-2 bg-white mx-4 md:mx-10 mb-8 w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
          <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <Icon
              icon="simple-icons:frontendmentor"
              width="32"
              height="32"
              className='text-primary-blue'
            />
            <h1>Front End Developer</h1>
          </div>
        </div>
        <div className='p-2 bg-white mx-4 md:mx-10 mb-8 w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
          <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <Icon
              icon="iconoir:pc-firewall"
              width="32"
              height="32"
              className='text-primary-blue'
            />
            <h1>Back End Developer</h1>
          </div>
        </div>
        <div className='p-2 bg-white mx-4 md:mx-10 mb-8 w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
          <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <Icon icon="material-symbols:full-stacked-bar-chart" width="32" height="32" className='text-primary-blue'/>
            <h1>Full Stack Developer</h1>
          </div>
        </div>
        <div className='p-2 bg-white mx-4 md:mx-10 mb-8 w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
          <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <Icon icon="carbon:concept" width="32" height="32" className='text-primary-blue'/>
            <h1>Software Engineer</h1>
          </div>
        </div>
        <div className='p-2 bg-white mx-4 md:mx-10 mb-8 w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
          <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <Icon icon="codicon:azure-devops" width="32" height="32" className='text-primary-blue'/>
            <h1>DevOps Engineer</h1>
          </div>
        </div>
        <div className='p-2 bg-white mx-4 md:mx-10 mb-8 w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
          <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <Icon icon="basil:adobe-experince-design-outline" width="36" height="36" className='text-primary-blue'/> 
            <h1 className='mr-2'> UI/UX   Designer</h1>
          </div>
        </div>
        <div className={`p-2 bg-white mx-10 mb-8 w-32 h-32 rounded-xl cursor-pointer flex items-center justify-center  ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
          <div >
            <Icon icon="material-symbols:add" width="32" height="32" className=' text-white' />
            <h1 className='mb-5'>Explore More</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobsPost