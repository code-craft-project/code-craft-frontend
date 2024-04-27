import { useContext, useEffect } from "react";
import EventCard from "../EventCard";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";

export default function OrganizationEvents() {
    const { id } = useParams();
    const { events, isEventsLoading, getOrganizationEvents } = useContext(OrganizationDashboardContext);

    useEffect(() => {
        if (id && isEventsLoading) {
            getOrganizationEvents(parseInt(id), 0, 10);
        }
    }, [id]);

    return (
        <div className="w-full h-full flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-8 py-5">
            <div className="w-full flex mb-8">
                <div className="w-full flex flex-col items-start">
                    <div className="text-3xl font-bold">Events</div>
                    <div className="text-xs text-gray-300">{"Manage your events"}</div>
                </div>
            </div>
            <div className="w-full flex flex-col flex-grow overflow-auto">
                <div className="w-full flex items-center flex-wrap">
                    {
                        isEventsLoading && (
                            <div className="w-full flex flex-col items-center">
                                <LoadingIndicator />
                            </div>
                        )
                    }
                    {
                        events.map((event, index) => {
                            return (
                                <div key={index} className="w-1/6 h-full pr-4 mb-8">
                                    <EventCard event={event} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}