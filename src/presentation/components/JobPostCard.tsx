import { NavLink } from "react-router-dom";

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
    jobData: JobPostEntity;
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

    const getTimeDifferenceString = (dateString: string) => {
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
        <NavLink to={`/job-posts/${jobData.id}`} className={`flex flex-col justify-around cursor-pointer bg-white ${cardStyle == 'Large' ? LargeSize.card : SmallSize.card}  shadow-white shadow-lg text-black `}>
            <div className={`flex justify-start items-center gap-3 `}>
                <img src={jobData.organization?.profile_image_url} alt="" className={`rounded-full ${cardStyle == 'Large' ? LargeSize.logo : SmallSize.logo}  `}/>
                <p className={`font-semibold text-xs ${cardStyle == 'Large' ? LargeSize.div1_text : SmallSize.div1_text}  `}>{jobData.organization?.name}</p>
                <p className={`opacity-40 ${cardStyle == 'Large' ? LargeSize.div1_text : SmallSize.div1_text}`}>{getTimeDifferenceString(jobData.updated_at as string)}</p>
            </div>
            <div className={`flex flex-col justify-center items-start gap-1`}>
                <h1 className={` font-semibold ${cardStyle == 'Large' ? LargeSize.div2_text.skill : SmallSize.div2_text.skill}  `}>{jobData.title}</h1>
                <span className={`opacity-40 text-[0.6rem] ${cardStyle == 'Large' ? LargeSize.div2_text.location : SmallSize.div2_text.location}  `}>{jobData.location}</span>
            </div>
            <p className={`font-semibold  flex items-center gap-1 ${cardStyle == 'Large' ? LargeSize.tag : SmallSize.tag}  `}>
                <div className={`${jobData.contractType.toLocaleLowerCase() == 'full-time' ? 'bg-blue-700' : 'bg-green-700'} inline-block w-1.5 h-1.5 rounded-full`}></div>
                {jobData.contractType} 
            </p>
        </NavLink>
    );
}

export default JobPostCard;
