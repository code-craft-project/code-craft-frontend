import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GradientColor from '../../../application/data/GradientColor';

function ProfessionalDetails() {
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
        bio: false,
        skills: false,
    });
    const { styles } = GradientColor();

    const [bio, setBio] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState<string>('');

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

    async function update_user(ev: any) {
        ev.preventDefault();
    }

    useEffect(() => {
        setBio('web developer | ui ux designer ');
        setSkills(['ui ux', 'mern stack', 'devops engineer', 'frontend', 'backend']);
    }, []);

    return (
        <form onSubmit={update_user} className="flex flex-col gap-8 py-5 px-20 w-4/5">
            <div className='h-20'>
                <h1 className="font-semibold text-2xl">Professional details</h1>
                <h1 className="font-medium text-sm opacity-75">Edit your Professional details</h1>
            </div>
            <div className="w-2/3 flex items-start justify-between">
                <span className="text-sm w-20">Bio</span>
                {editMode.bio ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex items-start justify-between'
                    >
                        <textarea
                            className="text-sm bg-transparent border-1.5 rounded-md px-2 py-1 w-72"
                            value={bio}
                            onChange={(ev) => setBio(ev.target.value)}
                            placeholder="text your bio"
                        />
                        <div className="flex items-center gap-3 ml-5">
                            <button className="bg-green-500 rounded-md px-3 hover:opacity-90 py-0.5 transition-all duration-100 active:scale-105" onClick={() => handleSave('bio')}>
                                Save
                            </button>
                            <button className="text-red-500 border border-red-700 hover:bg-red-700 hover:text-white py-0.5 px-2 transition-all duration-100 rounded-md active:scale-105" onClick={() => handleCancel('bio')}>
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className='w-full flex flex-wrap'>
                        <span className="text-sm w-80">{bio}</span>
                        <button className="hover:underline hover:text-primary-yellow hover:bg-opacity-65" onClick={() => handleEdit('bio')}>
                            Edit
                        </button>
                    </div>
                )}
            </div>
            <div className="w-2/3 flex items-start justify-between">
                <span className="text-sm w-20">Skills</span>
                {editMode.skills ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className='flex items-start justify-between w-full '
                    >
                        <div className="flex gap-2 mx-5">
                            <input
                                placeholder="Add a new skill"
                                className="text-sm bg-transparent border-1.5 rounded-md px-2 py-1  w-52"
                                value={newSkill}
                                onChange={(ev) => setNewSkill(ev.target.value)}
                            />
                            <button
                                className="bg-primary-yellow rounded-md px-3 hover:opacity-90 py-0.5 transition-all duration-100 active:scale-105"
                                onClick={() => {
                                    setSkills([...skills, newSkill]);
                                    setNewSkill('');
                                }}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex gap-3 ">
                            <button className="bg-green-500 hover:opacity-90 rounded-md px-3 py-0.5 transition-all duration-100 active:scale-105" onClick={() => handleSave('skills')}>
                                Save
                            </button>
                            <button className="text-red-500 border border-red-700 hover:bg-red-700 hover:text-white py-0.5 px-2 transition-all duration-100 rounded-md active:scale-105" onClick={() => handleCancel('skills')}>
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="w-full flex flex-wrap">
                        {skills.map((sk, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div
                                    className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} hover:opacity-80 bg-clip-text text-transparent cursor-pointer border-1.5 border-opacity-75 flex items-center gap-2 rounded-xl border-blue-900 border-b-yellow-600 border-r-yellow-600 px-1.5 py-0.5 font-medium m-1`}
                                    onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                                >
                                    {sk}
                                    <div >
                                        x
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="hover:underline hover:text-primary-yellow hover:bg-opacity-65" onClick={() => handleEdit('skills')}>
                            Add
                        </button>
                    </div>
                )}
            </div>
            <div className="flex justify-end w-[69%] mt-2">
                <button
                    type="submit"
                    className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} font-medium px-8 py-1 rounded-lg hover:opacity-90 active:scale-105 transition-all duration-300`}
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default ProfessionalDetails;