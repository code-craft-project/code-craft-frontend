import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import TestCases from "./TestCases";
import TestResult from "./TestResult";

type Tab = 'test-cases' | 'test-result';

export default function ExecutionResult() {
    const [selectedTab, setSelectedTab] = useState<Tab>('test-cases');

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
            <div className="w-full flex flex-col items-center flex-grow">
                {selectedTab == "test-cases" && <TestCases />}
                {selectedTab == "test-result" && <TestResult />}
            </div>
        </div>
    )
}