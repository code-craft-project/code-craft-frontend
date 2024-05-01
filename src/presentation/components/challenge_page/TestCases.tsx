import { useState } from "react";

interface TestCasesProps {
    testCases: TestCaseEntity[];
};

export default function TestCases({ testCases }: TestCasesProps) {
    const [selectedTestCase, setSelectedTestCase] = useState(0);

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <div className="w-full flex items-center">
                {
                    testCases.map((_, index) => {
                        return (
                            <div onClick={() => setSelectedTestCase(index)} className={`text-md font-semibold ${selectedTestCase == index ? "bg-blue-800" : ""} hover:bg-blue-800 cursor-pointer rounded-lg mx-1 px-4 py-1`}>{`Case ${index}`}</div>
                        )
                    })
                }
                {/* <div className="text-md font-semibold hover:bg-blue-800 cursor-pointer rounded-lg ml-1 px-4 py-1">+</div> */}
            </div>
            <div className="w-full my-8">
                {
                    testCases.length > 0 && testCases[selectedTestCase].inputs?.map((input, index) => {
                        return (
                            <div key={index}>
                                <div className="text-gray-50 text-sm py-2 font-semibold">{`Arg ${index + 1}:`}</div>
                                <div className="bg-gray-700 rounded-lg px-4 py-2">{input.input}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}