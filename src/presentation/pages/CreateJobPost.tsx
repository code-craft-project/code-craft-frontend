import GradientColor from "../../application/data/GradientColor"


function CreateJobPost() {
    const {styles} = GradientColor()

    
  return (
    <div className="my-16 ">
        <div className="flex flex-col gap-10 items-center">
            <h1 className="text-center font-semibold text-2xl">Create Job Post</h1>
            <div className="flex flex-col gap-5 w-1/2 items-center">
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start ">Title</h1>
                    <input type="text" className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " placeholder="Enter Job Post Name"/>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start ">Role</h1>
                    <input type="text" className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " placeholder="Enter Role"/>
                </div>
                <div className="flex w-full gap-3 items-start">
                    <div className="flex flex-col gap-2 w-[49%]">
                        <h1 className="text-xl font-meduim text-start">Place</h1>
                        <select className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                            <option value="">Select Place</option>
                            <option value="">Remote</option>
                            <option value="">On-Site</option>
                            <option value="">Hyprid</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-[49%]">
                        <h1 className="text-xl font-meduim text-start">Contract Type</h1>
                        <select className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                            <option value="">Select Contract Type</option>
                            <option value="">Full-time</option>
                            <option value="">Part-Time</option>
                            <option value="">Internship</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start ">Location</h1>
                    <input type="text" className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " placeholder="Enter Location"/>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-meduim text-start">Description</h1>
                    <textarea  cols={85} rows={5} className="w-full text-black p-3 placeholder:font-meduim font-meduim rounded-lg" placeholder="text.."/>
                </div>
            </div>
            <button className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  font-meduim px-3 py-1 rounded-lg w-1/2 hover:opacity-90 active:scale-105 transition-all duration-300`}>Create</button>
        </div>
    </div>
)
}

export default CreateJobPost