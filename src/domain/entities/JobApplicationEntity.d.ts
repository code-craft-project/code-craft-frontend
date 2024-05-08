interface JobApplicationEntity {
    id?: number;
    job_post_id?: number;
    user_id?: number;
    user?: UserEntity;
    cover_message: string;
    resume_url: string;
    created_at?: string;
};