import { useContext, useState } from "react"
import ToastContext from "../contexts/ToastContext";
import { filesUploadServices, jobPostsService } from "../services";
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
    const [jobPost, setJobPost] = useState<JobPostEntity>(jobPostsFormat);
    const [jobApplication, setJobApplication] = useState<JobApplicationEntity>({ cover_message: '', job_post_id: 0, resume_url: '', user_id: 0 });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = (message: string) => { toastManager.alertSuccess(message); }
    const alertErroreHandler = (message: string) => { toastManager.alertError(message); }
    const setTitle = (title: string): void => setJobPost(prev => ({ ...prev, title }))
    const setDescription = (description: string): void => setJobPost(prev => ({ ...prev, description }))
    const setRole = (role: string): void => setJobPost(prev => ({ ...prev, role }))
    const setLocation = (location: string): void => setJobPost(prev => ({ ...prev, location }))
    const setType = (type: JobType): void => setJobPost(prev => ({ ...prev, type }))
    const setCreatedAt = (created_at: string): void => setJobPost(prev => ({ ...prev, created_at }))
    const setContractType = (contractType: ContractType): void => setJobPost(prev => ({ ...prev, contractType }))
    const setCreatorId = (organization_id: number): void => setJobPost(prev => ({ ...prev, organization_id }))

    const createJobPost = async (): Promise<void> => {
        try {
            const currentDate = new Date()
            setCreatedAt(currentDate.getDay().toString())
            const response = await jobPostsService.createJobPost(jobPost)
            if (response.status == "success") {
                alertSuccessHandler("Creation job post successful");
                setTimeout(() => {
                    window.location.href = `/organization/${jobPost.organization_id}/dashboard`;
                }, 2000);
            } else {
                console.error('Creation job post failed:', response.message);
                alertErroreHandler('Creation job post failed:' + response.message);
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
            const { id, created_at, organization_id, organization, updated_at, ...rest } = jobPost
            const response = await jobPostsService.updateJobPost(jobPost.id as number, rest)
            if (response.status == "success") {
                alertSuccessHandler("Updating job post successful");
                setTimeout(() => {
                    window.location.href = `/organization/${jobPost.organization_id}/dashboard`;
                }, 2000);
            } else {
                console.error('Updating job post failed:', response.message);
                alertErroreHandler('Updating job post failed:' + response.message);
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Creation failed");
        }
    }

    const deleteJobPost = async (jobPostId: number): Promise<void> => {
        try {
            const response = await jobPostsService.deleteJobPost(jobPostId)
            if (response.status == "success") {
                alertSuccessHandler("Delete job post successful");
                setTimeout(() => {
                    window.location.href = `/organization/${jobPost.organization_id}/dashboard`;
                }, 2000);
            } else {
                console.error('Delete job post failed:', response.message);
                alertErroreHandler('Delete job post failed:' + response.message);
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Delete failed");
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
        if (!resumeFile) {
            alertErroreHandler("You must add a Resume");
            return;
        }

        try {
            const fileUploadResponse = await filesUploadServices.uploadFile(resumeFile);
            if (fileUploadResponse.status == 'success') {
                let resumeUrl = fileUploadResponse.data;
                const response = await jobPostsService.applyJobPost(jobPostId, { resume_url: resumeUrl, cover_message: jobApplication.cover_message })
                if (response.status == "success") {
                    alertSuccessHandler("Applied Successfully");
                    setJobApplication({ cover_message: '', resume_url: '' });
                    setResumeFile(null);
                    setJobPost(s => ({ ...s, didApply: true }));
                } else {
                    console.error('applying job post failed:', response.message);
                    alertErroreHandler("applying job post failed");
                }
            } else {
                console.error('fileUploadResponse Failed:', fileUploadResponse.message);
                alertErroreHandler("Uploading Resume failed.");
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
        applyJobPost,
        setCreatorId,
        deleteJobPost,
        jobApplication, setJobApplication,
        resumeFile, setResumeFile
    }
}