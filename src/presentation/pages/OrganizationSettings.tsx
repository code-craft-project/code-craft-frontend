import { Icon } from "@iconify/react/dist/iconify.js";
import GradientColor from "../../application/data/GradientColor.ts";
import organization from '../../assets/Icons/organization.svg';
import permissions from '../../assets/Icons/permissions.svg';
import { useState } from "react";
import OrganizationDetails from "../components/organization_settings/OrganizationDetails.tsx";
import Permissions from "../components/organization_settings/Permissions.tsx";

function OrganizationSettings() {
    const {styles} = GradientColor()
    const [changeComponent,setChangeComponent] =useState<number>(0)
    const components = [
        {
            title: 'Select organization Information & Updates',
            content: <OrganizationDetails/>
        },
        {
            title: 'Show user permissions & updates',
            content: <Permissions/>,
        },
        ] 
    return (
        <div className="w-screen flex mt-14 pb-5" >
            <div className="flex w-1/5 flex-col gap-60 py-5 px-10 border-r border-white">
                <div className="flex flex-col gap-8">
                    <h1 className="opacity-90 pl-8 text-nowrap">Organization Settings</h1>
                    <div className="flex flex-col gap-3 items-center pl-8">
                        <button 
                            onClick={() => setChangeComponent(0)} 
                            className={`cursor-pointer hover:opacity-60 flex gap-1 transition-colors ml-10 ${changeComponent==0 ? 'ml-0' : ''} duration-300 ease-in-out items-center ${changeComponent == 0 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}
                        >
                            {changeComponent==0 
                            ? <img src={organization} alt="" className="scale-50 "/>
                            : <Icon className="text-white" icon="icons8:organization" width="18" height="18" />
                            }
                            <span className="w-40 text-sm text-start text-nowrap">Organization details</span>
                        </button>
                        <button 
                            onClick={() => setChangeComponent(1)} 
                            className={`cursor-pointer hover:opacity-60 ml-10 ${changeComponent==1 ? 'mr-12 ' : ''} flex gap-1 transition-colors duration-300 ease-in-out items-center ${changeComponent == 1 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}
                        > 
                            {changeComponent==1
                            ? <img src={permissions} alt="" className="scale-50 "/>
                            : <Icon className="text-white" icon="icon-park-solid:permissions" width="18" height="18" />
                            }
                            <span className="w-40 text-sm text-start">Permissions</span>
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 items-center px-8 cursor-pointer hover:text-primary-yellow ">
                    <Icon icon="tabler:logout" width="18" height="18" />
                    <span>Log out</span>
                </div>
            </div>
            {components[changeComponent].content}

        </div>
    )
}

export default OrganizationSettings