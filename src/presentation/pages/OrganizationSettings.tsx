import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import OrganizationProfile from "../components/organization_settings/OrganizationProfile.tsx";

type SettingsTab = 'profile';

function OrganizationSettings() {
    const [selectedTab, setSelectedTab] = useState<SettingsTab>('profile');

    return (
        <div className="w-full flex flex-col pb-8">
            <div className="font-bold text-3xl mb-8">Settings</div>
            <div className="w-full flex-grow flex">
                <div className="w-1/4 flex flex-col rounded-xl p-8">
                    <div onClick={() => setSelectedTab('profile')} className="w-full flex items-center text-yellow-600">
                        <Icon icon="mingcute:profile-fill" className="text-lg" />
                        <div className="ml-2 font-semibold">Organization Profile</div>
                    </div>
                </div>
                <div className="w-4/5 px-8 flex-grow">
                    {
                        selectedTab == 'profile' && (<OrganizationProfile />)
                    }
                </div>
            </div>

        </div>
    )
}

export default OrganizationSettings