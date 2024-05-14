import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import LoadingIndicator from "../LoadingIndicator";
import { Icon } from "@iconify/react/dist/iconify.js";
import MemberCard from "./MemberCard";


export default function OrganizationMembers() {
    const { id } = useParams();
    const { members, getOrganizationMembers, isMembersLoading } = useContext(OrganizationDashboardContext);
    useEffect(() => {
        if (id && isMembersLoading) {
            getOrganizationMembers(parseInt(id));
        }
    }, [id]);

   

    return (
        <div className="w-full h-full flex flex-col bg-gray-950 shadow-2xl shadow-gray-900 rounded-xl px-8 py-5">
            <div className="w-full flex mb-8">
                <div className="w-full flex flex-col items-start">
                    <div className="text-3xl font-bold">Members</div>
                    <div className="text-xs text-gray-300">{"Manage your organization members and their account permissions here"}</div>
                </div>
                <button
                    className={`w-fit font-meduim px-8 py-1 rounded-lg hover:opacity-90 active:scale-105 transition-all duration-300 bg-primary-yellow text-nowrap flex items-center mb-8`}
                >
                    <Icon icon="tdesign:member" width="18" height="18" />
                <div className="ml-2 font-medium">Add Member</div>
                </button>
            </div>
            <div className="w-full flex-grow flex flex-col">
                <div className="w-full flex items-center bg-gray-900 rounded-lg px-4 py-2">
                    <div className="flex-1 text-sm font-semibold text-gray-200">Profile Picture</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200">First Name</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200">Last Name</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200">Role</div>
                    <div className="flex-1 text-sm font-semibold text-gray-200">Joined At</div>
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
                                <div key={index}>
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
        </div>
    )
}