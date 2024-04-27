import { Icon } from "@iconify/react/dist/iconify.js";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useContext, useEffect, useRef, useState } from "react";
import SubmissionContext from "../../../application/contexts/SubmissionContext";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { supportedLanguages } from "../../../application/consts";

export default function CodeEditor() {
    const { language, sourceCode, setLanguage, setSourceCode } = useContext(SubmissionContext);
    const [IDEHeight, setIDEHeight] = useState(0);
    const IDEContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (IDEContainerRef.current) {
            setIDEHeight(IDEContainerRef.current.clientHeight);
        }
    }, []);

    const getSelectedLanguage = () => {
        switch (language) {
            case 'javascript':
                return javascript();
            case 'php':
                return php();
            case 'python':
                return python();
            case 'c++':
                return cpp();
            case 'typescript':
                return javascript();
            case 'c':
                return cpp();
        }
    }

    return (
        <div className="w-full h-full flex flex-col rounded-lg bg-gray-800">
            <div className="w-full flex items-center bg-blue-900 rounded-t-lg">
                <div className="flex items-center py-2 px-4 cursor-pointer text-gray-50 hover:text-gray-300">
                    <Icon icon="jam:code" className="text-green-50" />
                    <div className="ml-2 text-sm font-semibold">Code</div>
                </div>
            </div>
            <div ref={IDEContainerRef} className="w-full flex flex-col items-center flex-grow">
                <ReactCodeMirror value={sourceCode} onChange={(value) => { setSourceCode(value) }} className="w-full h-full" height={`${IDEHeight}px`} theme={"dark"} extensions={[getSelectedLanguage()]} />
            </div>
            <div className="w-full flex items-center bg-blue-900 rounded-b-lg">
                <div className="flex items-center py-1 px-4 cursor-pointer text-gray-300 hover:text-gray-400">
                    <select value={language} onChange={(ev) => setLanguage(ev.target.value as SupportedLanguages)} className="bg-blue-900 rounded-md text-xs font-semibold lowercase text-gray-300 hover:text-gray-400 border-none outline-none">
                        {
                            supportedLanguages.map((lang, index) => {
                                return (
                                    <option key={index} value={lang}>{lang}</option>
                                )
                            })
                        }
                        <option></option>
                    </select>
                    {/* <Icon icon="gridicons:dropdown" />
                    <div className="text-xs font-semibold lowercase">{language}</div> */}
                </div>
            </div>
        </div>
    )
}