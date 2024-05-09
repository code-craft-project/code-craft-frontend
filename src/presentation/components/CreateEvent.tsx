import { useContext, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import upload from '../../assets/Icons/upload.svg';
import { useParams } from "react-router-dom";
import moment from "moment";
import useCreateEvent from "../../application/hooks/useCreateEvent";
import { styles } from "../../application/consts";
import OrganizationDashboardContext from "../../application/contexts/OrganizationDashboardContext";
import { DashboardModelContext } from "../../application/contexts/DashboardModelContext";
import ToastContext from "../../application/contexts/ToastContext";

interface CreateEventProps {
    useEditEvent: [EventEntity | undefined, React.Dispatch<React.SetStateAction<EventEntity | undefined>>];
};

export default function CreateEvent({ useEditEvent }: CreateEventProps) {
    const { id } = useParams();
    const [editEvent, setEditEvent] = useEditEvent;
    const { appendNewEvent, updateEventList } = useContext(OrganizationDashboardContext);
    const { close } = useContext(DashboardModelContext);
    const { event, setEvent, resetEvent, createEvent, updateEvent, logoFile, setLogoFile } = useCreateEvent();
    const [logoUrl, setLogoUrl] = useState<string>('');
    const logoFileRef = useRef<HTMLInputElement>(null);
    const toastManager = useContext(ToastContext);

    const onDragOver: React.DragEventHandler<HTMLDivElement> = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const onDrop = (ev: React.DragEvent) => {
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    setLogoFile(file);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file) => {
                setLogoFile(file);
            });
        }

    };

    const selectFile = () => {
        logoFileRef.current?.click();
    }

    const onFileSelected = async () => {
        if (logoFileRef.current && logoFileRef.current.files && logoFileRef.current.files.length > 0) {
            setLogoFile(logoFileRef.current.files[0]);
        }
    }

    useEffect(() => {
        if (logoFile) {
            const url = URL.createObjectURL(logoFile);
            setLogoUrl(url);
        }
    }, [logoFile]);

    useEffect(() => {
        if (editEvent) {
            setEvent(editEvent);
            if (editEvent.logo_url) {
                setLogoUrl(editEvent.logo_url);
            }
        }
    }, []);

    const isValidEventDate = () => {
        const currentDate = new Date();
        const startDate = new Date(event.start_at);
        const endDate = new Date(event.end_at);

        return startDate > currentDate && endDate > startDate;
    }

    const isValidForm = (): boolean => {
        if (event.title.length == 0) {
            toastManager.alertError('Event Title is missing');
            return false;
        }

        if (!editEvent && !isValidEventDate()) {
            toastManager.alertError('Invalid Event Date');
            return false;
        }

        if (event.is_team_based && !event.max_team_members) {
            toastManager.alertError('Team based events requires you to set a max team members');
            return false;
        }

        if (event.description.length == 0) {
            toastManager.alertError('Event Description is missing');
            return false;
        }

        return true;
    }

    const formSubmitHandler = async (ev: React.FormEvent): Promise<void> => {
        ev.preventDefault();
        if (id && isValidForm()) {
            if (editEvent) {
                await updateEvent();
                updateEventList(event);
            } else {
                const _event = await createEvent(parseInt(id));
                if (_event) {
                    appendNewEvent(_event);
                }
            }


            setTimeout(() => {
                close();
                resetEvent();
                setEditEvent(undefined);
            }, 300);
        }
    }

    return (
        <form onSubmit={formSubmitHandler} className="w-1/2 flex flex-col items-center">
            <div className="w-full text-gray-50 font-semibold text-2xl mb-4">{editEvent ? "Update Your Event" : "Create New Event"}</div>
            <div className="w-full flex flex-col mb-4">
                <h1 className="text-gray-50 font-meduim text-start mb-2">Event Name:</h1>
                <input
                    type="text"
                    className="bg-gray-800 text-gray-50 placeholder:font-meduim font-meduim px-4 py-2 rounded-lg outline-none focus:bg-gray-700"
                    placeholder="Enter Event Name"
                    value={event.title}
                    onChange={ev => setEvent(state => ({ ...state, title: ev.target.value }))}
                    required
                />
            </div>
            <div className="w-full flex flex-col mb-4">
                <div className="w-full flex items-center">
                    <div className="w-1/2 flex flex-col pr-1">
                        <h1 className="text-gray-50 font-meduim text-start mb-2">Start at:</h1>
                        <input
                            type="datetime-local"
                            className="bg-gray-800 font-semibold text-gray-50 placeholder:font-meduim font-meduim px-4 py-2 rounded-lg w-full outline-none focus:bg-gray-700"
                            min={Date.now()}
                            value={moment(event.start_at).format("YYYY-MM-DD HH:mm")}
                            onChange={ev => setEvent(state => ({ ...state, start_at: ev.target.value }))} />
                    </div>
                    <div className="w-1/2 pl-1 flex flex-col">
                        <h1 className="text-gray-50 font-meduim text-start mb-2">End at:</h1>
                        <input
                            type="datetime-local"
                            className="bg-gray-800 font-semibold text-gray-50 placeholder:font-meduim font-meduim px-4 py-2 rounded-lg w-full outline-none focus:bg-gray-700"
                            value={moment(event.end_at).format("YYYY-MM-DD HH:mm")}
                            onChange={ev => setEvent(state => ({ ...state, end_at: ev.target.value }))} />
                    </div>
                </div>
                <h1 className="text-sm font-sm text-gray-400 mt-1">This event will start on <b>{moment(event.start_at).format("MMMM Do, YYYY, [at] HH:mm")}</b> and end on <b>{moment(event.end_at).format("MMMM Do, YYYY, [at] HH:mm")}</b>.</h1>
            </div>
            <div className="w-full flex mb-4">
                <div className="flex flex-col flex-grow duration-300 pr-1">
                    <h1 className="text-gray-50 font-meduim text-start mb-2">Privacy:</h1>
                    <select
                        value={event.is_public ? 'public' : 'private'}
                        onChange={ev => setEvent(state => ({ ...state, is_public: ev.target.value == 'public' }))}
                        className="w-full bg-gray-800 font-meduim py-2 px-4 rounded-lg text-gray-50 outline-none focus:bg-gray-700"
                    >
                        <option disabled selected>Select Privacy</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                {
                    !event.is_public && (
                        <div className="w-1/2 flex flex-col pl-1">
                            <h1 className="text-gray-50 font-meduim text-start mb-2">Password:</h1>
                            <div className={`w-full bg-gray-800 flex items-center rounded-lg text-gray-50 relative`}>
                                <div className="absolute left-4"><Icon icon="mdi:password" /></div>
                                <input
                                    type="password"
                                    className="w-full bg-gray-800 text-gray-50 placeholder:font-meduim font-meduim px-10 py-2 rounded-lg outline-none focus:bg-gray-700"
                                    placeholder="Enter your password"
                                    value={event.password}
                                    onChange={ev => setEvent(state => ({ ...state, password: ev.target.value }))}
                                />
                            </div>
                            <h1 className=" w-full text-sm text-gray-400 mt-1">Private events requires a password</h1>
                        </div>
                    )
                }
            </div>
            <div className="w-full flex mb-4">
                <div className="flex flex-col w-1/2">
                    <h1 className="text-gray-50 font-meduim text-start mb-2">Is Team Based:</h1>
                    <div onClick={() => { setEvent(state => ({ ...state, is_team_based: !state.is_team_based })); }} className={`relative h-8 w-16 rounded-full flex items-center cursor-pointer duration-300 ${event.is_team_based ? 'bg-green-600' : 'bg-gray-800 '}`}>
                        <div className={`h-6 w-6 rounded-full absolute duration-300 ${event.is_team_based ? 'left-9 bg-gray-100' : 'left-1 bg-gray-400'}`}></div>
                    </div>
                </div>
                {
                    !!event.is_team_based && (
                        <div className="w-1/2 flex flex-col">
                            <h1 className="text-gray-50 font-meduim text-start mb-2">Max Team Member:</h1>
                            <div className={` w-full relative bg-gray-800 rounded-lg flex items-center text-gray-50`}>
                                <Icon icon="fluent:people-team-16-filled" className="absolute left-4 rounded-l-lg" />
                                <input
                                    type="number"
                                    className="bg-gray-800 text-gray-50 placeholder:font-meduim font-meduim px-10 py-2 rounded-lg w-full outline-none focus:bg-gray-700"
                                    placeholder="Enter max team number"
                                    value={event.max_team_members}
                                    min={1}
                                    max={5}
                                    onChange={ev => setEvent(state => ({ ...state, max_team_members: parseInt(ev.target.value) }))}
                                    disabled={!event.is_team_based}
                                />
                            </div>
                            <h1 className="w-full text-sm text-gray-400 mt-1">You need to specify the number of members in Team Based events</h1>
                        </div>
                    )
                }
            </div>
            <div className="w-full flex flex-col mb-4">
                <h1 className="text-gray-50 font-meduim text-start mb-2" >Description:</h1>
                <textarea
                    className="w-full h-40 text-gray-50 bg-gray-800 px-4 py-2 placeholder:font-meduim font-meduim rounded-lg outline-none focus:bg-gray-700"
                    placeholder="Type you description for this event..."
                    value={event.description}
                    onChange={ev => setEvent(state => ({ ...state, description: ev.target.value }))}
                    required
                />
            </div>
            <div className="w-full flex flex-col mb-4">
                <h1 className="text-gray-50 font-meduim text-start mb-2">Logo:</h1>
                <input ref={logoFileRef} onChange={onFileSelected} type="file" accept="image/*" hidden />
                {
                    logoUrl ? (
                        <div className="w-1/2 cursor-pointer select-none active:scale-105 duration-300" onClick={selectFile}>
                            <img src={logoUrl} className="w-full rounded-lg" />
                            <div className="w-full text-sm text-gray-400 mt-1">Click to update the image</div>
                        </div>
                    ) : (
                        <div
                            onClick={selectFile}
                            className="flex flex-col items-center justify-center p-16 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer"
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                        >
                            <img src={upload} />
                            <p className="text-sm text-gray-500">
                                Click or drag file to this area to upload
                            </p>
                            <p className="text-xs text-gray-400">(Support for a single or bulk upload)</p>
                        </div>
                    )
                }
            </div>
            <button className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} my-8 font-meduim px-3 py-1 rounded-lg w-full hover:opacity-90 active:scale-105 transition-all duration-300 capitalize`}>{editEvent ? "Update" : "Create"}</button>
        </form>
    )
}