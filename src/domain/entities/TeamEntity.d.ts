interface TeamEntity {
    id?: number;
    name: string;
    description: string;
    is_private: boolean;
    password?: string;
    leader_id?: number;
    leader?: UserEntity;
    event_id?: number;
    score?: number;
    members?: number;
};

interface JoinTeamRequest {
    team_id: string,
    password: string
}

interface CreateTeam {
    name: string,
    description: string,
    is_private: true,
    password: string,
    leader_id: 0,
    event_id: 0
}

interface JoinTeam {
    team_id: number;
    password?: string;
};