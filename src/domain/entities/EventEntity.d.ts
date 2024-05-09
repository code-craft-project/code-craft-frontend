interface EventEntity {
    id?: number;
    title: string;
    description: string;
    is_public: boolean;
    password?: string; // Or Maybe with links
    logo_url?: string;
    start_at: timestamp;
    end_at: timestamp;
    organization_id?: number;
    organization?: OrganizationEntity
    is_team_based: boolean;
    max_team_members?: number;
    didJoin?: boolean;
};

type eventDataCard = {
    id: number;
    logo_url?: string;
    title: string,
    start_at: string,
    end_at: timestamp;

}

interface UseCreateEventReturn {
    event: EventEntity;
    setEvent: React.Dispatch<React.SetStateAction<EventEntity>>;
    logoFile: File | null;
    setLogoFile: React.Dispatch<React.SetStateAction<File | null>>;
    resetEvent: () => void;
    createEvent: (organizationId: number) => Promise<EventEntity | null>;
    updateEvent: () => Promise<void>;
}