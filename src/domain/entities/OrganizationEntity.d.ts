interface OrganizationEntity {
    id?: number;
    name: string;
    creator_id?: number;
    creator?: UserEntity;
    type?: 'club' | 'company';
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
    dashboardStats: OrganizationDashboardStats;
    member: MemberEntity;
    isLoading: boolean;
    isChallengesLoading: boolean;
    isEventsLoading: boolean;
    isMembersLoading: boolean;
    isDashboardStatsLoading: boolean;
    isMemberLoading: boolean;
    isMember: boolean;
    updateOrganization: () => Promise<void>,
    getOrganizationById: (organizationId: number) => void;
    getOrganizationEvents: (organizationId: number, page: number, limits: number) => void;
    getOrganizationChallenges: (organizationId: number) => void;
    getOrganizationMembers: (organizationId: number) => void;
    getOrganizationDashboardStats: (organizationId: number) => void;
    getCurrentMember: (organizationId: number) => void;
    hasPermissions: (role: MemberRole) => boolean;
    setEditOrganization: React.Dispatch<React.SetStateAction<OrganizationEntity>>;
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