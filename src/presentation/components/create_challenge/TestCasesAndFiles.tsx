import { useContext, useRef } from 'react';
import upload from '../../../assets/Icons/upload.svg';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CreateChallengeContext } from '../../../application/contexts/CreateChallengeContext';
import { testCaseInputTypes } from '../../../application/consts';

export default function TestCasesAndFiles() {
    const { challenge, setChallenge } = useContext(CreateChallengeContext)
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col">
                <h1 className="font-semibold text-gray-50 mb-2">Challenge Type:</h1>
                <select
                    className="bg-gray-800 text-gray-50 placeholder:font-medium font-medium px-4 py-2 rounded-lg outline-none focus:bg-gray-700 duration-300 capitalize"
                    value={challenge.type}
                    onChange={ev => { setChallenge(state => ({ ...state, type: ev.target.value as ChallengeType })) }}
                >
                    <option value="" selected disabled>Select Type</option>
                    <option value="in_out">in_out</option>
                    <option value="project">project</option>
                </select>
            </div>

            {challenge.type == "in_out" && (<InOut />)}
            {challenge.type == "project" && (<Project />)}
            {!challenge.type && (<div className='font-medium'>Please Choose Challenge Type To Continue!</div>)}
        </div >
    )
}

function InOut() {
    const { testCases, setTestCases, testCaseFile, setTestCaseFile } = useContext(CreateChallengeContext)
    const fileRef = useRef<HTMLInputElement>(null);

    const onDrop = (ev: React.DragEvent) => {
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    setTestCaseFile(file);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file) => {
                setTestCaseFile(file);
            });
        }

    };

    const selectFile = () => {
        fileRef.current?.click();
    }

    const onFileSelected = async () => {
        if (fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
            setTestCaseFile(fileRef.current.files[0]);
        }
    }

    const removeFile = () => {
        setTestCaseFile(null);
        if (fileRef.current) {
            fileRef.current.value = '';
        }
    }

    return (
        <div className='w-full flex flex-col items-center mt-8'>
            <h1 className="w-full font-semibold text-gray-50 mb-2">Test Cases:</h1>
            {
                !testCaseFile && testCases.map((testCase, index) => (
                    <div key={index} className='w-full flex flex-col'>
                        <div className="w-full flex flex-col">
                            <div className='w-full flex items-center justify-between'>
                                <h1 className="text-gray-100 font-medium text-start mb-3"># Test Case {(index + 1).toLocaleString("en-us", { minimumIntegerDigits: 2 })}:</h1>
                                <div
                                    onClick={() => {
                                        setTestCases(state => state.filter((_, j) => index != j))
                                    }}
                                    className='text-red-600 hover:text-red-700 text-xs font-semibold cursor-pointer'>Remove</div>
                            </div>
                            {
                                testCase.inputs?.map((input, inputIndex) => (
                                    <div key={inputIndex} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            className="bg-gray-800 text-gray-50 placeholder:font-medium font-medium px-4 py-2 rounded-lg outline-none focus:bg-gray-700 duration-300 flex-grow mr-2"
                                            placeholder='Input'
                                            value={input.input}
                                            onChange={
                                                (ev) => {
                                                    setTestCases(state => {
                                                        const list = [...state];
                                                        list[index].inputs![inputIndex].input = ev.target.value;
                                                        return list;
                                                    });
                                                }
                                            }
                                        />
                                        <select
                                            className="bg-gray-800 text-gray-50 placeholder:font-medium font-medium px-4 py-2 rounded-lg outline-none focus:bg-gray-700 duration-300 capitalize"
                                            value={input.type}
                                            onChange={
                                                (ev) => {
                                                    setTestCases(state => {
                                                        const list = [...state];
                                                        list[index].inputs![inputIndex].type = ev.target.value as TestCaseInputType;
                                                        return list;
                                                    });
                                                }
                                            }
                                        >
                                            <option value="" selected disabled>Type</option>
                                            {
                                                testCaseInputTypes.map((_type, index) => {
                                                    return (
                                                        <option key={index} className='capitalize' value={_type}>{_type.split("_").join(" ")}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <div
                                            onClick={() => {
                                                console.log({ inputIndex });
                                                setTestCases(state => {
                                                    const list = [...state];
                                                    list[index].inputs = list[index].inputs!.filter((_, j) => inputIndex != j);
                                                    console.log("list[index].inputs:", list[index].inputs);
                                                    for (let j = 0; j < (list[index].inputs!.length || 0); j++) {
                                                        list[index].inputs![j].index = j;
                                                    }
                                                    return list;
                                                });
                                            }}
                                            className='text-yellow-600 hover:text-yellow-700 text-xs font-semibold cursor-pointer ml-2'>Remove Input</div>
                                    </div>
                                ))}
                            <div className="flex flex-col gap-2 w-full">
                                <button
                                    onClick={() => setTestCases(state => {
                                        const list = [...state];
                                        list[index].inputs = [...(list[index].inputs || []), { input: '', index: list[index].inputs?.length || 0, type: 'string' }];
                                        console.log("list[index]:", list[index]);
                                        return list;
                                    })}
                                    className="font-semibold bg-opacity-90 px-8 py-1 rounded-lg w-full active:scale-105 transition-all duration-200 hover:opacity-90 bg-primary-blue gap-2 flex items-center justify-center"
                                >
                                    <Icon icon="material-symbols:add" width="18" height="18" />
                                    Add New Input
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex mt-2 mb-8">
                            <input
                                type="text"
                                className="w-full bg-gray-800 text-gray-50 placeholder:font-medium font-medium px-4 py-2 rounded-lg outline-none focus:bg-gray-700 duration-300"
                                placeholder='Output'
                                value={testCase.output}
                                onChange={
                                    (ev) => {
                                        setTestCases(state => {
                                            const list = [...state];
                                            list[index].output = ev.target.value;
                                            return list;
                                        });
                                    }
                                }
                            />
                        </div>
                    </div>
                ))
            }
            {
                !testCaseFile && (<div className="w-full flex flex-col mb-8">
                    <button
                        onClick={() => {
                            setTestCases(s => [...s, { output: '', inputs: [{ index: 0, input: '', type: 'string' }] }])
                        }}
                        className="font-semibold bg-opacity-90 px-8 py-1 rounded-lg w-full active:scale-105 transition-all duration-200 hover:opacity-90 bg-primary-yellow"
                    >
                        Add Another Test Case
                    </button>
                </div>)
            }
            <input ref={fileRef} onChange={onFileSelected} type="file" accept=".zip, .rar" hidden />
            {
                !testCaseFile && (
                    <div className="flex flex-col gap-3 w-full">
                        <h1 className="text-xl font-semibold text-center">Or</h1>
                        <h1 className="text-sm font-medium">If you have multiple tests, you can compress them to a zip file, and upload it directly.</h1>
                        <div className='text-sm font-medium'>ZIP file content example: <a href="/files/test-cases-example.zip" download className='inline-block text-primary-yellow cursor-pointer hover:text-yellow-600 duration-300 active:scale-110 select-none'>Download</a></div>
                        <div
                            className="flex flex-col items-center justify-center p-16 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer"
                            onDrop={onDrop}
                            onClick={selectFile}
                        >
                            <img src={upload} alt="upload icon" />
                            <p className="text-sm text-gray-500">
                                Click or drag file to this area to upload
                            </p>
                            <p className="text-xs text-gray-400">(Support for a single or bulk upload)</p>
                        </div>
                    </div>
                )
            }
            {
                testCaseFile && (
                    <div onClick={selectFile} className='w-full flex flex-col py-4 cursor-pointer text-gray-50 hover:text-gray-300 duration-300 active:scale-105'>
                        <Icon icon="formkit:zip" className='text-9xl' />
                        <div className='mt-4 text-gray-500 text-sm font-semibold'>Click to Change the file</div>
                    </div>
                )
            }
            {
                testCaseFile && (
                    <div onClick={() => { removeFile(); }} className='w-full text-red-600 hover:text-red-700 font-semibold cursor-pointer ml-2'>X Remove File</div>
                )
            }
        </div >
    )
}

function Project() {
    const { projectFile, setProjectFile } = useContext(CreateChallengeContext)
    const fileRef = useRef<HTMLInputElement>(null);

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
                    setProjectFile(file);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file) => {
                setProjectFile(file);
            });
        }

    };

    const selectFile = () => {
        fileRef.current?.click();
    }

    const onFileSelected = async () => {
        if (fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
            setProjectFile(fileRef.current.files[0]);
        }
    }

    return (
        <>
            <input ref={fileRef} onChange={onFileSelected} type="file" accept="*" hidden />
            {
                projectFile ? (
                    <div className="w-full flex flex-col items-center">
                        <div className="py-2 text-gray-200 font-medium">Click on image to update</div>
                        {/* <img onClick={selectFile} src={fileUrl} title={fileUrl} className="w-96 h-96 bg-white object-cover rounded-xl cursor-pointer" /> */}
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