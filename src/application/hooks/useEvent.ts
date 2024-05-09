import { useContext, useState } from "react"
import ToastContext from "../contexts/ToastContext";
import { eventsService } from "../services";

const initEvent: EventEntity = {
    title: '',
    description: '',
    start_at: '01-01-2024',
    end_at: '03-01-2024',
    is_public: true,
    is_team_based: true,
    organization_id: 0
};

export default function useEvent() {
    const [event, setEvent] = useState<EventEntity>(initEvent);
    const [teams, setTeams] = useState<TeamEntity[]>([]);
    const [eventChallenges, setEventChallenges] = useState<ChallengeEntity[]>([]);
    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = (message: string) => { toastManager.alertSuccess(message) }
    const alertErroreHandler = (message: string) => { toastManager.alertError(message); }
    const [isChallengesLoading, setIsChallengesLoading] = useState(false);
    const [isTeamsLoading, setIsTeamsLoading] = useState(false);

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
        event, setEvent, joinEvent, leaveEvent,
        getEventById, eventChallenges, getEventChallenges,
        isChallengesLoading, getTeams, isTeamsLoading,
        teams, setTeams, getEventChallengesByTopic
    }
}