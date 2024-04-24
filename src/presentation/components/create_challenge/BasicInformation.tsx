
function BasicInformation() {
  return (
    <div className="flex flex-col gap-5 w-full items-center">
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-semibold text-start ">Title</h1>
            <input type="text" className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " placeholder="Enter Event Name"/>
        </div>
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-semibold text-start ">Topic</h1>
            <input type="text" className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " placeholder="Enter Event Name"/>
        </div>
        <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-end">
                <div className="w-[49%] flex flex-col gap-2 ">
                    <h1 className="text-xl font-semibold text-start">Level</h1>
                    <input type="text" placeholder='level' className="bg-white font-meduim text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg w-full" />
                </div>
                <div className="flex flex-col gap-3 w-[49%]">
                    <h1 className="text-xl font-semibold text-start">Privacy</h1>
                    <select className=" bg-white font-meduim py-1 px-3 rounded-lg text-black">
                        <option value="">Select Privacy</option>
                        <option value="">Public</option>
                        <option value="">Private</option>
                    </select>
                </div>
            </div>
        </div>
    </div>  )
}

export default BasicInformation