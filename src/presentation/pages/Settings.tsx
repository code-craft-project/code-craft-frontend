import { Icon } from "@iconify/react/dist/iconify.js";
import GradientColor from "../../application/data/GradientColor";
import profile from '../../assets/Images/profile.png';

function Settings() {
    const {styles} = GradientColor()

    return (
        <div className="w-screen flex mt-14" >
            <div className="flex w-1/5 flex-col justify-between p-5 border-r border-white">
                <div className="flex flex-col gap-8">
                    <h1 className="opacity-90 px-8">Profile Settings</h1>
                    <div className="flex flex-col gap-3 items-center px-3">
                        <div className="cursor-pointer flex gap-2 items-center">
                            <Icon icon="zondicons:user" width="18" height="18" />
                            <span className="w-32">Personal details</span>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center">
                            <Icon icon="material-symbols:privacy-tip" width="18" height="18" />
                            <span className="w-32">Privacy</span>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center">
                            <Icon icon="ri:progress-3-fill" width="18" height="18" />
                            <span className="w-32">My progress</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 items-center px-8 cursor-pointer">
                    <Icon icon="tabler:logout" width="18" height="18" />
                    <span>Log out</span>
                </div>
            </div>
            <div className="flex flex-col gap-8 py-5 px-20 w-4/5">
                <div>
                    <h1 className="font-semibold text-2xl">Personal details</h1>
                    <h1 className="font-meduim text-lg opacity-75">Edit your personal details</h1>
                </div>
                <img src={profile} alt="" className="w-12 h-12" />
                <div className="w-2/3 flex items-center justify-between">
                    <span className="w-20">username</span>
                    <span className="w-24">sta24</span>
                    <button className="hover:underline hover:bg-opacity-65">Edit</button>
                    <div className=" items-center gap-3 hidden">
                        <button className="bg-green-500 rounded-md px-3">Save</button>
                        <button className="text-red-500">Close</button>
                    </div>
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    <span  className="w-20">First Name</span>
                    <span className="w-24">sta24</span>
                    <button className="hover:underline hover:bg-opacity-65">Edit</button>
                    <div className=" items-center gap-3 hidden">
                        <button className="bg-green-500 rounded-md px-3">Save</button>
                        <button className="text-red-500">Close</button>
                    </div>
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    <span className="w-20">Last Name</span>
                    <span className="w-24">sta24</span>
                    <button className="hover:underline hover:bg-opacity-65">Edit</button>
                    <div className=" items-center gap-3 hidden">
                        <button className="bg-green-500 rounded-md px-3">Save</button>
                        <button className="text-red-500">Abcd</button>
                    </div>
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    <span className="w-20">Email</span>
                    <span className="w-24"> kadiksalah03@gmail.com</span>
                    <button className="hover:underline hover:bg-opacity-65">Edit</button>
                    <div className=" items-center gap-3 hidden">
                        <button className="bg-green-500 rounded-md px-3">Save</button>
                        <button className="text-red-500">Close</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Settings