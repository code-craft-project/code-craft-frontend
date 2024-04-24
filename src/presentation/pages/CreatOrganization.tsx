import { useState } from "react";
import GradientColor from "../../application/data/GradientColor"
import upload from '../../assets/Icons/upload.svg';

    function CreateOrganization() {
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
            <h1 className="text-center font-semibold text-2xl">Create Organization</h1>
            <div className="flex flex-col gap-5 w-1/2 items-center">
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start ">Organization Name</h1>
                    <input type="text" className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " placeholder="Enter Organization Name"/>
                </div>
              
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-xl font-meduim text-start">Type</h1>
                    <select className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black">
                    <option value="">Select Type</option>
                        <option value="">Club</option>
                        <option value="">Company</option>
                    </select>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-meduim text-start">Description</h1>
                    <textarea  cols={85} rows={5} className="w-full p-3 text-black placeholder:font-meduim font-meduim rounded-lg" placeholder="text.."/>
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

export default CreateOrganization