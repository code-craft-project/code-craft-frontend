import { Icon } from "@iconify/react/dist/iconify.js";
import GradientColor from "../../application/data/GradientColor.ts";
import privacy from '../../assets/Icons/privacy.svg';
import progress from '../../assets/Icons/progress.svg';
import ProfessionalDetailsImg from '../../assets/Icons/proffesionalDetails.svg';
import user from '../../assets/Icons/user.svg';
import PersonalDetails from "../components/settings/PersonalDetails.tsx";
import Privacy from "../components/settings/Privacy.tsx";
import MyProgress from "../components/settings/MyProgress.tsx";
import { useContext, useState } from "react";
import ProfessionalDetails from "../components/settings/ProfessionalDetails.tsx";
import { userAuthentication } from "../../application/services.ts";
import useUserSession from "../../application/hooks/useUserSession.ts";
import ToastContext from "../../application/contexts/ToastContext.ts";

function Settings() {
    const {styles} = GradientColor()
    const { signOut } = useUserSession()
    const toastManager = useContext(ToastContext);
    const [changeComponent,setChangeComponent] =useState<number>(0)
    const components = [
        {
            title: 'Select User Information & Updates',
            content: <PersonalDetails/>
        },
        {
            title: 'Select skills Information & Updates',
            content: <ProfessionalDetails/>
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

    const HandleSignOut = async () => {
        try {
            const response = await userAuthentication.signOut()
            if (response.status == "success") {
                signOut()
                toastManager.alertSuccess("Sign out successful");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                console.error('Sign out failed:', response.message);
                toastManager.alertError("Sign out failed");
            }
        } catch (error) {
            console.log(error);
            toastManager.alertError("Creation failed");
        }
    }

    return (
        <div className="w-full flex mt-14 pb-5" >
            <div className="flex w-1/6 flex-col justify-between py-5  border-r border-white">
                <div className="flex flex-col gap-8 pl-2">
                    <h1 className="opacity-90 ">Profile Settings</h1>
                    <div className="flex flex-col gap-3 items-center pl-2">
                        <button 
                            onClick={() => setChangeComponent(0)} 
                            className={`cursor-pointer hover:opacity-60 flex gap-1 transition-colors duration-300 ease-in-out items-center ${changeComponent == 0 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}
                        >
                            {changeComponent==0 
                            ? <img src={user} alt="" className="w-3 h-3"/>
                            : <Icon icon="mdi:user" width="20" height="20" />
                            }
                            <div className="w-44 text-sm text-start">Personal details</div>
                        </button>
                        <button 
                            onClick={() => setChangeComponent(1)} 
                            className={`cursor-pointer hover:opacity-60 flex gap-1 transition-colors duration-300 ease-in-out items-center ${changeComponent == 1 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}
                        >
                            {changeComponent==1 
                            ? <img src={ProfessionalDetailsImg} alt="" className="w-3 h-3"/>
                            : <Icon icon="carbon:skill-level-intermediate" width="18" height="18" />
                            }
                            <div className="w-44 text-sm text-start">Professional details</div>
                        </button>
                        <button 
                            onClick={() => setChangeComponent(2)} 
                            className={`cursor-pointer hover:opacity-60 flex gap-1 transition-colors duration-300 ease-in-out items-center ${changeComponent == 2 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}
                        > 
                            {changeComponent==2
                            ? <img src={privacy} alt="" />
                            : <Icon icon="material-symbols:privacy-tip" width="18" height="18" />
                            }
                            <div className="w-44 text-sm text-start">Privacy</div>
                        </button>
                        <button 
                            onClick={() => setChangeComponent(3)} 
                            className={`cursor-pointer hover:opacity-60 flex gap-1 transition-colors duration-300 ease-in-out items-center '}`}
                        >
                            {changeComponent == 3
                            ? <img src={progress} alt="" className="scale-75 "/>
                            : <Icon icon="ri:progress-3-fill" className="text-white" width="18" height="18"/>
                            }
                            <div className={`w-44 text-sm text-start ${changeComponent == 3 ? `${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} bg-clip-text text-transparent` : ''}`}>My progress</div>
                        </button>
                    </div>
                </div>
                <div onClick={HandleSignOut} className="flex gap-2 items-center pr-8 cursor-pointer hover:text-primary-yellow ">
                    <Icon icon="tabler:logout" width="18" height="18" />
                    <div>Log out</div>
                </div>
            </div>
            {components[changeComponent].content}

        </div>
    )
}

export default Settings