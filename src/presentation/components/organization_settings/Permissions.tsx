import { Icon } from "@iconify/react/dist/iconify.js"
import GradientColor from "../../../application/data/GradientColor.ts";
import { useState } from "react";

function Permissions() {
    const {styles} = GradientColor()
    const [activeMenus, setActiveMenus] = useState<any>({}); 

    const users = [
        {
            email: 'Kadiksalah01@gmail.com',
            eventManager: false,
            challengeManager: false,
            jobPostManager: false,
            dateAdded: '12/03/2024',
        },
        {
            email: 'Kadiksalah02@gmail.com',
            eventManager: true,
            challengeManager: true,
            jobPostManager: false,
            dateAdded: '12/03/2024',
        },
        {
            email: 'Kadiksalah03@gmail.com',
            eventManager: false,
            challengeManager: false,
            jobPostManager: true,
            dateAdded: '12/03/2024',
        },
    ];

    const handleMenuClick = (email:string) => {
        setActiveMenus((prevMenus: { [x: string]: any }) => ({ ...prevMenus, [email]: !prevMenus[email] }));
    };
    return (
        <div className="flex flex-col gap-8 py-5 px-20 w-4/5">
            <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-xl">Owner (Admin)</h1>
                <div className="flex gap-2 items-center">
                    <Icon icon="carbon:warning-filled" className="opacity-75" width="15" height="15" />
                    <h1 className="font-meduim text-sm opacity-75">Owners have view and edit access to user management by default which cannot be changed </h1>
                </div>
            </div>
            <h1 className="font-meduim text-sm opacity-75">Every member get basic permissions and functionaities by default. You can  customize settings all Members. </h1>
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="font-semibold text-xl">Members</h1>
                    <h1 className="font-meduim text-sm opacity-75">Manage your organization members and their account permissions here</h1>
                </div>
                <button className="bg-white bg-opacity-30 flex items-center gap-3 px-5 hover:bg-opacity-35 transition-all duration-200 active:scale-105 rounded-md">
                    <Icon icon="material-symbols:add" width="18" height="18" />
                    <span>Add Member</span>
                </button>
            </div>
            <div className="container mx-auto">
                <div className="w-full  rounded-xl  shadow">
                    <table className="w-full border rounded-xl ">
                        <thead>
                            <tr className="text-left bg-white font-medium bg-opacity-20 text-nowrap">
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Event Manager</th>
                                <th className="px-3 py-2">Challenges Manager</th>
                                <th className="px-3 py-2">Job Posts Manager</th>
                                <th className="px-3 py-2">Date Added</th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map((user) => (
                            <tr key={user.email} className="border-b hover:bg-gray-100 hover:bg-opacity-15 ">
                                <td className="px-3 py-8 flex items-center gap-1">
                                    <img src="" alt="PH" className="border h-12 w-12 rounded-full"/>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-meduim">STA1</span>
                                        <span className="opacity-90 font-light text-xs"> {user.email}</span>
                                    </div>
                                </td>                                <td className="px-3 py-8 ">
                                    <input
                                    type="checkbox"
                                    className={`w-4 h-4 rounded-full ml-10 ${
                                        user.eventManager ? `accent-primary-yellow bg-white` : ''
                                    }`}
                                    checked={user.eventManager}
                                    />
                                </td>
                                <td className="px-3 py-8 ">
                                    <input
                                    type="checkbox"
                                    className={`w-4 h-4 rounded-full ml-12 ${
                                        user.challengeManager ? `accent-primary-yellow bg-white` : ''
                                    }`}
                                    checked={user.challengeManager}
                                    />
                                </td>
                                <td className="px-3 py-8 ">
                                    <input
                                    type="checkbox"
                                    className={`w-4 h-4 rounded-full ml-16 ${
                                        user.jobPostManager ? `accent-primary-yellow bg-white` : ''
                                    }`}
                                    checked={user.jobPostManager}
                                    />
                                </td>
                                <td className="px-3 py-2 text-sm ">
                                {user.dateAdded} 
                                </td>
                                <td className="px-3 py-2  relative">
                                    <Icon
                                    className="cursor-pointer"
                                    icon="charm:menu-kebab"
                                    width="18"
                                    height="18"
                                    onClick={() => handleMenuClick(user.email)}
                                    />
                                    {activeMenus[user.email] && (
                                    <div className="absolute top-16 right-8 bg-black z-50 w-36 h-32 p-5 rounded-lg shadow-sm overflow-hidden">
                                        <ul>
                                            <li className="my-3 text-sm flex hover:bg-white hover:bg-opacity-10 rounded-lg items-center gap-2 text-nowrap">
                                                <Icon icon="mdi:user" width="18" height="18" />
                                                <a href="#">View Profile</a>
                                            </li>
                                            <li className="my-3 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                                <Icon icon="material-symbols:delete" width="18" height="18" />
                                                <a href="#">Delete</a>
                                            </li>
                                            <li className="my-3 text-sm flex items-center hover:bg-white hover:bg-opacity-10 rounded-lg gap-2 text-nowrap">
                                                <Icon icon="icon-park-solid:permissions" width="18" height="18" />
                                                <a href="#">Permissions</a>
                                            </li>
                                        </ul>
                                    </div>
                                    )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex items-center justify-end">
                <button className={`px-5 text-lg rounded-lg  ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} hover:bg-opacity-35 transition-all duration-200 active:scale-105`}>Save</button>
            </div>
            <div className="flex flex-col my-5 gap-5">
                <div className="flex gap-20 items-center">
                    <span className="w-60">1.Event Manager</span>
                    <span>The ability to create/edit/delete events</span>
                </div>
                <div className="flex gap-20 items-center">
                    <span className="w-60">2.Challenges Manager</span>
                    <span>The ability to manage the challenges of the organizations.</span>
                </div>            
                <div className="flex gap-20 items-center">
                    <span className="w-60">3.Job Posts Manager (Recruiter)</span>
                    <span>The ability to manage the Job Posts of the company.</span>
                </div>
            </div>
        </div>
)
}

export default Permissions