interface JobPostEntity {
    id?: number;
    title: string;
    description: string;
    role: string;
    type: string;
    location: string;
    organization_id: number;
    created_at?: string;
};