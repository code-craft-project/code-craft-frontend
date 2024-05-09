import { Icon } from '@iconify/react'
import { NavLink, useParams } from 'react-router-dom'
import useJobPost from '../../application/hooks/useJobPost.ts'
import { useEffect, useRef } from 'react'
import useJobPosts from '../../application/hooks/useJobPosts.ts'
import { organizationProfilePicture, styles } from '../../application/consts.ts'
import JobPostCardForSearchResult from '../components/JobPostCardForSearchResult.tsx'

function SingleJobPost() {
  const { id } = useParams();
  const { jobPosts } = useJobPosts();
  const { getJobPostById, jobPost, jobApplication, setJobApplication, resumeFile, setResumeFile, applyJobPost } = useJobPost();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      getJobPostById(parseInt(id));
    }
  }, []);

  const selectResumeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const onSelectFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    if (ev.target.files && ev.target.files?.length > 0) {
      setResumeFile(ev.target.files[0]);
    }
  }

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex my-10'>
        <div className='w-1/2 flex flex-col mb-8 pr-8'>
          <div className='w-full flex flex-col items-start'>
            <img src={jobPost.organization?.profile_image_url || organizationProfilePicture} alt="Company Image" className='w-20 rounded-lg mb-2' />
            <div className='flex flex-col items-start mb-4'>
              <h1 className='font-semibold text-xl'>{jobPost.title}</h1>
              <p className='font-light text-gray-400'>{jobPost.role}</p>
            </div>
            <NavLink to='/single-organization/2' className='flex items-center hover:text-primary-blue transition-colors duration-150'>
              <Icon icon="mdi:company" width="16" height="16" />
              <span className='ml-2'>{jobPost.organization?.name}</span>
            </NavLink>
            <div className='flex items-center'>
              <Icon icon="mdi:location" width="16" height="16" />
              <span className='ml-2'>{jobPost.location}</span>
            </div>
            <div className="w-full flex items-center mb-4">
              <div className="flex items-center text-gray-50">
                <Icon icon="material-symbols:work" />
                <div className="text-sm font-semibold ml-2">{jobPost.contractType}</div>
                <div className="text-sm font-semibold ml-1">{`(${jobPost.type})`}</div>
              </div>
            </div>
          </div>
          {
            !jobPost.didApply ? (
              <div className='w-full flex flex-col'>
                <div className='text-gray-50 font-medium mb-2'>Cover Message:</div>
                <textarea
                  onChange={(ev: any) => { setJobApplication(state => ({ ...state, cover_message: ev.target.value })); }}
                  value={jobApplication.cover_message}
                  placeholder='Type your cover message...'
                  className='w-2/3 bg-gray-900 rounded-lg px-4 py-2 h-40 outline-none focus:bg-gray-800 mb-4'
                />
                <div className='text-gray-50 font-medium mb-2'>Upload Your Resume:</div>
                {
                  resumeFile ? (
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-fit text-yellow-500 flex items-center hover:text-yellow-600 cursor-pointer'><Icon icon="bx:file" className='mr-2' />{resumeFile.name}</div>
                      <div onClick={removeFile} className='text-red-600 text-xs cursor-pointer'><Icon icon="fa:remove" /></div>
                    </div>
                  ) : (
                    <div onClick={selectResumeFile} className='w-fit border-1.5 border-yellow-500 text-yellow-500 px-8 py-1 rounded-lg flex items-center hover:text-yellow-600 cursor-pointer'><Icon icon="bx:file" className='mr-2' />Click to upload</div>
                  )
                }
                <input onChange={onSelectFile} ref={fileInputRef} type='file' accept='.pdf, .docs' hidden />
                <div className='w-full flex flex-col mt-8'>
                  <div onClick={() => { applyJobPost(jobPost.id!); }} className={`w-fit ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} px-8 py-1 rounded-lg mt-4 cursor-pointer hover:bg-green-600 duration-300 active:scale-110 select-none`}>Submit Application</div>
                </div>
              </div>
            ) : (
              <div className='w-full flex flex-col'>
                <div className='w-fit bg-green-500 px-8 py-1 rounded-lg flex items-center select-none'><Icon icon="bx:file" className='mr-2' /> Applied</div>
              </div>
            )
          }
        </div>
        <div className='w-1/2 h-fit max-h-screen overflow-auto py-8 px-5 border rounded-xl border-white whitespace-pre-line'>
          {jobPost.description}
        </div>
      </div>
      {
        jobPosts.length > 0 && (
          <>
            <hr className='my-10' />
            <div className='w-full'>
              <h1 className='w-full text-xl font-semibold mb-8'>Similar Jobs:</h1>
              <div className="w-full flex flex-wrap">
                {
                  jobPosts.map((job, index) => {
                    if (job.id == jobPost.id) {
                      return '';
                    }

                    return (
                      <div key={index} className='w-1/4 pr-2 pb-2'>
                        <JobPostCardForSearchResult jobPost={job} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default SingleJobPost