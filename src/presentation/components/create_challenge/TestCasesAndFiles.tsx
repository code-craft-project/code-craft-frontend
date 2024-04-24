import { useState } from 'react';
import upload from '../../../assets/Icons/upload.svg';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function TestCasesAndFiles() {
    const [challengeType, setChallengeType] = useState<string | null>(null)
    return (
    <div className="flex flex-col gap-8 items-center w-full">
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-semibold text-start ">Challenge Type</h1>
            <select 
                className="w-full bg-white font-meduim py-1 px-3 rounded-lg text-black"
                value={challengeType as string}
                onChange={ev => { setChallengeType(ev.target.value)}}
            >
            <option value="">Select Type</option>
                <option value="in_out">in_out</option>
                <option value="project">project</option>
            </select>
        </div>
        {challengeType === "in_out" 
        ? <InOut />
        : (challengeType === "project") 
            ? <Project />
            : <div className='font-meduim'>Please Choose Challenge Type To Continue!</div>
        }
    </div>
        )
}

function InOut(){
    const [testCases, setTestCases] = useState([{ inputs: [{ param: '', type: '' }], output: '' }]);
    const [files, setFiles] = useState([]);

    const handleAddTestCase = () => {
        setTestCases([...testCases, { inputs: [{ param: '', type: '' }], output: '' }]);
    };

    const handleInputChange = (testCaseIndex:any, inputIndex:any, field:any, value:any) => {
        const updatedTestCases:any = [...testCases];
        updatedTestCases[testCaseIndex].inputs[inputIndex][field] = value;
        setTestCases(updatedTestCases);
    };

    const handleOutputChange = (index:any, value:any) => {
        const updatedTestCases = [...testCases];
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
                            {testCase.inputs.map((input, inputIndex) => (
                                <div key={inputIndex} className="flex gap-3">
                                    <input
                                        type="text"
                                        className="bg-white text-black placeholder-medium font-medium px-8 py-1 rounded-lg w-full"
                                        placeholder='Input'
                                        value={input.param}
                                        onChange={(e) => handleInputChange(index, inputIndex, 'param', e.target.value)}
                                    />
                                    <select
                                        className="bg-white font-medium py-1 px-3 rounded-lg text-black"
                                        value={input.type}
                                        onChange={(e) => handleInputChange(index, inputIndex, 'type', e.target.value)}
                                    >
                                        <option value="">Type</option>
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
                                        prevState[index].inputs.push({ param: '', type: '' });
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
    const [files, setFiles] = useState([]);
    const onDragOver = (event: any) => {
        event.preventDefault();
    };
    const onDrop = (event:any) => {
        setFiles(event.dataTransfer.files);
    };

    return(
    <div className="w-full">
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
    )
}