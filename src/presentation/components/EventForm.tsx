import { useEffect, useState } from "react";
import GradientColor from "../../application/data/GradientColor"
import { Icon } from "@iconify/react/dist/iconify.js";
import upload from '../../assets/Icons/upload.svg';
import useEvent from "../../application/hooks/useEvent";
import { useParams } from "react-router-dom";

interface EventFormProps {
    formType: 'create' | 'update';
    eventId?: number;
}

function EventForm({formType,eventId }: EventFormProps) {
    const { styles } = GradientColor()
    const [files, setFiles] = useState([]);

    const onDragOver = (event: any) => {
        event.preventDefault();
    };
    const onDrop = (event: any) => {
        setFiles(event.dataTransfer.files);
    };

    const {id} = useParams()

    const { event, setOrganizationId, setTitle, createEvent, updateEvent, getEventById, setStartAt, setEndAt, setDescription, setPassword, setIs_public, setMaxTeamMembers, setIsTeamBased } = useEvent()
    const changeVisibility = (event: any) => {
        if (event.target.value == 'public') {
            setIs_public(true);
        }
        else if (event.target.value == 'private') {
            setIs_public(false);
        }
    }

    const changeTeamCondition = (event: any) => {
        if (event.target.value == 'true') {
            setIsTeamBased(true);
        }
        else if (event.target.value == 'false') {
            setIsTeamBased(false);
        }
    }


    useEffect(() => {
        if ((formType === 'update') && eventId) {
            getEventById(eventId)
        }
        if (id)
        setOrganizationId(parseInt(id))
    }, [])

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        if (formType === 'create') {
            createEvent(event)
        } else {
            updateEvent()
        }
    }


return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 w-1/ bg-black items-center">
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-meduim text-start ">Event Name</h1>
            <input
                type="text"
                className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg "
                placeholder="Enter Event Name"
                value={event.title}
                onChange={ev => setTitle(ev.target.value)}
                required
            />
        </div>
        <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center">
                <div className="w-[49%] flex flex-col gap-2">
                    <h1 className="text-xl font-meduim text-start">Start at</h1>
                    <input
                        type="date"
                        className="bg-white font-semibold text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg w-full"
                        value={event.start_at}
                        onChange={ev => setStartAt(ev.target.value)}
                    />
                </div>
                <div className="w-[49%] flex flex-col gap-2">
                    <h1 className="text-xl font-meduim text-start ">End at</h1>
                    <input
                        type="date"
                        className="bg-white font-semibold text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg w-full"
                        value={event.end_at}
                        onChange={ev => setEndAt(ev.target.value)}
                    />
                </div>
            </div>
            <h1 className="text-sm font-sm  opacity-60">This event will Start at {event.start_at} and end on the {event.end_at}</h1>
        </div>
        {/* <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-meduim text-start">Topics</h1>
            <select className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                <option value="">Select Topic</option>
                <option value="front">front</option>
                <option value="back">back</option>
            </select>
            <div className=" flex gap-3 mt-2">
                <span className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} px-1 py-0.5 rounded-lg font-meduim `}>Front End</span>
                <span className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} px-1 py-0.5 rounded-lg font-meduim `}>Fluter </span>
                <span className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} px-1 py-0.5 rounded-lg font-meduim `}>C++</span>
            </div>
        </div> */}
        <div className="flex w-full gap-3 items-start">
            <div className="flex flex-col gap-2 w-[49%]">
                <h1 className="text-xl font-meduim text-start">Visibility</h1>
                <select onChange={changeVisibility} className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black" required>
                    <option disabled selected>Select Visibility</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
            </div>
            <div className="flex flex-col gap-2 w-[49%]">
                <h1 className="text-xl font-meduim text-start">Password</h1>
                <div className={` w-full h-8 relative  bg-white rounded-lg`}>
                    <Icon icon="mdi:password" className="absolute top-2 left-2 rounded-l-lg" style={{ color: "black" }} />
                    <input
                        type="password"
                        className="bg-white text-black placeholder:font-meduim font-meduim px-8 py-1 rounded-lg w-full"
                        placeholder="Enter your password"
                        value={event.password}
                        onChange={ev => setPassword(ev.target.value)}
                        disabled={!event.is_public}
                    />
                </div>
                <h1 className="text-sm opacity-60 font-small w-full">If you choice private event you must make password of it</h1>
            </div>
        </div>
        <div className="flex w-full gap-3 items-start">
            <div className="flex flex-col gap-2 w-[49%]">
                <h1 className="text-xl font-meduim text-start">Is Team Based</h1>
                <select onChange={changeTeamCondition} className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                    <option disabled selected>Select Condition</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div className="flex flex-col gap-2 w-[49%]">
                <h1 className="text-xl font-meduim text-start">Max Team Member</h1>
                <div className={` w-full h-8 relative  bg-white rounded-lg`}>
                    <Icon icon="fluent:people-team-16-filled" className="absolute top-2 left-2 rounded-l-lg" style={{ color: "black" }} />
                    <input
                        type="number"
                        className="bg-white text-black placeholder:font-meduim font-meduim px-8 py-1 rounded-lg w-full"
                        placeholder="Enter max team number"
                        value={event.max_team_members}
                        min={1}
                        max={5}
                        onChange={ev => setMaxTeamMembers(parseInt(ev.target.value))}
                        disabled={!event.is_team_based}
                    />
                </div>
                <h1 className="text-sm opacity-60 font-small w-full">If you choice team based you must make max member of team</h1>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <h1 className="text-xl font-meduim text-start" >Description</h1>
            <textarea
                cols={85}
                rows={5}
                className="w-full text-black p-3 placeholder:font-meduim font-meduim rounded-lg"
                placeholder="text.."
                value={event.description}
                onChange={ev => setDescription(ev.target.value)}
                required
            />
        </div>
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-meduim text-start">Logo</h1>
            <div
                className="flex flex-col items-center justify-center p-16 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer"
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <img src={upload} />
                <p className="text-sm text-gray-500">
                    Click or drag file to this area to upload
                </p>
                <p className="text-xs text-gray-400">(Support for a single or bulk upload)</p>
                {files.length > 0 && <p>Uploaded files: {files.length}</p>}
            </div>
        </div>
        <button className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  font-meduim px-3 py-1 rounded-lg w-full mt-5 hover:opacity-90 active:scale-105 transition-all duration-300 capitalize`}>{formType}</button>
    </form>
)
}

export default EventForm