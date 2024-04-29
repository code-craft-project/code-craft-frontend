import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import JobImg from '../../assets/Images/JobImg.png';
import GradientColor from '../../application/data/GradientColor.ts'
import JobPostCard from '../components/JobPostCard';
import { useEffect } from 'react';
import useJobPosts from '../../application/hooks/useJobPosts.ts';

function JobsPost() {
  const {styles} = GradientColor()
  const {jobPosts} = useJobPosts()
  useEffect(() => {
    const scrollContainer:any = document.querySelector('.scroll-container');
    let scrollInterval:any;
    const startScroll = () => {
      scrollInterval = setInterval(() => {
        scrollContainer.scrollLeft += 2; 
      }, 20);
    };
    const stopScroll = () => {
      clearInterval(scrollInterval);
    };
    scrollContainer.addEventListener('mouseover', stopScroll);
    scrollContainer.addEventListener('mouseout', startScroll);
    startScroll();
    // Clean up event listeners and scroll interval on component unmount
    return () => {
      scrollContainer.removeEventListener('mouseover', stopScroll);
      scrollContainer.removeEventListener('mouseout', startScroll);
      clearInterval(scrollInterval);
    };
  }, []);

  const getTimeDifferenceString = (dateString :string) => {
    if (!dateString) {
      return 'Invalid date string provided.';
    }
    const date = new Date(dateString);
    const now = Date.now();
    const timeDifference = now - date.getTime();  
    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
    // Define thresholds for different time units
    const minuteInSecs = 60;
    const hourInSecs = minuteInSecs * 60;
    const dayInSecs = hourInSecs * 24;
    // Determine the appropriate time unit
    let unit;
    let value;
    if (seconds < minuteInSecs) {
      unit = 'seconds';
      value = seconds;
    } else if (seconds < hourInSecs) {
      unit = 'minutes';
      value = Math.floor(seconds / minuteInSecs);
    } else if (seconds < dayInSecs) {
      unit = 'hours';
      value = Math.floor(seconds / hourInSecs);
    } else {
      unit = 'days';
      value = Math.floor(seconds / dayInSecs);
    }
    // Handle pluralization for units
    unit = value > 1 ? unit + 's' : unit; // Add 's' for plural
    // Construct the relative time string
    const timeString = `${value} ${unit} ago`;
    return timeString;
  }  

  return (
    <>
      <div className='p-16 mt-12 flex flex-col items-center'>
        <div className='flex'>
          <div className='w-1/2 p-10 flex flex-col items-start'>
            <h1 className='text-6xl'>Find a job that suits your <br /> passion</h1>
            <div className='flex justify-start mt-16'>
            <div className="flex relative ">
                <input type="text" placeholder="Quick Search" className=" bg-white rounded-l-sm px-10 w-[22rem] py-2 text-black outline-primary-yellow"/>
                <Icon icon="iconoir:search" className=" h-10 w-10 px-2 cursor-pointer absolute left-0 text-black opacity-40"/>
            </div>
              <NavLink to="/sign-in" className="bg-primary-yellow bg-opacity-80 font-meduim px-4 py-2 rounded-r-sm ">Search</NavLink>
            </div>
          </div>
          <div className='w-1/2 px-10'>
            <img src={JobImg} alt="" />
          </div>
        </div>
        <div className=' w-full flex flex-col items-center'>
          <div className='flex w-full justify-around px-8 py-2'>
            <h1 className='text-xl text-center'>Our <br /> Organizations</h1>
            <div className='flex justify-center items-center'>
              <Icon icon="ri:openai-fill" width="32" height="32"  style={{color: "white", marginRight:"5px"}} />
              <h1 className='text-xl'>Open AI</h1>
            </div>
            <div className='flex justify-center items-center'>
              <Icon icon="mdi:microsoft" width="32" height="32"  style={{color: "white", marginRight:"5px"}} />  
              <h1 className='text-xl'>Microsoft</h1>
            </div>
            <div className='flex justify-center items-center'>
              <Icon icon="bi:google" width="32" height="32"  style={{color: "white", marginRight:"5px"}} />
              <h1 className='text-xl'>Google</h1>
            </div>
            <div className='flex justify-center items-center'>
              <Icon icon="bxl:upwork" width="32" height="32"  style={{color: "white", marginRight:"5px"}} />
              <h1 className='text-xl'>Upwork</h1>
            </div>
          </div>
          <hr className='w-[90%] my-3'/>
        </div>
        <div className='relative w-fit flex flex-col justify-center items-center mt-10'>
          <div className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <h1 className=' text-6xl font-semibold p-5 mr-3'>250.000</h1> 
          </div>
            <Icon icon="material-symbols:add" width="32" height="32" className='absolute bottom-20 right-0 text-primary-yellow'   />
          <p className='text-center opacity-60 font-semibold'>Total Job Posted</p>
        </div>
      </div>
        <div className="flex scroll-container w-[90%] mx-auto scrollbar-none ">
          <div className="scroll-content flex gap-16 min-w-full">
            {jobPosts.map((job, index) => (
              <div key={index} >
                <JobPostCard cardStyle={'Large'}  jobData={{"logo":'https://w7.pngwing.com/pngs/606/802/png-transparent-meta-meta-logo-facebook-fb-logo-meta-icon-meta-symbol-facebook-logo-thumbnail.png', "company":job.organization_id.toString() as string, "skill":job.role, 'location':job.location, 'tag':"App development", date_posted:getTimeDifferenceString(job.created_at as string), tag_color:'green-700'}}/>
              </div>
            ))}
          </div>
        </div>
        <div className=' w-fit flex flex-col justify-center items-center mt-40 mx-auto'>
          <h1 className=' text-4xl font-semibold p-5 mr-3'>Explore the job</h1> 
          <p className='text-center opacity-60 font-semibold'>Choose your favorite job</p>
        </div>
        <div className='w-[90%] mx-auto flex justify-around items-center my-20'>
          <div className='p-2 bg-white w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
              <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
                <Icon 
                  icon="clarity:mobile-line" 
                  width="32" 
                  height="32"  
                  className='text-primary-blue'
                />
                <h1>Mobile Development</h1>
            </div>
          </div>          
          <div className='p-2 bg-white w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
            <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
              <Icon 
                icon="simple-icons:frontendmentor" 
                width="32" 
                height="32"  
                className='text-primary-blue'
              />
              <h1>Front End</h1>
            </div>
          </div>          
          <div className='p-2 bg-white w-32 cursor-pointer h-32 rounded-xl flex items-center justify-center'>
            <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} text-transparent bg-clip-text`}>
            <Icon 
              icon="iconoir:pc-firewall" 
              width="32" 
              height="32"  
              className='text-primary-blue'
            />
              <h1>Back End</h1>
            </div>
          </div>          
          <div className={`p-2 bg-white w-32 h-32 rounded-xl cursor-pointer flex items-center justify-center ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
            <div >
              <Icon icon="material-symbols:add" width="32" height="32" className=' text-white'   />
              <h1>Explore More</h1>
            </div>
          </div>
        </div>
      </>
  )
}

export default JobsPost