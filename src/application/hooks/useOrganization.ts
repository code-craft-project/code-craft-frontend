import { useState } from "react";
import { organizationsService } from "../services";

const initOrganization: OrganizationEntity = {
    name: '',
    description: '',
    type: 'company',
};

export default function useOrganization(): useOrganizationReturn {
    const [organization, setOrganization] = useState<OrganizationEntity>(initOrganization);
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [challenges, setChallenges] = useState<ChallengeEntity[]>([]);
    const [isChallengesLoading, setIsChallengesLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

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
        const response = await organizationsService.getOrganizationEvents(organizationId, page, limits);
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

    return {
        organization, getOrganizationById,
        events, getOrganizationEvents,
        challenges, getOrganizationChallenges,
        isLoading, isChallengesLoading
    };
}