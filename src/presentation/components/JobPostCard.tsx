type JobData = {
    logo: string;
    company: string;
    skill: string;
    location: string;
    tag: string;
    date_posted: string;
    tag_color: string
};

function JobPostCard({ jobData }: { jobData: JobData }) {
    return (
        <div className='flex flex-col justify-around cursor-pointer bg-white rounded-2xl p-5 shadow-2xl shadow-white text-black w-56 h-56'>
            <div className="flex justify-start items-center gap-3">
                <img src={jobData.logo} alt="" className="w-8 h-8 rounded-full"/>
                <p className="font-semibold text-xs">{jobData.company}</p>
                <p className="opacity-40 text-xs">{jobData.date_posted}</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
                <h1 className="w-3 text-2xl font-semibold">{jobData.skill}</h1>
                <span className="opacity-40 text-[0.6rem]">{jobData.location}</span>
            </div>
            <p className="font-semibold text-[0.5rem] flex items-center gap-1">
                <div className={`bg-${jobData.tag_color} inline-block w-1 h-1 rounded-full`}></div>
                {jobData.tag} 
            </p>
        </div>
    );
}

export default JobPostCard;
