import { Icon } from '@iconify/react'
import GradientColor from '../../application/data/GradientColor.ts'
import JobPostCard from '../components/JobPostCard'
import { NavLink, useParams } from 'react-router-dom'
import useJobPost from '../../application/hooks/useJobPost.ts'
import { useEffect } from 'react'
import useJobPosts from '../../application/hooks/useJobPosts.ts'

function SingleJobPost() {
    const {styles} = GradientColor()
    const {getJobPostById,applyJobPost, jobPost} = useJobPost()
    const {id} = useParams()
    const {jobPosts} = useJobPosts()
    useEffect(() => {
      if(id) {
        getJobPostById(parseInt(id))
      }
    }, [])

  return (
    <div className='p-16 mt-8 ml-12'>
            {jobPost && (
        <div className='flex my-10'>
            <div className='w-1/2 flex flex-col gap-5 items-start'>
                <img src="" alt="Company Image" className='w-20 h-10'/>
                <div className='flex flex-col gap-1 items-start'>
                  <h1 className='font-semibold text-3xl'>{jobPost.title}</h1>
                  <p className='font-light text-lg opacity-75'>{jobPost.role}</p>
                </div>
                <NavLink to='/single-organization/2' className='flex items-center gap-3 hover:text-primary-blue transition-colors duration-150'>
                    <Icon icon="mdi:company" width="16" height="16" />
                    <span>{jobPost.organization?.creator as any}</span>
                </NavLink>
                <div className='flex items-center gap-3 '>
                    <Icon icon="carbon:location-company-filled" width="16" height="16" />
                    <span>{jobPost.location}</span>
                </div>
                <button onClick={() => {applyJobPost(parseInt(id as string))}} className={`px-2 py-1 text-lg rounded-lg  ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>Apply</button>
            </div>
            <div className='py-8 px-5 border rounded-xl border-white w-1/2 h-96 scrollbar-none  overflow-scroll '>
              {jobPost.description}
            </div>
        </div>
        )}
        <hr className='my-10'/>
        <div>
            <h1 className='font-semibold'>Similar Jobs</h1>
            <div className="flex my-10 gap-16 min-w-full">
            {jobPost && jobPosts && jobPosts.map((job, index) => (
              <div key={index} >
                {jobPost.title == job.title && (<JobPostCard cardStyle={'Small'}  jobData={{id:job.id as number,"logo":'https://w7.pngwing.com/pngs/606/802/png-transparent-meta-meta-logo-facebook-fb-logo-meta-icon-meta-symbol-facebook-logo-thumbnail.png', "company":'Meta', "skill":"Fluter", 'location':'medea', 'tag':"App development", date_posted:"2 days ago", tag_color:'green-700'}}/>)
                }
              </div>
            ))}
          </div>
        </div>
        
    </div>
  )
}

export default SingleJobPost