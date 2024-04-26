interface OrganizationEntity {
    id?: number;
    name: string;
    creator_id?: number;
    creator?: UserEntity;
    type: 'club' | 'company';
    profile_image_url?: string;
    description: string;
    created_at?: string;
    updated_at?: string;
};

interface useOrganizationReturn {
    organization: OrganizationEntity;
    challenges: ChallengeEntity[];
    events: EventEntity[];
    isLoading: boolean;
    getOrganizationById: (organizationId: number) => void;
    getOrganizationEvents: (organizationId: number, page: number, limits: number) => void;
    getOrganizationChallenges: (organizationId: number) => void;
}