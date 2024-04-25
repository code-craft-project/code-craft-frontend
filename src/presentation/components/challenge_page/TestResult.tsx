import { useState } from "react";

interface TestResultProps {
    testCases: TestCaseEntity[];
};

export default function TestResult({ testCases }: TestResultProps) {
    const [selectedTestCase, setSelectedTestCase] = useState(0);

    const getResultColor = (testCase: TestCaseEntity) => {
        return testCase.run_result ? (testCase.run_result == 'correct' ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-300';
    }

    const getBgResultColor = (testCase: TestCaseEntity) => {
        return testCase.run_result ? (testCase.run_result == 'correct' ? 'bg-green-500/60' : 'bg-red-500/60') : 'bg-gray-300/60';
    }

    return (
        <div className="w-full h-full flex flex-col items-center overflow-auto p-4">
            <div className="w-full flex items-center">
                {
                    testCases.map((testCase, index) => {
                        return (
                            <div key={index} onClick={() => setSelectedTestCase(index)} className={`${selectedTestCase == index ? "bg-blue-800" : ""} hover:bg-blue-800 cursor-pointer rounded-lg mr-1 px-4 py-1 flex items-center text-md font-semibold`}>
                                <div className={`h-2 w-2 rounded-full mr-2 ${getResultColor(testCase)}`}></div>
                                Case {index}
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-full my-8">
                {
                    testCases[selectedTestCase].inputs?.map((input, index) => {
                        return (
                            <div key={index}>
                                <div className="text-gray-50 text-sm py-2 font-semibold">Arg {index + 1}:</div>
                                <div className="bg-gray-700 rounded-lg px-4 py-2">{input.input}</div>

                            </div>
                        )
                    })
                }
                <div className="text-gray-50 text-sm py-2 font-semibold">Expected Output:</div>
                <div className="bg-blue-950 rounded-lg px-4 py-2">{testCases[selectedTestCase].output}</div>

                {
                    testCases[selectedTestCase].output_result && (
                        <div>
                            <div className="text-gray-50 text-sm py-2 font-semibold">Output:</div>
                            <div className={`bg-gray-700 rounded-lg px-4 py-2 ${getBgResultColor(testCases[selectedTestCase])}`}>{testCases[selectedTestCase].output_result}</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}