import { useRef } from "react";
import upload from '../../assets/Icons/upload.svg';
import { styles } from "../../application/consts";
import useCreateOrganization from "../../application/hooks/useCreateOrganization";
import LoadingIndicator from "../components/LoadingIndicator";

function CreateOrganization() {
    const { organization, setOrganization, createOrganization, isLoading, image, imageUrl, setImage } = useCreateOrganization();
    const imageRef = useRef<HTMLInputElement>(null);

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
                    setImage(file);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file) => {
                setImage(file);
            });
        }

    };

    const selectImage = () => {
        imageRef.current?.click();
    }

    const onFileSelected = async () => {
        if (imageRef.current && imageRef.current.files && imageRef.current.files.length > 0) {
            setImage(imageRef.current.files[0]);
        }
    }

    return (
        <div className="my-16 w-full">
            <div className="flex flex-col gap-10 items-center">
                <h1 className="text-center font-bold text-3xl">Create Organization</h1>
                <div className="flex flex-col gap-5 w-1/2 items-center">
                    <div className="flex flex-col gap-3 w-full">
                        <div>Organization Name:</div>
                        <input
                            type="text"
                            className="bg-gray-100 text-black text-sm font-semibold px-4 py-2 rounded-md outline-none focus:bg-gray-300"
                            placeholder="Enter Organization Name"
                            onChange={(ev) => { setOrganization(s => ({ ...s, name: ev.target.value })) }}
                            value={organization.name}
                        />
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        <div>Type:</div>
                        <select
                            className="bg-gray-100 text-black text-sm font-semibold px-4 py-2 rounded-md outline-none focus:bg-gray-300 cursor-pointer"
                            onChange={(ev) => { setOrganization(s => ({ ...s, type: ev.target.value as OrganizationType })) }}
                            value={organization.type}
                        >
                            <option className="text-gray-500">Select Type</option>
                            <option value="club">Club</option>
                            <option value="company">Company</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <h1 className="">Description:</h1>
                        <textarea
                            rows={5}
                            className="bg-gray-100 text-black text-sm font-semibold px-4 py-2 rounded-md outline-none focus:bg-gray-300"
                            placeholder="Enter your company description"
                            onChange={(ev) => { setOrganization(s => ({ ...s, description: ev.target.value })) }}
                            value={organization.description}
                        />
                    </div>
                    <input ref={imageRef} onChange={onFileSelected} type="file" accept="images/*" hidden />
                    {
                        image ? (
                            <div className="w-full flex flex-col items-center">
                                <div className="py-2 text-gray-200 font-medium">Click on image to update</div>
                                <img onClick={selectImage} src={imageUrl} title={imageUrl} className="w-96 h-96 bg-white object-cover rounded-xl cursor-pointer" />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 w-full">
                                <div>Logo:</div>
                                <div
                                    className="flex flex-col items-center justify-center p-16 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer"
                                    onDragOver={onDragOver}
                                    onDrop={onDrop}
                                    onClick={selectImage}
                                >
                                    <img src={upload} />
                                    <p className="text-sm text-gray-500">
                                        Click or drag file to this area to upload
                                    </p>
                                    <p className="text-xs text-gray-400">(Support for a single or bulk upload)</p>
                                </div>
                            </div>
                        )
                    }

                </div>
                <button
                    className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} font-meduim px-3 py-1 rounded-lg w-1/2 hover:opacity-90 active:scale-105 transition-all duration-300 flex items-center justify-center`}
                    onClick={() => { if (!isLoading) { createOrganization(); } }}
                >
                    {isLoading && (<LoadingIndicator />)}
                    {!isLoading && "Create"}
                </button>
            </div>
        </div>
    )
}

export default CreateOrganization