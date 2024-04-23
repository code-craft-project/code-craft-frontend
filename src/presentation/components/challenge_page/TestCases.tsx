export default function TestCases(){
    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <div className="w-full flex items-center">
                <div className="text-md font-semibold bg-blue-800 hover:bg-blue-800 cursor-pointer rounded-lg mr-1 px-4 py-1">Case 1</div>
                <div className="text-md font-semibold hover:bg-blue-800 cursor-pointer rounded-lg mx-1 px-4 py-1">Case 2</div>
                <div className="text-md font-semibold hover:bg-blue-800 cursor-pointer rounded-lg mx-1 px-4 py-1">Case 3</div>
                <div className="text-md font-semibold hover:bg-blue-800 cursor-pointer rounded-lg ml-1 px-4 py-1">+</div>
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