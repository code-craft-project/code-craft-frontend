import profile from '../../assets/Images/profile.png';

function PersonalDetails() {
    
    return (
            <div className="flex flex-col gap-8 py-5 px-20 w-4/5">
                <div>
                    <h1 className="font-semibold text-2xl">Personal details</h1>
                    <h1 className="font-meduim text-lg opacity-75">Edit your personal details</h1>
                </div>
                <img src={profile} alt="" className="w-12 h-12" />
                <div className="w-2/3 flex items-center justify-between">
                    <span className="text-sm w-20">username</span>
                    <span className="text-sm w-24">sta24</span>
                    <button className="hover:underline hover:bg-opacity-65">Edit</button>
                    <div className=" items-center gap-3 hidden">
                        <button className="bg-green-500 rounded-md px-3">Save</button>
                        <button className="text-red-500">Close</button>
                    </div>
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    <span  className="text-sm w-20">First Name</span>
                    <span className="text-sm w-24">sta24</span>
                    <button className="hover:underline hover:bg-opacity-65">Edit</button>
                    <div className=" items-center gap-3 hidden">
                        <button className="bg-green-500 rounded-md px-3">Save</button>
                        <button className="text-red-500">Close</button>
                    </div>
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    <span className="text-sm w-20">Last Name</span>
                    <span className="text-sm w-24">sta24</span>
                    <button className="hover:underline hover:bg-opacity-65">Edit</button>
                    <div className=" items-center gap-3 hidden">
                        <button className="bg-green-500 rounded-md px-3">Save</button>
                        <button className="text-red-500">Abcd</button>
                    </div>
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    <span className="text-sm w-20">Email</span>
                    <span className="text-sm w-24"> kadiksalah03@gmail.com</span>
                    <button className="hover:underline hover:bg-opacity-65">Edit</button>
                    <div className=" items-center gap-3 hidden">
                        <button className="bg-green-500 rounded-md px-3">Save</button>
                        <button className="text-red-500">Close</button>
                    </div>
                </div>

            </div>
    )
}

export default PersonalDetails