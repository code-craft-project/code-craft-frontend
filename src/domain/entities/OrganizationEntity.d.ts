type OrganizationType = 'club' | 'company';
interface OrganizationEntity {
    id?: number;
    name: string;
    creator_id?: number;
    creator?: UserEntity;
    type?: OrganizationType;
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
    isChallengesLoading: boolean;
    getOrganizationById: (organizationId: number) => void;
    getOrganizationEvents: (organizationId: number, page: number, limits: number) => void;
    getOrganizationChallenges: (organizationId: number) => void;
}

interface useOrganizationDashboardReturn {
    organization: OrganizationEntity;
    editOrganization: OrganizationEntity;
    challenges: ChallengeEntity[];
    events: EventEntity[];
    members: MemberEntity[],
    jobPosts: JobPostEntity[];
    dashboardStats: OrganizationDashboardStats;
    member: MemberEntity;
    isLoading: boolean;
    isChallengesLoading: boolean;
    isEventsLoading: boolean;
    isMembersLoading: boolean;
    isDashboardStatsLoading: boolean;
    isMemberLoading: boolean;
    isJobPostsLoading: boolean;
    isMember: boolean;
    updateOrganization: () => Promise<void>,
    getOrganizationById: (organizationId: number) => void;
    getOrganizationEvents: (organizationId: number, page: number, limits: number) => void;
    getOrganizationChallenges: (organizationId: number) => void;
    getOrganizationMembers: (organizationId: number) => void;
    getOrganizationJobPosts: (organizationId: number) => void;
    getOrganizationDashboardStats: (organizationId: number) => void;
    getCurrentMember: (organizationId: number) => void;
    hasPermissions: (role: MemberRole) => boolean;
    setEditOrganization: React.Dispatch<React.SetStateAction<OrganizationEntity>>;
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    imageUrl: string | undefined;
    setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface OrganizationDashboardStats {
    latest_events: EventEntity[];
    latest_challenges: ChallengeEntity[];
    latest_members: MemberEntity[];
    total_members: number;
    total_events: number;
    total_challenges: number;
    total_participants: number;
};

interface useCreateOrganizationReturn {
    organization: OrganizationEntity;
    setOrganization: React.Dispatch<React.SetStateAction<OrganizationEntity>>;
    createOrganization: () => Promise<void>;
    isLoading: boolean;
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    imageUrl: string;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

interface OrganizationCard {
    id: number;
    name: string;
    logo: string;
    type: OrganizationType;
}

interface useOrganizationChallengeReturn {
    createOrganizationChallenge: (organization_id: number) => Promise<void>;
    challenge: ChallengeEntity | null,
    setChallenge: React.Dispatch<React.SetStateAction<ChallengeEntity | null>>
    isLoading: boolean;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    fileUrl: string;
    setFileUrl: React.Dispatch<React.SetStateAction<string>>;

}