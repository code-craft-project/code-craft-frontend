import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import LoadingIndicator from "../LoadingIndicator";
import { Icon } from "@iconify/react/dist/iconify.js";
import MemberCard from "./MemberCard";
import DashboardModel from "./DashboardModel";
import useDashboardModel from "../../../application/hooks/useDashboardModel";


export default function OrganizationMembers() {
    const { id } = useParams();
    const { members, getOrganizationMembers, isMembersLoading } = useContext(OrganizationDashboardContext);
    const useDashboardModelValue = useDashboardModel();
    useEffect(() => {
        if (id && isMembersLoading) {
            getOrganizationMembers(parseInt(id));
        }
    }, [id]);

    return (
        <div className="w-full md:h-full mt-16 md:mt-0 flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-4 md:px-8 py-5">
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 mb-8">
                <div className="w-full flex flex-col items-start">
                    <div className="text-3xl font-bold">Members</div>
                    <div className="text-xs text-gray-300">{"Manage your organization members and their account permissions here"}</div>
                </div>
                <button
                    className={`md:w-fit w-full font-medium px-8 py-1 rounded-lg hover:opacity-90 active:scale-105 transition-all duration-300 bg-primary-yellow text-nowrap flex items-center justify-center mb-8`}
                    onClick={useDashboardModelValue.open}
                >
                    <Icon icon="tdesign:member" width="18" height="18" />
                    <div className="ml-2 font-medium">Add Member</div>
                </button>
            </div>
            <div className="w-full flex-grow flex flex-col">
                <div className="w-full flex items-center bg-gray-900 rounded-lg px-4 py-2 gap-2 md:gap-0 overflow-x-scroll scrollbar-none">
                    <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">Profile Picture</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">First Name</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">Last Name</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">Role</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200 text-nowrap">Joined At</div>
                </div>
                <div className="w-full flex-grow overflow-auto">
                    {
                        isMembersLoading && (
                            <div className="w-full flex flex-col items-center">
                                <LoadingIndicator />
                            </div>
                        )
                    }
                    {
                        members.map((member, index) => {
                            return (
                                <div key={index} className="w-full">
                                    <MemberCard memberData={member} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                (members.length > 10) && (
                    <div className="w-full flex items-center justify-end">
                        <div className="text-gray-50 bg-yellow-600 rounded-lg px-8 py-1 font-semibold cursor-pointer hover:bg-gray-700 duration-300">Next</div>
                    </div>
                )
            }
            <DashboardModel useDashboardModel={useDashboardModelValue} >
                <UsersList />
            </DashboardModel>
        </div>
    )
}

function UsersList() {
    const [query, setQuery] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const users = [
        { id: 1, name: "User 1", email: "kadiksalah03@gmail.com" },
        { id: 2, name: "User 2", email: "user2@example.com" },
        { id: 3, name: "User 3", email: "user3@example.com" },
        { id: 4, name: "User 4", email: "user4@example.com" },
        { id: 5, name: "User 5", email: "user5@example.com" },
        { id: 6, name: "User 6", email: "user6@example.com" },
    ];

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="w-80 bg-black h-96 rounded-xl overflow-hidden border-2 border-opacity-50 border-blue-900 border-t-yellow-600 border-r-yellow-600">
            <div className="px-5 pt-5 font-semibold text-lg ">Users List</div>
            <div className="bg-white/5 h-1/5 px-5 pb-5 flex items-center justify-between">
                <div className='relative mr-2 '>
                    <form onSubmit={e => e.preventDefault()}>
                        <input value={query} onChange={(ev) => { setQuery(ev.target.value); }} type="text" placeholder='Search Users..' className='w-full py-1 px-4 bg-transparent border rounded-lg text-gray-50 font-medium text-sm outline-none' />
                    </form>
                    <Icon icon="iconoir:search" className="h-7 w-7 px-1.5 cursor-pointer absolute right-0 top-0 text-white opacity-75" />
                </div>
                <button 
                    className={`flex items-center justify-center text-gray-50 bg-yellow-600 rounded-lg px-2 py-0.5 font-semibold transition-all active:scale-105 cursor-pointer ${!selectedUser ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`} 
                    disabled={!selectedUser} 
                > 
                    <Icon icon="material-symbols:add" width="18" height="18" className="mr-1" />
                    Add
                </button>
            </div>
            <div className="overflow-auto h-4/5 bg-white/5 p-5">
                {filteredUsers.map(user => (
                    <div 
                        key={user.id} 
                        onClick={() => setSelectedUser(user.id)} 
                        className={`${selectedUser === user.id ? 'bg-white/10' : ''} flex items-center py-2 px-1 hover:bg-white/10 rounded-lg transition-all duration-100 cursor-pointer active:scale-105 `}
                    >
                        <img className="border rounded-full w-10 h-10 mr-2" src="" alt="PH" />
                        <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}