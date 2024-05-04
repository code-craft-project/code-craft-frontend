import { useContext, useState } from "react"
import ToastContext from "../contexts/ToastContext";
import { eventsService } from "../services";
const initEvent: EventEntity = {
    title: '',
    description: '',
    end_at: '',
    is_public: true,
    is_team_based: true,
    organization_id: 1,
    start_at: ''
};

export default function useEvent() {
    const [event, setEvent] = useState<EventEntity>(initEvent);
    const [teams, setTeams] = useState<TeamEntity[]>([]);
    const [eventChallenges, setEventChallenges] = useState<ChallengeEntity[]>([]);
    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = (message: string) => { toastManager.alertSuccess(message) }
    const alertErroreHandler = (message: string) => { toastManager.alertError(message); }
    const setTitle = (title: string): void => setEvent(prev => ({ ...prev, title }))
    const setDescription = (description: string): void => setEvent(prev => ({ ...prev, description }))
    const setIs_public = (is_public: boolean): void => setEvent(prev => ({ ...prev, is_public }))
    const setPassword = (password: string): void => setEvent(prev => ({ ...prev, password }))
    const setStartAt = (start_at: string): void => setEvent(prev => ({ ...prev, start_at }))
    const setEndAt = (end_at: string): void => setEvent(prev => ({ ...prev, end_at }))
    const setOrganizationId = (organization_id: number): void => setEvent(prev => ({ ...prev, organization_id }))
    const setIsTeamBased = (is_team_based: boolean): void => setEvent(prev => ({ ...prev, is_team_based }))
    const setMaxTeamMembers = (max_team_members: number): void => setEvent(prev => ({ ...prev, max_team_members }))
    const [isChallengesLoading, setIsChallengesLoading] = useState(false);
    const [isTeamsLoading, setIsTeamsLoading] = useState(false);

    const createEvent = async (ev: any): Promise<void> => {
        ev.preventDefault();
        try {
            const response = await eventsService.createEvent(event)
            if (response.status == "success") {
                alertSuccessHandler("Creation event successful");
                setTimeout(() => {
                    window.location.href = `/organization/${event.organization_id}/dashboard`;
                }, 2000);
            } else {
                console.error('Creation event failed:', response.message);
                alertErroreHandler("Creation event failed");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Creation failed");
        }
    }

    const updateEvent = async (): Promise<void> => {
        try {
            const { id, password, logo_url, organization_id, organization, ...rest } = event
            const response = await eventsService.updateEvent(event.id as number, rest)
            if (response.status == "success") {
                alertSuccessHandler("Updating event successful");
                setTimeout(() => {
                    window.location.href = `/organization/${event.id}/dashboard`;
                }, 2000);
            } else {
                console.error('Updating event failed:', response.message);
                alertErroreHandler("Updating event failed");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Creation failed");
        }
    }

    const getEventById = async (eventId: number): Promise<void> => {
        try {
            const response = await eventsService.getEventById(eventId)
            if (response.status == "success") {
                setEvent(response.data)
            } else {
                console.error('getting event failed:', response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const joinEvent = async (eventId: number): Promise<void> => {
        try {
            const response = await eventsService.joinEvent(eventId, event.password)
            if (response.status == "success") {
                alertSuccessHandler("Success! You've successfully joined the event. Get ready for an exciting experience. See you there!");
                setEvent(state => ({ ...state, didJoin: true }));
            } else {
                console.error('Joining event failed:', response.message);
                alertErroreHandler(response.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Joining failed");
        }
    }

    const leaveEvent = async (eventId: number): Promise<void> => {
        try {
            const response = await eventsService.leaveEvent(eventId)
            if (response.status == "success") {
                alertSuccessHandler("Confirmation: You've successfully left the event. We hope to see you at future events");
                setEvent(state => ({ ...state, didJoin: false }));
            } else {
                console.error('leaving event failed:', response.message);
                alertErroreHandler(response.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("leaving failed");
        }
    }

    const getEventChallenges = async (eventId: number) => {
        setIsChallengesLoading(true);
        try {
            const response = await eventsService.getEventChallenges(eventId)
            if (response.status == "success") {
                setEventChallenges(response.data);
            } else {
                console.log(response.message);
            }
        } catch (e) {
            console.log(e)
        }
        setIsChallengesLoading(false);
    }

    const getEventChallengesByTopic = async (eventId: number, topic: ChallengeTopic) => {
        setIsChallengesLoading(true);
        const response = await eventsService.getEventChallengesByTopic(eventId, topic);
        if (response.status == 'success') {
            setEventChallenges(response.data);
        } else {
            // TODO: Handle Error
            return;
        }
        setIsChallengesLoading(false);
    }

    const getTeams = async (eventId: number) => {
        setIsTeamsLoading(true);
        try {
            const response = await eventsService.getEventTeams(eventId)
            if (response.status == "success") {
                setTeams(response.data);
            } else {
                console.log(response.message);
            }
        } catch (e) {
            console.log(e)
        }
        setIsTeamsLoading(false);
    }



    return {
        event, setEvent,
        setPassword, setTitle, setDescription, setIs_public,
        createEvent, updateEvent, joinEvent, leaveEvent, setStartAt, setEndAt,
        getEventById, eventChallenges, getEventChallenges, setOrganizationId,
        setMaxTeamMembers, setIsTeamBased, isChallengesLoading, getTeams, isTeamsLoading,
        teams, setTeams, getEventChallengesByTopic
    }
}