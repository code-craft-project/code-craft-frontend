import { useContext, useEffect, useRef, useState } from 'react';
import defaultProfile from '../../../assets/Images/profile.png';
import UserSessionContext from '../../../application/contexts/UserSessionContext';
import { filesUploadServices, userAuthentication } from '../../../application/services';
import ToastContext from '../../../application/contexts/ToastContext';
import GradientColor from '../../../application/data/GradientColor';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';

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
    const [profileImage, setProfileImage] = useState<File | null>();

    useEffect(() => {
        setUsername(userSession.userSession.user?.username || '');
        setFirst_name(userSession.userSession.user?.first_name || '');
        setLast_name(userSession.userSession.user?.last_name || '');
        setEmail(userSession.userSession.user?.email || '');
        // setProfileImage(userSession.userSession.user?.profile_image_url || defaultProfile);
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
            };
            try {
                let profile_image_url = undefined;
                if (profileImage) {
                    const uploadImageResponse = await filesUploadServices.uploadImage(profileImage);
                    if (uploadImageResponse.status == 'success') {
                        profile_image_url = uploadImageResponse.data;
                    }
                }

                const response = await userAuthentication.updateUser({...user, profile_image_url});
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
    const imageRef = useRef<HTMLInputElement>(null);

    const selectImage = () => {
        imageRef.current?.click();
    }

    const onFileSelected = async () => {
        if (imageRef.current && imageRef.current.files && imageRef.current.files.length > 0) {
            setProfileImage(imageRef.current.files[0]);
        }
    }

    return (
        <form onSubmit={update_user} className="flex flex-col gap-8 py-5 md:px-20 w-full md:w-4/5">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className='h-20'> 
                    <h1 className="font-semibold text-2xl">Personal details</h1>
                    <h1 className="font-medium text-sm opacity-75">Edit your personal details</h1>
                </div>
                <div className="relative">
                <img src={userSession.userSession.user?.profile_image_url ? userSession.userSession.user.profile_image_url : defaultProfile} className="w-20 h-20 rounded-full bg-gray-900 object-cover" />
                        <div onClick={selectImage} className='absolute bottom-0 right-0 bg-yellow-600 rounded-full p-2 cursor-pointer hover:bg-yellow-500' title='Upload new profile image'>
                            <Icon icon="majesticons:camera" />
                            <input onChange={onFileSelected} ref={imageRef} type='file' hidden accept='image/*' />
                        </div>
                </div>
            </div>
            <div className="md:w-2/3 w-full flex items-center md:items-start justify-between">
                <span className="text-sm w-20">username</span>
                {editMode.username ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col md:flex-row gap-2 justify-end items-start w-full'
                    >
                        <input
                            type="text"
                            className="text-sm text-black px-3 py-1 rounded-lg w-36 md:mr-16"
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
            <div className="md:w-2/3 w-full flex items-start justify-between">
                <span className="text-sm w-20">First Name</span>
                {editMode.first_name ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col md:flex-row gap-2 justify-end items-start w-full'
                    >
                        <input
                            type="text"
                            className="text-sm text-black px-3 py-1 rounded-lg w-36 md:mr-16"
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
            <div className="md:w-2/3 w-full flex items-start justify-between">
                <span className="text-sm w-20">Last Name</span>
                {editMode.last_name ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col md:flex-row gap-2 justify-end items-start w-full'
                    >
                        <input
                            type="text"
                            className="text-sm text-black px-3 py-1 rounded-lg w-36 md:mr-16"
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

            <div className="md:w-2/3 w-full flex items-start justify-between">
                <span className="text-sm w-20">Email</span>
                {editMode.email ?
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col md:flex-row gap-2 justify-end items-start w-full'
                    >
                        <input
                            type="text"
                            className="text-sm text-black px-3 py-1 rounded-lg w-36 md:mr-16"
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
            <div className='flex justify-end w-full md:w-[69%] mt-2'>
                <button type='submit' className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} w-full md:w-fit  font-medium px-8 py-1 rounded-lg  hover:opacity-90 active:scale-105 transition-all duration-300`}>Save</button>
            </div>
        </form>
    )
}

export default PersonalDetails