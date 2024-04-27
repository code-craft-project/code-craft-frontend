import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrganizationDashboardContext from "../../../application/contexts/OrganizationDashboardContext";
import moment from "moment";
import LoadingIndicator from "../LoadingIndicator";
import { userProfilePicture } from "../../../application/consts";

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
                                <div key={index} className="w-full flex items-center px-4 py-2">
                                    <div className="flex-1">
                                        <img src={member.user?.profile_image_url || userProfilePicture} className="w-10 h-10 bg-gray-800 rounded-full object-cover" />
                                    </div>
                                    <div className="flex-1 text-sm font-semibold text-gray-200">{member.user?.first_name}</div>
                                    <div className="flex-1 text-sm font-semibold text-gray-200">{member.user?.last_name}</div>
                                    <div className="flex-1 text-sm font-semibold text-gray-200">{member.role}</div>
                                    <div className="flex-1 text-sm font-semibold text-gray-200">{moment(member.created_at).format("DD-MM-yyyy HH:mm")}</div>
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
