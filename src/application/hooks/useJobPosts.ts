import { useEffect, useState } from "react";
import { jobPostsService } from "../services";

export default function useJobPosts() {
    const [jobPosts, setJobPosts] = useState<JobPostEntity[]>([]);

    useEffect(() => {
        getJobPosts(1);
    }, []);

    const getJobPosts = async (page:number) => {
        try {
            const response = await jobPostsService.getJobPosts(page)
            if (response.status == "success") {
                setJobPosts(response.data);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { jobPosts };
}