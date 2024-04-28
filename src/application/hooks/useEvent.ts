import { useContext, useState } from "react"
import ToastContext from "../contexts/ToastContext";
import { eventsService } from "../services";
const eventFormat: EventEntity = {
    title: '',
    description: '',
    is_public: false,
    password: '',
    logo_url: '',
    start_at: '',
    end_at: '',
    organization_id: 0,
    is_team_based: false,
    max_team_members: 0,
}

const challengeFormat: ChallengeEntity = {
        id: 0,
        title: '',
        description: '',
        topic: '',
        level: 'Easy',
        is_public: false,
        type: "in_out",
        creator_id: 0,
        creator: {id: 0,username: '',first_name: '',last_name: '',email: '',password: '',created_at: '',updated_at: '',profile_image_url: ''}
        ,comments: 0,
        submissions: 0,
        score: 0,
        status: 'Not Started',
    }

export default function useEvent() {

    const [event, setEvent] = useState<EventEntity>(eventFormat)
    const [eventChallenges, setEventChallenges] = useState<ChallengeEntity[]>([challengeFormat])
    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = (_p0: string) => { toastManager.alertSuccess('Success Message') }
    const alertErroreHandler = (_p0: string) => { toastManager.alertError("Error Message"); }
    const setTitle = (title: string): void => setEvent(prev => ({ ...prev, title }))
    const setDescription = (description: string): void => setEvent(prev => ({ ...prev, description }))
    const setIs_public = (is_public: boolean): void => setEvent(prev => ({ ...prev, is_public }))
    const setPassword = (password: string): void => setEvent(prev => ({ ...prev, password }))
    const setStartAt = (start_at: string): void => setEvent(prev => ({ ...prev, start_at }))
    const setEndAt = (end_at: string): void => setEvent(prev => ({ ...prev, end_at }))

    const createEvent = async (ev: any): Promise<void> => {
        ev.preventDefault();
        try {
            const response = await eventsService.createEvent(event)
            if (response.status == "success") {
                alertSuccessHandler("Creation event successful");
                setTimeout(() => {
                    window.location.href = "/dashboard";
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
            const response = await eventsService.updateEvent(event.id as number, event)
            if (response.status == "success") {
                alertSuccessHandler("Updating event successful");
                setTimeout(() => {
                    window.location.href = "/dashboard";
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

    const joinEvent = async (ev: any): Promise<void> => {
        ev.preventDefault();
        try {
            const eventId = ev.target.value
            const response = await eventsService.joinEvent(eventId, event.password)
            if (response.status == "success") {
                alertSuccessHandler("Joining event successful");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            } else {
                console.error('Joining event failed:', response.message);
                alertErroreHandler("Joining event failed");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Joining failed");
        }
    }

    const leaveEvent = async (ev: any): Promise<void> => {
        ev.preventDefault();
        try {
            const eventId = ev.target.value
            const response = await eventsService.leaveEvent(eventId)
            if (response.status == "success") {
                alertSuccessHandler("leaving event successful");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            } else {
                console.error('leaving event failed:', response.message);
                alertErroreHandler("leaving event failed");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("leaving failed");
        }
    }

    const getEventChallenges = async (eventId:number) => {
        try{
            const response = await eventsService.getEventChallenges(eventId)
            if(response.status == "success") {
                setEventChallenges(response.data)
            }else{
                console.log(response.message);
            }
        }catch(e){
            console.log(e)
        }
    }

    return {
        event,
        setEvent,
        setPassword,
        setTitle,
        setDescription,
        setIs_public,
        createEvent,
        updateEvent,
        joinEvent,
        leaveEvent,
        setStartAt,
        setEndAt,
        getEventById,
        eventChallenges,
        getEventChallenges
    }
}