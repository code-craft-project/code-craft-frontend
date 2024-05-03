interface EventEntity {
    id?: number;
    title: string;
    description: string;
    is_public: boolean;
    password?: string; // Or Maybe with links
    logo_url?: string;
    start_at: timestamp;
    end_at: timestamp;
    organization_id: number;
    organization: OrganizationEntity
    is_team_based: boolean;
    max_team_members?: number;
};

type eventDataCard = {
    id: number;
    logo_url?: string;
    title:string,
    start_at:string,
    end_at: timestamp;

}