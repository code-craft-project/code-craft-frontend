import { useContext, useEffect, useState } from "react";
import DashboardEventCard from "../DashboardEventCard";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardModel from "./DashboardModel";
import useDashboardModel from "../../../application/hooks/useDashboardModel";
import CreateEvent from "../CreateEvent";

export default function OrganizationEvents() {
  const { id } = useParams();
  const { events, isEventsLoading, getOrganizationEvents } = useContext(OrganizationDashboardContext);
  const useDashboardModelValue = useDashboardModel();
  const [editEvent, setEditEvent] = useState<EventEntity | undefined>(undefined);

  useEffect(() => {
    if (id && isEventsLoading) {
      getOrganizationEvents(parseInt(id), 0, 10);
    }
  }, [id]);

  return (
    <div className="w-full md:h-full mt-16 md:mt-0 flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-8 ">
      <div className="w-full flex mb-8">
        <div className="w-full flex flex-col items-start">
          <div className="text-3xl font-bold">Events</div>
          <div className="text-xs text-gray-300">{"Manage your events"}</div>
        </div>
      </div>
      <button
        onClick={() => { setEditEvent(undefined); useDashboardModelValue.open(); }}
        className={`md:w-fit justify-center w-full font-meduim px-8 py-1 rounded-lg hover:opacity-90 active:scale-105 transition-all duration-300 bg-primary-yellow text-nowrap flex items-center mb-8`}
      >
        <Icon icon="mdi:event-plus" />
        <div className="ml-2 font-medium">Create Event</div>
      </button>
      <div className="w-full flex flex-col flex-grow overflow-auto">
        <div className="w-full flex flex-wrap">
          {isEventsLoading && (
            <div className="w-full flex flex-col items-center">
              <LoadingIndicator />
            </div>
          )}
          {
            events.map((event, index) => {
              const updateEvenetHandler = (): void => {
                setEditEvent(event);
                useDashboardModelValue.open();
              }

              return (
                <div key={index} className="md:w-1/4 w-full md:pr-4 mb-8">
                  <DashboardEventCard event={event} updateEvenetHandler={updateEvenetHandler} />
                </div>
              );
            })
          }
        </div>
      </div>
      <DashboardModel useDashboardModel={useDashboardModelValue} animationName="EdgeScaleFadeIn">
        <CreateEvent useEditEvent={[editEvent, setEditEvent]} />
      </DashboardModel>
    </div>
  );
}