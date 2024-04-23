import { useState } from "react";
import GradientColor from "../../application/data/GradientColor"
import { Icon } from "@iconify/react/dist/iconify.js";
import upload from '../../assets/Icons/upload.svg';

function CreateEvent() {
    const {styles} = GradientColor()
    const [files, setFiles] = useState([]);
    const onDragOver = (event: any) => {
        event.preventDefault();
    };
    const onDrop = (event:any) => {
        setFiles(event.dataTransfer.files);
    };
    
  return (
    <div className="my-16 ">
        <div className="flex flex-col gap-10 items-center">
            <h1 className="text-center font-semibold text-2xl">Create Event</h1>
            <div className="flex flex-col gap-5 w-1/2 items-center">
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start ">Event Name</h1>
                    <input type="text" className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " placeholder="Enter Event Name"/>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center">
                        <div className="w-[49%] flex flex-col gap-2">
                            <h1 className="text-xl font-meduim text-start">Start at</h1>
                            <input type="date" className="bg-white font-semibold text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg w-full" />
                        </div>
                        <div className="w-[49%] flex flex-col gap-2">
                            <h1 className="text-xl font-meduim text-start ">End at</h1>
                            <input type="date" className="bg-white font-semibold text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg w-full" />
                        </div>
                    </div>
                    <h1 className="text-sm font-sm  opacity-60">This event will Start at May 15, 2023 and end on the May 17, 2023</h1>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start">Topics</h1>
                    <select className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                    <option value="">Select Topic</option>
                        <option value="">front</option>
                        <option value="">back</option>
                    </select>
                    <div className=" flex gap-3 mt-2">
                        <span className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} px-1 py-0.5 rounded-lg font-meduim `}>Front End</span>
                        <span className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} px-1 py-0.5 rounded-lg font-meduim `}>Fluter </span>
                        <span className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} px-1 py-0.5 rounded-lg font-meduim `}>C++</span>
                    </div>
                </div>
                    <div className="flex w-full gap-3 items-start">
                        <div className="flex flex-col gap-2 w-[49%]">
                            <h1 className="text-xl font-meduim text-start">Visibility</h1>
                            <select className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                                <option value="">Select Visibility</option>
                                <option value="">Public</option>
                                <option value="">Private</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 w-[49%]">
                            <h1 className="text-xl font-meduim text-start">Password</h1>
                            <div className={` w-full h-8 relative  bg-white rounded-lg`}>
                                <Icon icon="mdi:password" className="absolute top-2 left-2 rounded-l-lg"  style={{color: "black"}} />                        
                                <input type="password" className="bg-white text-black placeholder:font-meduim font-meduim px-8 py-1 rounded-lg w-full" />
                            </div>
                            <h1 className="text-sm opacity-60 font-small w-full">If you choice private event you must make password of it</h1>
                        </div>
                    </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-meduim text-start">Description</h1>
                    <textarea  cols="85" rows="5" className="w-full p-3 placeholder:font-meduim font-meduim rounded-lg" placeholder="text.."/>
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
            </div>
            <button className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  font-meduim px-3 py-1 rounded-lg w-1/2 hover:opacity-90 active:scale-105 transition-all duration-300`}>Create</button>
        </div>
    </div>
)
}

export default CreateEvent