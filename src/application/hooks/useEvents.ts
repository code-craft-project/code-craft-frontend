import { useEffect, useState } from "react";
import { eventsService } from "../services";

export default function useEvents() {
    const [events, setEvents] = useState<EventEntity[]>([]);

    useEffect(() => {
        getEvents(1);
    }, []);

    const getEvents = async (page:number) => {
        try {
            const response = await eventsService.getEvents(page)
            if (response.status == "success") {
                setEvents(response.data);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { events };
}