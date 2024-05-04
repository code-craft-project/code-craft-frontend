import { Icon } from "@iconify/react/dist/iconify.js";
import GradientColor from "../../application/data/GradientColor.ts";
import privacy from '../../assets/Icons/privacy.svg';
import progress from '../../assets/Icons/progress.svg';
import user from '../../assets/Icons/user.svg';
import PersonalDetails from "../components/settings/PersonalDetails.tsx";
import Privacy from "../components/settings/Privacy.tsx";
import MyProgress from "../components/settings/MyProgress.tsx";
import { useState } from "react";

function Settings() {
    const {styles} = GradientColor()
    const [changeComponent,setChangeComponent] =useState<number>(0)
    const components = [
        {
            title: 'Select User Information & Updates',
            content: <PersonalDetails/>
        },
        {
            title: 'Edit password ',
            content: <Privacy/>
        },
        {
            title: 'Show user progress',
            content: <MyProgress/>,
        },
        ] 
    return (
        <div className="w-full flex mt-14 pb-5" >
            <div className="flex w-1/5 flex-col gap-60 py-5 px-10 border-r border-white">
                <div className="flex flex-col gap-8">
                    <h1 className="opacity-90 pl-8">Profile Settings</h1>
                    <div className="flex flex-col gap-3 items-center pl-8">
                        <button 
                            onClick={() => setChangeComponent(0)} 
                            className={`cursor-pointer hover:opacity-60 flex gap-1 transition-colors duration-300 ease-in-out items-center ${changeComponent == 0 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}
                        >
                            {changeComponent==0 
                            ? <img src={user} alt="" />
                            : <Icon icon="zondicons:user" width="18" height="18" />
                            }
                            <span className="w-32 text-sm text-start">Personal details</span>
                        </button>
                        <button 
                            onClick={() => setChangeComponent(1)} 
                            className={`cursor-pointer hover:opacity-60 flex gap-1 transition-colors duration-300 ease-in-out items-center ${changeComponent == 1 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}
                        > 
                            {changeComponent==1
                            ? <img src={privacy} alt="" />
                            : <Icon icon="material-symbols:privacy-tip" width="18" height="18" />
                            }
                            <span className="w-32 text-sm text-start">Privacy</span>
                        </button>
                        <button 
                            onClick={() => setChangeComponent(2)} 
                            className={`cursor-pointer hover:opacity-60 flex gap-1 transition-colors duration-300 ease-in-out items-center '}`}
                        >
                            {changeComponent == 2
                            ? <img src={progress} alt="" className="scale-75 "/>
                            : <Icon icon="ri:progress-3-fill" className="text-white" width="18" height="18"/>
                            }
                            <span className={`w-32 text-sm text-start ${changeComponent == 2 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}>My progress</span>
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

export default Settings