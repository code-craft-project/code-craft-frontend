interface JobPostEntity {
    id?: number;
    title: string;
    description: string;
    role: string;
    type: JobTypes;
    location: string;
    organization_id: number;
    created_at?: string;
    contractType: contractType
};

type JobTypes = 'Remote' | 'On-Site' | 'Hyprid'
type contractType = 'Full-time' | 'Part-Time' | 'Internship'