import { Icon } from "@iconify/react/dist/iconify.js";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useRef, useState } from "react";

export default function CodeEditor() {
    const [IDEHeight, setIDEHeight] = useState(0);
    const IDEContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (IDEContainerRef.current) {
            setIDEHeight(IDEContainerRef.current.clientHeight);
        }
    }, []);

    return (
        <div className="w-full h-full flex flex-col rounded-lg bg-gray-800">
            <div className="w-full flex items-center bg-blue-900 rounded-t-lg">
                <div className="flex items-center py-2 px-4 cursor-pointer text-gray-50 hover:text-gray-300">
                    <Icon icon="jam:code" className="text-green-50" />
                    <div className="ml-2 text-sm font-semibold">Code</div>
                </div>
            </div>
            <div ref={IDEContainerRef} className="w-full flex flex-col items-center flex-grow">
                <ReactCodeMirror value={""} className="w-full h-full" height={`${IDEHeight}px`} theme={"dark"} color="red" extensions={[]} />
            </div>
            <div className="w-full flex items-center bg-blue-900 rounded-b-lg">
                <div className="flex items-center py-1 px-4 cursor-pointer text-gray-300 hover:text-gray-400">
                    <Icon icon="gridicons:dropdown" />
                    <div className="text-xs font-semibold lowercase">JavaScript</div>
                </div>
            </div>
        </div>
    )
}