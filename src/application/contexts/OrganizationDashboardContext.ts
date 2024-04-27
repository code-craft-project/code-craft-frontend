import { createContext } from "react";

const initialValue: useOrganizationDashboardReturn = {
    challenges: [],
    events: [],
    getOrganizationById: async (org_id: number) => { org_id; },
    getOrganizationChallenges: async (org_id: number) => { org_id; },
    getOrganizationEvents: async (org_id: number) => { org_id; },
    isChallengesLoading: true,
    isLoading: true,
    organization: {
        description: '',
        name: '',
        type: 'company',
    },
    dashboardStats: { latest_challenges: [], latest_events: [], latest_members: [], total_challenges: 0, total_events: 0, total_members: 0, total_participants: 0 },
    getOrganizationDashboardStats: async (org_id: number) => { org_id; },
    getOrganizationMembers: async (org_id: number) => { org_id; },
    isDashboardStatsLoading: true,
    isEventsLoading: true,
    isMembersLoading: true,
    members: []
};

export default createContext<useOrganizationDashboardReturn>(initialValue);