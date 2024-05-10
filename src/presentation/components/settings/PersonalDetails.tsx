import { useContext, useEffect, useState } from 'react';
import defaultProfile from '../../../assets/Images/profile.png';
import UserSessionContext from '../../../application/contexts/UserSessionContext';
import { userAuthentication } from '../../../application/services';
import ToastContext from '../../../application/contexts/ToastContext';
import GradientColor from '../../../application/data/GradientColor';
import { motion } from 'framer-motion';

function PersonalDetails() {
    const toastManager = useContext(ToastContext);
    const userSession = useContext(UserSessionContext);
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
        username: false,
        first_name: false,
        last_name: false,
        email: false,
        profile: false,
    });
    const { styles } = GradientColor();
    const [username, setUsername] = useState<string>('');
    const [first_name, setFirst_name] = useState<string>('');
    const [last_name, setLast_name] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string>('');

    useEffect(() => {
        setUsername(userSession.userSession.user?.username || '');
        setFirst_name(userSession.userSession.user?.first_name || '');
        setLast_name(userSession.userSession.user?.last_name || '');
        setEmail(userSession.userSession.user?.email || '');
        setProfileImage(userSession.userSession.user?.profile_image_url || defaultProfile);
    }, [userSession]);

    const handleEdit = (field: string) => {
        setEditMode((prevState) => ({
            ...prevState,
            [field]: true,
        }));
    };

    const handleSave = (field: string) => {
        setEditMode((prevState) => ({
            ...prevState,
            [field]: false,
        }));
    };

    const handleCancel = (field: string) => {
        setEditMode((prevState) => ({
            ...prevState,
            [field]: false,
        }));
    };

    const alertSuccessHandler = (_p0: string) => {
        toastManager.alertSuccess('Success Message');
    };
    const alertErroreHandler = (_p0: string) => {
        toastManager.alertError('Error Message');
    };

    async function update_user(ev: any) {
        ev.preventDefault();
        if (first_name && last_name && email && username) {
            const user = {
                username,
                first_name,
                last_name,
                email,
                profileImage,
            };
            try {
                const response = await userAuthentication.updateUser(user);
                if (response.status === 'success') {
                    alertSuccessHandler('Updating successful');
                } else {
                    console.error('Updating failed:', response.message);
                    alertErroreHandler(response.message || 'updating failed');
                }
            } catch (error) {
                console.log(error);
                alertErroreHandler('Updating failed');
            }
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <form onSubmit={update_user} className="flex flex-col gap-8 py-5 px-20 w-4/5">
            <div className="flex justify-between items-center">
                <div className='h-20'> 
                    <h1 className="font-semibold text-2xl">Personal details</h1>
                    <h1 className="font-medium text-sm opacity-75">Edit your personal details</h1>
                </div>
                <div className="relative">
                    <img src={profileImage} alt="" className="w-20 h-20 rounded-full" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-0 right-0 flex items-center justify-center bg-gray-800 text-white rounded-full w-6 h-6 cursor-pointer"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </motion.div>
                </div>
            </div>
            <div className="w-2/3 flex items-start justify-between">
                <span className="text-sm w-20">username</span>
                {editMode.username ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex justify-end items-start w-full'
                    >
                        <input
                            type="text"
                            className="text-sm text-black px-3 py-1 rounded-lg w-36 mr-16"
                            value={username}
                            onChange={(ev) => setUsername(ev.target.value)}
                        />
                        <div className="flex items-center gap-3">
                            <button className="bg-green-500 hover:opacity-90 rounded-md px-3 py-0.5 transition-all duration-100 active:scale-105" onClick={() => handleSave('username')}>Save</button>
                            <button className="text-red-500 border border-red-700 hover:bg-red-700 hover:text-white py-0.5 px-2 transition-all duration-100 rounded-md active:scale-105" onClick={() => handleCancel('username')}>Cancel</button>
                        </div>
                    </motion.div>
                    :
                    <>
                        <span className="text-sm w-24">{username}</span>
                        <button className="hover:underline hover:bg-opacity-65 hover:text-primary-yellow" onClick={() => handleEdit('username')}>Edit</button>
                    </>
                }
            </div>
            <div className="w-2/3 flex items-start justify-between">
                <span className="text-sm w-20">First Name</span>
                {editMode.first_name ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex justify-end items-start w-full'
                    >
                        <input
                            type="text"
                            className="text-sm text-black px-3 py-1 rounded-lg w-36 mr-16"
                            value={first_name}
                            onChange={(ev) => setFirst_name(ev.target.value)}
                        />
                        <div className="flex items-center gap-3">
                            <button className="bg-green-500 hover:opacity-90 rounded-md px-3 py-0.5 transition-all duration-100 active:scale-105" onClick={() => handleSave('first_name')}>Save</button>
                            <button className="text-red-500 border border-red-700 hover:bg-red-700 hover:text-white py-0.5 px-2 transition-all duration-100 rounded-md active:scale-105" onClick={() => handleCancel('first_name')}>Cancel</button>
                        </div>
                    </motion.div>
                    :
                    <>
                        <span className="text-sm w-24">{first_name}</span>
                        <button className="hover:underline hover:bg-opacity-65 hover:text-primary-yellow" onClick={() => handleEdit('first_name')}>Edit</button>
                    </>
                }
            </div>
            <div className="w-2/3 flex items-start justify-between">
                <span className="text-sm w-20">Last Name</span>
                {editMode.last_name ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex justify-end items-start w-full'
                    >
                        <input
                            type="text"
                            className="text-sm text-black px-3 py-1 rounded-lg w-36 mr-16"
                            value={last_name}
                            onChange={(ev) => setLast_name(ev.target.value)}
                            placeholder='Your last name'
                        />
                        <div className="flex items-center gap-3">
                            <button className="bg-green-500 hover:opacity-90 rounded-md px-3 py-0.5 transition-all duration-100 active:scale-105" onClick={() => handleSave('last_name')}>Save</button>
                            <button className="text-red-500 border border-red-700 hover:bg-red-700 hover:text-white py-0.5 px-2 transition-all duration-100 rounded-md active:scale-105" onClick={() => handleCancel('last_name')}>Cancel</button>
                        </div>
                    </motion.div>
                    :
                    <>
                        <span className="text-sm w-24">{last_name}</span>
                        <button className="hover:underline hover:bg-opacity-65 hover:text-primary-yellow" onClick={() => handleEdit('last_name')}>Edit</button>
                    </>
                }
            </div>

            <div className="w-2/3 flex items-start justify-between">
                <span className="text-sm w-20">Email</span>
                {editMode.email ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex justify-end items-start w-full'
                    >
                        <input
                            type="text"
                            className="text-sm text-black px-3 py-1 rounded-lg w-36 mr-16"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <div className="flex items-center gap-3">
                            <button className="bg-green-500 hover:opacity-90 rounded-md px-3 py-0.5 transition-all duration-100 active:scale-105" onClick={() => handleSave('email')}>Save</button>
                            <button className="text-red-500 border border-red-700 hover:bg-red-700 hover:text-white py-0.5 px-2 transition-all duration-100 rounded-md active:scale-105" onClick={() => handleCancel('email')}>Cancel</button>
                        </div>
                    </motion.div>
                    :
                    <>
                        <span className="text-sm w-24">{email}</span>
                        <button className="hover:underline hover:bg-opacity-65 hover:text-primary-yellow" onClick={() => handleEdit('email')}>Edit</button>
                    </>
                }
            </div>
            <div className='flex justify-end w-[69%] mt-2'>
                <button type='submit' className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  font-medium px-8 py-1 rounded-lg  hover:opacity-90 active:scale-105 transition-all duration-300`}>Save</button>
            </div>
        </form>
    )
}

export default PersonalDetails