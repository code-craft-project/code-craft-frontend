import { useState } from "react";
import { organizationsService } from "../services";

const initOrganization: OrganizationEntity = {
    name: '',
    description: '',
    type: 'company',
};

export default function useOrganizationDashboard(): useOrganizationDashboardReturn {
    const [organization, setOrganization] = useState<OrganizationEntity>(initOrganization);
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [isEventsLoading, setIsEventsLoading] = useState(true);
    const [challenges, setChallenges] = useState<ChallengeEntity[]>([]);
    const [isChallengesLoading, setIsChallengesLoading] = useState(true);
    const [members, setMembers] = useState<MemberEntity[]>([]);
    const [isMembersLoading, setIsMembersLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState<OrganizationDashboardStats>({ latest_challenges: [], latest_events: [], latest_members: [], total_challenges: 0, total_events: 0, total_members: 0, total_participants: 0 });
    const [isDashboardStatsLoading, setIsDashboardStatsLoading] = useState(true);

    const getOrganizationById = async (organizationId: number): Promise<void> => {
        const response = await organizationsService.getOrganizationById(organizationId);
        setIsLoading(false);
        if (response.status == 'success') {
            setOrganization(response.data);
        } else {
            // TODO: Handle Error
        }
    }

    const getOrganizationEvents = async (organizationId: number, page: number, limits: number): Promise<void> => {
        setIsEventsLoading(true);
        const response = await organizationsService.getOrganizationEvents(organizationId, page, limits);
        setIsEventsLoading(false);
        if (response.status == 'success') {
            setEvents(response.data);
        } else {
            // TODO: Handle Error
        }
    }

    const getOrganizationChallenges = async (organizationId: number): Promise<void> => {
        setIsChallengesLoading(true);
        const response = await organizationsService.getOrganizationChallenges(organizationId);
        setIsChallengesLoading(false);
        if (response.status == 'success') {
            setChallenges(response.data);
        } else {
            // TODO: Handle Error
        }
    }

    const getOrganizationMembers = async (organizationId: number): Promise<void> => {
        setIsMembersLoading(true);
        const response = await organizationsService.getOrganizationMembers(organizationId);
        setIsMembersLoading(false);
        if (response.status == 'success') {
            setMembers(response.data);
        } else {
            // TODO: Handle Error
        }
    }

    const getOrganizationDashboardStats = async (organizationId: number): Promise<void> => {
        setIsDashboardStatsLoading(true);
        const response = await organizationsService.getOrganizationDashboardStats(organizationId);
        setIsDashboardStatsLoading(false);
        if (response.status == 'success') {
            setDashboardStats(response.data);
        } else {
            // TODO: Handle Error
        }
    }

    return {
        organization, getOrganizationById,
        events, getOrganizationEvents,
        challenges, getOrganizationChallenges,
        members, getOrganizationMembers,
        dashboardStats, getOrganizationDashboardStats,
        isLoading, isChallengesLoading, isEventsLoading, isMembersLoading, isDashboardStatsLoading
    };
}