import { useContext, useEffect, useState } from 'react'
import profile from '../../../assets/Images/profile.png'
import UserSessionContext from '../../../application/contexts/UserSessionContext'
import { userAuthentication } from '../../../application/services';
import ToastContext from '../../../application/contexts/ToastContext';
import GradientColor from '../../../application/data/GradientColor';

function PersonalDetails() {
    const toastManager = useContext(ToastContext);
    const userSession = useContext(UserSessionContext)
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
        username: false,
        first_name: false,
        last_name: false,
        email: false
    });
    const {styles} = GradientColor()


    var [username,setUsername] = useState<string>()
    var [first_name,setFirst_name] = useState<string>();
    var [last_name,setLast_name] = useState<string>()
    var [email,setEmail] = useState<string>() 
    useEffect(() => {
        setUsername(userSession.user?.username)
        setFirst_name(userSession.user?.first_name)
        setLast_name(userSession.user?.last_name)
        setEmail(userSession.user?.last_name)
    },[userSession])

    const handleEdit = (field: string) => {
        setEditMode(prevState => ({
            ...prevState,
            [field]: true
        }));
    };

    const handleSave = (field: string) => {
        setEditMode(prevState => ({
            ...prevState,
            [field]: false
        }));
    };

    const handleCancel = (field: string) => {
        setEditMode(prevState => ({
            ...prevState,
            [field]: false
        }));
    };
    const alertSuccessHandler = (_p0: string) => { toastManager.alertSuccess('Success Message') }
    const alertErroreHandler = (_p0: string) => { toastManager.alertError("Error Message"); }


    async function update_user(ev: any) {
        ev.preventDefault();
        if (first_name && last_name && email && username) {
            const user = { 
                username,
                first_name,
                last_name,
                email,
            };
            try {
                const response = await userAuthentication.updateUser(user);
                if (response.status == "success") {
                    alertSuccessHandler("Updating successful");
                } else {
                    console.error('Updating failed:', response.message);
                    alertErroreHandler("Updating failed"); 
                }
            } catch (error) {
                console.log(error);
                alertErroreHandler("Updating failed"); 
            }
        }
    }

    return (
            <form onSubmit={update_user} className="flex flex-col gap-8 py-5 px-20 w-4/5">
                <div>
                    <h1 className="font-semibold text-2xl">Personal details</h1>
                    <h1 className="font-meduim text-lg opacity-75">Edit your personal details</h1>
                </div>
                <img src={profile} alt="" className="w-12 h-12" />
                <div className="w-2/3 flex items-center justify-between">
                    <span className="text-sm w-20">username</span>
                    {editMode.username ?
                    <>
                        <input 
                            type="text" 
                            className="text-sm text-black w-24" 
                            value={username} 
                            onChange={(ev) => setUsername(ev.target.value)}
                        />
                        <div className="flex items-center gap-3">
                            <button className="bg-green-500 rounded-md px-3" onClick={() => handleSave('username')}>Save</button>
                            <button className="text-red-500" onClick={() => handleCancel('username')}>Cancel</button>
                        </div>
                    </>
                    :
                    <>
                        <span className="text-sm w-24">{username}</span>
                        <button className="hover:underline hover:bg-opacity-65" onClick={() => handleEdit('username')}>Edit</button>
                    </>
                }
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    <span  className="text-sm w-20">First Name</span>
                    {editMode.first_name ?
                    <>
                        <input 
                            type="text" 
                            className="text-sm text-black w-24" 
                            value={first_name} 
                            onChange={(ev) => setFirst_name(ev.target.value)}
                        />
                        <div className="flex items-center gap-3">
                            <button className="bg-green-500 rounded-md px-3" onClick={() => handleSave('first_name')}>Save</button>
                            <button className="text-red-500" onClick={() => handleCancel('first_name')}>Cancel</button>
                        </div>
                    </>
                    :
                    <>
                        <span className="text-sm w-24">{first_name}</span>
                        <button className="hover:underline hover:bg-opacity-65" onClick={() => handleEdit('first_name')}>Edit</button>
                    </>
                }
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    <span className="text-sm w-20">Last Name</span>
                    {editMode.last_name ?
                    <>
                        <input 
                            type="text" 
                            className="text-sm text-black w-24" 
                            value={last_name} 
                            onChange={(ev) => setLast_name(ev.target.value)}
                            />
                        <div className="flex items-center gap-3">
                            <button className="bg-green-500 rounded-md px-3" onClick={() => handleSave('last_name')}>Save</button>
                            <button className="text-red-500" onClick={() => handleCancel('last_name')}>Cancel</button>
                        </div>
                    </>
                    :
                    <>
                        <span className="text-sm w-24">{last_name}</span>
                        <button className="hover:underline hover:bg-opacity-65" onClick={() => handleEdit('last_name')}>Edit</button>
                    </>
                    }
                </div>

                <div className="w-2/3 flex items-center justify-between">
                    <span className="text-sm w-20">Email</span>
                    {editMode.email ?
                    <>
                        <input 
                            type="text" 
                            className="text-sm text-black w-24" 
                            value={email} 
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <div className="flex items-center gap-3">
                            <button className="bg-green-500 rounded-md px-3" onClick={() => handleSave('email')}>Save</button>
                            <button className="text-red-500" onClick={() => handleCancel('email')}>Cancel</button>
                        </div>
                    </>
                    :
                    <>
                        <span className="text-sm w-24">{email}</span>
                        <button className="hover:underline hover:bg-opacity-65" onClick={() => handleEdit('email')}>Edit</button>
                    </>
                }
            </div>
            <div className='flex justify-end w-[69%] mt-2'>
                <button type='submit' className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  font-meduim px-8 py-1 rounded-lg  hover:opacity-90 active:scale-105 transition-all duration-300`}>Save</button>
            </div>
        </form>
    )
}

export default PersonalDetails