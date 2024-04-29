import { useContext, useState } from "react"
import ToastContext from "../contexts/ToastContext";
import { jobPostsService } from "../services";
const jobPostsFormat: JobPostEntity = {
    title: '',
    description: '',
    role: '',
    type: 'remote',
    location: '',
    created_at: '',
    organization_id: 0,
    organization: undefined,
    contractType: 'full-time',
}

export default function useJobPost() {

    const [jobPost, setJobPost] = useState<JobPostEntity>(jobPostsFormat)
    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = (_p0: string) => { toastManager.alertSuccess('Success Message') }
    const alertErroreHandler = (_p0: string) => { toastManager.alertError("Error Message"); }
    const setTitle = (title: string): void => setJobPost(prev => ({ ...prev, title }))
    const setDescription = (description: string): void => setJobPost(prev => ({ ...prev, description }))
    const setRole = (role: string): void => setJobPost(prev => ({ ...prev, role }))
    const setLocation = (location: string): void => setJobPost(prev => ({ ...prev, location }))
    const setType = (type: JobType): void => setJobPost(prev => ({ ...prev, type }))
    const setCreatedAt = (created_at: string): void => setJobPost(prev => ({ ...prev, created_at }))
    const setContractType = (contractType: ContractType): void => setJobPost(prev => ({ ...prev, contractType }))

    const createJobPost = async (ev: any): Promise<void> => {
        ev.preventDefault();
        try {
            const currentDate = new Date()
            setCreatedAt(currentDate.getDay().toString())
            const response = await jobPostsService.createJobPost(jobPost)
            if (response.status == "success") {
                alertSuccessHandler("Creation job post successful");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            } else {
                console.error('Creation job post failed:', response.message);
                alertErroreHandler("Creation job post failed");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Creation failed");
        }
    }

    const updateJobPost = async (): Promise<void> => {
        try {
            const currentDate = new Date()
            setCreatedAt(currentDate.getDay().toString())
            const response = await jobPostsService.updateJobPost(jobPost.id as number, jobPost)
            if (response.status == "success") {
                alertSuccessHandler("Updating job post successful");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            } else {
                console.error('Updating job post failed:', response.message);
                alertErroreHandler("Updating job post failed");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Creation failed");
        }
    }

    const getJobPostById = async (jobPostId: number): Promise<void> => {
        try {
            const response = await jobPostsService.getJobPostById(jobPostId)
            if (response.status == "success") {
                setJobPost(response.data)
            } else {
                console.error('getting job post failed:', response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const applyJobPost = async (jobPostId: number): Promise<void> => {
        try {
            const response = await jobPostsService.applyJobPost(jobPostId)
            if (response.status == "success") {
                alertSuccessHandler("applying job post successful");
            } else {
                console.error('applying job post failed:', response.message);
                alertErroreHandler("applying job post failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        setTitle,
        setDescription,
        updateJobPost,
        getJobPostById,
        jobPost,
        setRole,
        setType,
        setLocation,
        setContractType,
        createJobPost,
        applyJobPost
    }
}