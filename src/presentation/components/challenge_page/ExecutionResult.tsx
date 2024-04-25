import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useEffect, useState } from "react";
import TestCases from "./TestCases";
import TestResult from "./TestResult";
import SubmissionContext from "../../../application/contexts/SubmissionContext";

type Tab = 'test-cases' | 'test-result' | 'terminal';

interface ExecutionResultProps {
    challengeId: number;
};

export default function ExecutionResult({ challengeId }: ExecutionResultProps) {
    const [selectedTab, setSelectedTab] = useState<Tab>('terminal');
    const { runResult, testCases, getTestCases } = useContext(SubmissionContext);

    useEffect(() => {
        getTestCases(challengeId);
    }, []);

    return (
        <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-950 to-blue-950 rounded-lg">
            <div className="w-full flex items-center bg-blue-900 rounded-t-lg">
                <div className={`flex items-center py-2 px-4 cursor-pointer hover:text-gray-300 ${selectedTab == "test-cases" ? "text-gray-50" : "text-gray-400"}`} onClick={() => setSelectedTab("test-cases")} >
                    <Icon icon="mdi:success-circle-outline" />
                    <div className="ml-1 text-sm font-semibold">Test Cases</div>
                </div>

                <div className="h-1/2 w-px bg-gray-50"></div>

                <div className={`flex items-center py-2 px-4 cursor-pointer hover:text-gray-300 ${selectedTab == "test-result" ? "text-gray-50" : "text-gray-400"}`} onClick={() => setSelectedTab("test-result")} >
                    <Icon icon="ant-design:code-filled" />
                    <div className="ml-1 text-sm font-semibold">Test Result</div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center overflow-auto flex-grow">
                {selectedTab == "test-cases" && <TestCases testCases={testCases} />}
                {selectedTab == "test-result" && <TestResult testCases={testCases} />}
                {selectedTab == "terminal" && (
                    <div className="w-full text-gray-100 font-medium font-mono text-sm p-2">
                        <div className="w-full flex items-center mb-4">
                            <div className="">Output:</div>
                            <div className="ml-4 whitespace-pre-line">{runResult.output}</div>
                        </div>
                        <div className="text-red-500">{runResult.error}</div>
                    </div>
                )}
            </div>
        </div>
    )
}