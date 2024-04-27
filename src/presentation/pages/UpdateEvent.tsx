import EventForm from "../components/EventForm";

function UpdateEvent() {
    return (
        <div className="my-16 ">
            <div className="flex flex-col gap-10 items-center">
                <h1 className="text-center font-semibold text-2xl">Update Event</h1>
                <EventForm formType="create" />
            </div>
        </div>
    )
}

export default UpdateEvent  