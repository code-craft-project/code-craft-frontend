import { NavLink } from "react-router-dom";
import { organizationProfilePicture } from "../../application/consts";

export default function OrganizationCardForSearchResult({ organization }: { organization: OrganizationEntity }) {

    // const getOrganizationDescriptionShort = (): string => {
    //     const maxLength = 100;
    //     if (organization.description.length > maxLength) {
    //         return organization.description.slice(0, maxLength) + '...';
    //     }

    //     return organization.description;
    // }

    return (
        <NavLink to={`/organization/${organization.id}`}>
            <div className="w-full h-full flex flex-col relative bg-blue-950 p-4 rounded-xl hover:bg-gray-900 duration-300 cursor-pointer">
                <div className="w-full flex items-center">
                    <div>
                        <img src={organization?.profile_image_url || organizationProfilePicture} className="w-10 h-10 rounded-md" />
                    </div>
                </div>
                <div className="w-full flex flex-col mt-2">
                    <div className="font-semibold text-lg text-gray-50 mb-2">{organization?.name}</div>
                    <div className="text-sm text-gray-50">{organization.type}</div>
                    <div className="text-xs text-gray-400">{organization.creator?.first_name} {organization.creator?.last_name}</div>
                </div>
                {/* <div className="w-full text-gray-400 text-xs mt-2 text-ellipsis">{getOrganizationDescriptionShort()}</div> */}
            </div>
        </NavLink>
    )
}