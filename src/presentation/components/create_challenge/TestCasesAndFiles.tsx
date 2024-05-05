import { useContext, useRef, useState } from 'react';
import upload from '../../../assets/Icons/upload.svg';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CreateChallengeContext } from '../../../application/contexts/CreateChallengeContext';
import useOrganizationChallenge from '../../../application/hooks/useOrganizationChallenge';

export default function TestCasesAndFiles() {
    const {type, setType} = useContext(CreateChallengeContext)
    return (
    <div className="flex flex-col gap-8 items-center w-full">
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-semibold text-start ">Challenge Type</h1>
            <select 
                className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black"
                value={type }
                onChange={ev => { setType(ev.target.value as "project" | "in_out")}}
            >
            <option value="">Select Type</option>
                <option value="in_out">in_out</option>
                <option value="project">project</option>
            </select>
        </div>
        {type === "in_out" 
        ? <InOut />
        : (type === "project") 
            ? <Project />
            : <div className='font-meduim'>Please Choose Challenge Type To Continue!</div>
        }
    </div>
    )
}

function InOut(){
    const [files, setFiles] = useState([]);
    const {testCases, setTestCases} = useContext(CreateChallengeContext)
    const handleAddTestCase = () => {
        setTestCases([...testCases, { inputs: [{ input: '', type: 'boolean', index: 0 }], output: '' }]);
    };

    const handleInputChange = (testCaseIndex:any, inputIndex:any, field:any, value:any) => {
        const updatedTestCases:any = [...testCases];
        updatedTestCases[testCaseIndex].inputs[inputIndex][field] = value;
        setTestCases(updatedTestCases);
    };

    const handleOutputChange = (index:any, value:any) => {
        const updatedTestCases:any = [...testCases];
        updatedTestCases[index].output = value;
        setTestCases(updatedTestCases);
    };

    const onDragOver = (event: any) => {
        event.preventDefault();
    };
    const onDrop = (event:any) => {
        setFiles(event.dataTransfer.files);
    };
    

    return  (
        <div className='w-full flex flex-col gap-8 items-center'>
            <h1 className="text-xl font-semibold text-start w-full">Test Cases</h1>
            {testCases.map((testCase, index) => (
                <div key={index} className='flex flex-col w-full gap-3'>
                    <div className="flex w-full gap-3 items-end">
                        <div className="flex flex-col gap-2 w-[69%]">
                            <h1 className="text-xl font-medium text-start mb-3">#{index + 1} Test Case</h1>
                            {testCase.inputs?.map((input, inputIndex) => (
                                <div key={inputIndex} className="flex gap-3">
                                    <input
                                        type="text"
                                        className="bg-white text-black placeholder-medium font-medium px-8 py-1 rounded-lg w-full"
                                        placeholder='Input'
                                        value={input.input}
                                        onChange={(e) => handleInputChange(index, inputIndex, 'input', e.target.value)}
                                    />
                                    <select
                                        className="bg-white font-medium py-1 px-3 rounded-lg text-black"
                                        value={input.type}
                                        onChange={(e) => handleInputChange(index, inputIndex, 'type', e.target.value)}
                                    >
                                        <option value="" selected>Type</option>
                                        <option value="String">String</option>
                                        <option value="Boolean">Boolean</option>
                                        <option value="Array">Array</option>
                                        <option value="Number">Number</option>
                                    </select>
                                </div>
                            ))}
                            <div className="flex flex-col gap-2 w-full">
                                <button
                                    onClick={() => setTestCases(prevState => {
                                        prevState[index].inputs?.push({ input: '', type: 'boolean',index:index });
                                        return [...prevState];
                                    })}
                                    className="font-semibold bg-opacity-90 px-8 py-1 rounded-lg w-full active:scale-105 transition-all duration-200 hover:opacity-90 bg-primary-blue gap-2 flex items-center justify-center"
                                >
                                    <Icon icon="material-symbols:add" width="18" height="18" />
                                    Add New Input
                                </button>
                            </div>
                        </div>
                        <div className="w-[29%]">
                            <input
                                type="text"
                                className="bg-white text-black placeholder-medium font-medium px-8 py-1 rounded-lg w-full"
                                placeholder='Output'
                                value={testCase.output}
                                onChange={(e) => handleOutputChange(index, e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex flex-col gap-2 w-full">
                <button
                    onClick={handleAddTestCase}
                    className="font-semibold bg-opacity-90 px-8 py-1 rounded-lg w-full active:scale-105 transition-all duration-200 hover:opacity-90 bg-primary-yellow "
                >
                    Add Another Test Case
                </button>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <h1 className="text-xl font-semibold text-center">Or</h1>
                <h1 className="text-sm font-medium">If you have multiple tests, you can compress them to a zip file, and upload it directly.</h1>
                <div className='text-sm font-medium'>ZIP file content example: <span className='text-primary-yellow'>Download</span></div>
                <div
                    className="flex flex-col items-center justify-center p-16 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer"
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                >
                    <img src={upload} alt="upload icon" />
                    <p className="text-sm text-gray-500">
                        Click or drag file to this area to upload
                    </p>
                    <p className="text-xs text-gray-400">(Support for a single or bulk upload)</p>
                    {/* Display number of uploaded files */}
                    {files.length > 0 && <p>Uploaded files: {files.length}</p>}
                </div>
            </div>
        </div>
    )
}

function Project(){
    const fileRef = useRef<HTMLInputElement>(null);
    const {file, fileUrl, setFile} = useOrganizationChallenge()
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
                    setFile(file);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file) => {
                setFile(file);
            });
        }

    };

    const selectFile = () => {
        fileRef.current?.click();
    }

    const onFileSelected = async () => {
        if (fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
            setFile(fileRef.current.files[0]);
        }
    }

    return(
        <>
        <input ref={fileRef} onChange={onFileSelected} type="file" accept="*" hidden />
        {
            file ? (
                <div className="w-full flex flex-col items-center">
                    <div className="py-2 text-gray-200 font-medium">Click on image to update</div>
                    <img onClick={selectFile} src={fileUrl} title={fileUrl} className="w-96 h-96 bg-white object-cover rounded-xl cursor-pointer" />
                </div>
            ) : (
                <div className="flex flex-col gap-3 w-full">
                    <div>Files:</div>
                    <div
                        className="flex flex-col items-center justify-center p-16 border-dashed border-2 border-blue-900 border-t-yellow-600 border-r-yellow-600 rounded-lg cursor-pointer"
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onClick={selectFile}
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
        </>
    )
}