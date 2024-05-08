import { useState } from "react"
import { organizationsService } from "../services";

export default function useJobApplications() {
    const [jobApplications, setJobApplications] = useState<JobApplicationEntity[]>([]);

    const getJobApplications = async (organization_id: number, job_post_id: number) => {
        const res = await organizationsService.getJobApplications(organization_id, job_post_id);
        if (res.status == 'success') {
            setJobApplications(res.data);
        } else {
            // TODO: Handle Error
        }
    }

    return {
        jobApplications, getJobApplications
    };
}