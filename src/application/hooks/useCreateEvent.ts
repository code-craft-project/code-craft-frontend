import { useState } from "react"
import { eventsService, filesUploadServices } from "../services";

const initEvent: EventEntity = {
    description: '',
    end_at: '',
    is_public: true,
    is_team_based: true,
    organization_id: 0,
    start_at: '',
    title: ''
};

export default function useCreateEvent(): UseCreateEventReturn {
    const [event, setEvent] = useState<EventEntity>(initEvent);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const createEvent = async (organizationId: number): Promise<EventEntity | null> => {
        let path = '';
        if (logoFile) {
            let uploadResponse = await filesUploadServices.uploadImage(logoFile);
            if (uploadResponse.status == 'success') {
                path = uploadResponse.data;
            }
        }

        const res = await eventsService.createEvent(organizationId, { ...event, logo_url: path });
        if (res.status == 'success') {
            return res.data;
        }

        return null;
    }

    const updateEvent = async (): Promise<void> => {
        let path = '';
        if (logoFile) {
            let uploadResponse = await filesUploadServices.uploadImage(logoFile);
            if (uploadResponse.status == 'success') {
                path = uploadResponse.data;
            }
        }

        const res = await eventsService.updateEvent({ ...event, logo_url: path });
        if (res.status == 'success') {
            res.data;
        }
    }

    const resetEvent = () => {
        setEvent(initEvent);
        setLogoFile(null);
    }

    return {
        event, setEvent, resetEvent,
        logoFile, setLogoFile, createEvent, updateEvent
    }
}