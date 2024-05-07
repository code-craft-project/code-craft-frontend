import { NavLink } from "react-router-dom";

type JobData = {
    id: number
    logo: string;
    company: string;
    skill: string;
    location: string;
    tag: string;
    date_posted: string;
    tag_color: string
};

type Size = {
    card: String;
    logo: String;
    div1_text: String;
    div2_text:{
        skill:String;
        location:String
    }
    tag:String
}

type JobPostCardProps = {
    jobData: JobData;
    cardStyle: 'Large' | 'Small';
};

// function JobPostCard({ jobData }: { jobData: JobData }, cardStyle:'Large'|'Small') {
const JobPostCard: React.FC<JobPostCardProps> = ({ jobData, cardStyle }) => {

    const LargeSize:Size = {
        card: 'rounded-2xl p-5 shadow-2xl w-56 h-56',
        logo: 'w-8 h-8 ',
        div1_text: 'text-xs',
        div2_text:{
            skill:'w-3 text-2xl',
            location:'text-[0.6rem]',
        },
        tag:'text-[0.5rem]'
    }
    const SmallSize:Size = {
        card: 'rounded-xl p-3 shadow-lg w-40 h-40',
        logo: 'w-5 h-5 ',
        div1_text: 'text-[6px]',
        div2_text:{
            skill:'w-2 text-xl',
            location:'text-[0.4.5rem]',
        },
        tag:'text-[0.5rem]'
    }
    return (
        <NavLink to={`/job-posts/${jobData.id}`} className={`flex flex-col justify-around cursor-pointer bg-white ${cardStyle == 'Large' ? LargeSize.card : SmallSize.card}  shadow-white text-black `}>
            <div className={`flex justify-start items-center gap-3 `}>
                <img src={jobData.logo} alt="" className={`rounded-full ${cardStyle == 'Large' ? LargeSize.logo : SmallSize.logo}  `}/>
                <p className={`font-semibold text-xs ${cardStyle == 'Large' ? LargeSize.div1_text : SmallSize.div1_text}  `}>{jobData.company}</p>
                <p className={`opacity-40 ${cardStyle == 'Large' ? LargeSize.div1_text : SmallSize.div1_text}`}>{jobData.date_posted}</p>
            </div>
            <div className={`flex flex-col justify-center items-start gap-1`}>
                <h1 className={` font-semibold ${cardStyle == 'Large' ? LargeSize.div2_text.skill : SmallSize.div2_text.skill}  `}>{jobData.skill}</h1>
                <span className={`opacity-40 text-[0.6rem] ${cardStyle == 'Large' ? LargeSize.div2_text.location : SmallSize.div2_text.location}  `}>{jobData.location}</span>
            </div>
            <p className={`font-semibold  flex items-center gap-1 ${cardStyle == 'Large' ? LargeSize.tag : SmallSize.tag}  `}>
                <div className={`bg-${jobData.tag_color} inline-block w-1 h-1 rounded-full`}></div>
                {jobData.tag} 
            </p>
        </NavLink>
    );
}

export default JobPostCard;
