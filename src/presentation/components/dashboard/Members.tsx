import { Icon } from "@iconify/react/dist/iconify.js";
import GradientColor from "../../../application/data/GradientColor.ts";
import { useState } from "react";

function Members() {
    const [activeMenus, setActiveMenus] = useState<any>({}); 
    const {styles} = GradientColor()

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
        {
            email: 'Kadiksalah04@gmail.com',
            eventManager: false,
            challengeManager: false,
            jobPostManager: true,
            dateAdded: '12/03/2024',
        },
        {
            email: 'Kadiksalah05@gmail.com',
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
    <>
    <div className="flex justify-between mx-28 items-center mt-10 mb-5">
        <div className="flex flex-col items-start">
            <h1 className="text-lg font-semibold flex gap-3 items-center">Members</h1>
            <p className="opacity-75  text-xs">Manage your organization members and their account permissions here</p>
        </div>
        <select className="bg-white bg-opacity-20 font-semibold  rounded-lg px-2 py-0.5 text-sm outline-none">
            <option value="members">Filter By</option>
            <option value="members">Members</option>
            <option value="events">events</option>
        </select>
    </div>
    <div className="mx-28">
        <div className="w-full rounded-xl shadow">
            <table className="w-full border rounded-xl ">
                <thead>
                    <tr className="text-left bg-white bg-opacity-20 text-nowrap">
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
                    <tr key={user.email} className="border-b hover:bg-gray-100 hover:bg-opacity-15">
                        <td className="px-3 py-8 flex items-center gap-1">
                            <img src="" alt="PH" className="border h-14 w-14 rounded-full"/>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-meduim">STA1</span>
                                <span className="opacity-90 font-light text-xs"> {user.email}</span>
                            </div>
                        </td>
                        <td className="px-3 py-8 ">
                            <input
                            type="checkbox"
                            className={`w-4 h-4 rounded-full ml-10  accent-primary-yellow `}
                            checked={user.eventManager}
                            />
                        </td>
                        <td className="px-3 py-8 ">
                            <input
                            type="checkbox"
                            className={`w-4 h-4 rounded-full ml-12 accent-primary-yellow `}
                            // checked={user.challengeManager}
                            />
                        </td>
                        <td className="px-3 py-8 ">
                            <input
                            type="checkbox"
                            className={`w-4 h-4 rounded-full ml-16 accent-primary-yellow`}
                            // checked={user.jobPostManager}
                            />
                        </td>
                        <td className="px-3 py-8 gap-5 ">
                            {user.dateAdded} 
                        </td>
                        <td className="px-3 py-2 relative ">
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
    <div className="flex items-center gap-2 ml-28 my-8">
        <Icon icon="mdi:keyboard-arrow-left" width="18" height="18" className="p-1 bg-white rounded-md w-5 h-5 flex items-center justify-center bg-opacity-35 cursor-pointer"/>
        <span className={`p-1 bg-white rounded-md font-light  w-5 h-5 flex items-center justify-center bg-opacity-20 cursor-pointer hover:bg-opacity-35 `}>1</span>
        <span className={`p-1 bg-white rounded-md font-light  w-5 h-5 flex items-center justify-center bg-opacity-20 cursor-pointer hover:bg-opacity-35 `}>2</span>
        <span className={`p-1 bg-white rounded-md font-light  w-5 h-5 flex items-center justify-center bg-opacity-20 cursor-pointer hover:bg-opacity-35 `}>3</span>
        <span className={`p-1 bg-white rounded-md font-light  w-5 h-5 flex items-center justify-center bg-opacity-20 cursor-pointer hover:bg-opacity-35 ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>4</span>
        <span className={`p-1 bg-white rounded-md font-light  w-5 h-5 flex items-center justify-center bg-opacity-20 cursor-pointer hover:bg-opacity-35 `}>...</span>
        <span className={`p-1 bg-white rounded-md font-light  w-5 h-5 flex items-center justify-center bg-opacity-20 cursor-pointer hover:bg-opacity-35 `}>15</span>
        <Icon icon="dashicons:arrow-right-alt2" width="18" height="18" className="p-1 bg-white rounded-md w-5 h-5 flex items-center justify-center bg-opacity-35 cursor-pointer"/>
    </div>
    </>
    )
}

export default Members