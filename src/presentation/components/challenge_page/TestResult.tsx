export default function TestResult() {
    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <div className="w-full flex items-center">
                <div className="bg-blue-800 hover:bg-blue-800 cursor-pointer rounded-lg mr-1 px-4 py-1 flex items-center text-md font-semibold">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    Case 1
                </div>
                <div className="hover:bg-blue-800 cursor-pointer rounded-lg mr-1 px-4 py-1 flex items-center text-md font-semibold">
                    <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                    Case 2
                </div>
                <div className="hover:bg-blue-800 cursor-pointer rounded-lg mr-1 px-4 py-1 flex items-center text-md font-semibold">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    Case 3
                </div>
            </div>
            <div className="w-full my-8">
                <div className="text-gray-50 text-sm py-2 font-semibold">Arg1:</div>
                <div className="bg-gray-700 rounded-lg px-4 py-2">{"[1, 2, 3]"}</div>
                <div className="text-gray-50 text-sm py-2 font-semibold">Arg2:</div>
                <div className="bg-gray-700 rounded-lg px-4 py-2">{"[2, 4, 6]"}</div>
            </div>
        </div>
    )
}