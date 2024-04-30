import { useEffect } from "react";
import GradientColor from "../../application/data/GradientColor"
import { useParams } from "react-router-dom";
import useJobPost from "../../application/hooks/useJobPost";

function JobPostForm(formType: 'create' | 'update') {
    const { styles } = GradientColor()
    const { jobPost, setTitle, setDescription, createJobPost, updateJobPost,setLocation, getJobPostById, setRole,setType,setContractType } = useJobPost()
    const { id } = useParams()

    useEffect(() => {
        if ((formType === 'update') && id) {
            getJobPostById(parseInt(id))
        }
    }, [])


    return (
        <form onSubmit={formType ? createJobPost : updateJobPost} className="flex flex-col gap-5 w-1/2 items-center">
            <div className="flex flex-col gap-5 w-1/2 items-center">
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start ">Title</h1>
                    <input 
                        type="text" 
                        className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " 
                        placeholder="Enter Job Post Name"
                        value={jobPost.title}
                        onChange={ev => setTitle(ev.target.value)}
                        />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start ">Role</h1>
                    <input 
                        type="text" 
                        className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " 
                        placeholder="Enter Role" 
                        value={jobPost.role}
                        onChange={ev => setRole(ev.target.value)}
                    />
                </div>
                <div className="flex w-full gap-3 items-start">
                    <div className="flex flex-col gap-2 w-[49%]">
                        <h1 className="text-xl font-meduim text-start">Place</h1>
                        <select  onChange={ ev => {setType(ev.target.value as JobType)}} className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                            <option disabled>Select Place</option>
                            <option value="Remote">Remote</option>
                            <option value="On-Site">On-Site</option>
                            <option value="Hyprid">Hyprid</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-[49%]">
                        <h1 className="text-xl font-meduim text-start">Contract Type</h1>
                        <select onChange={ ev => {setContractType(ev.target.value as ContractType)}} className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                            <option value="">Select Contract Type</option>
                            <option value="">Full-time</option>
                            <option value="">Part-Time</option>
                            <option value="">Internship</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start ">Location</h1>
                    <input 
                        type="text" 
                        className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " 
                        placeholder="Enter Location"
                        value={jobPost.location}
                        onChange={ev => setLocation(ev.target.value)}

                    />
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-meduim text-start">Description</h1>
                    <textarea 
                        cols={85} 
                        rows={5} 
                        className="w-full text-black p-3 placeholder:font-meduim font-meduim rounded-lg" 
                        placeholder="text.."
                        value={jobPost.description}
                        onChange={ev => setDescription(ev.target.value)}    
                    />
                </div>
            </div>
            <button className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  font-meduim px-3 py-1 rounded-lg w-full mt-5 hover:opacity-90 active:scale-105 transition-all duration-300`}>Create</button>
        </form>
    )
}

export default JobPostForm