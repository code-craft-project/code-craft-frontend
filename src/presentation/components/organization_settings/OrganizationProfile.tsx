
import { Icon } from '@iconify/react/dist/iconify.js'
import OrganizationDashboardContext from '../../../application/contexts/OrganizationDashboardContext';
import { useContext, useState } from 'react';
import { organizationProfilePicture } from '../../../application/consts';

export default function OrganizationProfile() {
    const [isEditMode, setIsEditMode] = useState(false);
    const { organization, editOrganization, setEditOrganization, updateOrganization } = useContext(OrganizationDashboardContext);

    return (
        <div className="w-full h-full flex flex-col py-5 px-20 bg-gray-950 rounded-xl">
            <div>
                <h1 className="text-gray-50 font-semibold text-lg">Profile</h1>
                <h1 className="font-meduim text-sm text-gray-600">Edit your organization profile</h1>
            </div>
            <div className='w-full flex flex-col  my-8'>
                <div className='relative w-32'>
                    <img src={organizationProfilePicture} className="w-32 h-32 rounded-full bg-gray-900 object-cover" />
                    {isEditMode && (
                        <div className='absolute bottom-0 right-0 bg-yellow-600 rounded-full p-2 cursor-pointer hover:bg-yellow-500' title='Upload new profile image'>
                            <Icon icon="majesticons:camera" />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-2/3 flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-600 w-1/6">Name:</span>
                <input onChange={(ev) => setEditOrganization(state => ({ ...state, name: ev.target.value }))} className={`text-gray-50  font-medium w-4/6 duration-300 border-none outline-none focus:bg-gray-800 ${isEditMode ? "bg-gray-900 px-4 py-2 rounded-lg" : "bg-transparent"}`} value={editOrganization.name} disabled={!isEditMode} />
            </div>
            <div className="w-2/3 flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-600 w-1/6">Type:</span>
                <input className={`text-gray-50  font-medium w-4/6 duration-300 border-none outline-none focus:bg-gray-800 bg-transparent`} value={editOrganization.type} disabled />
            </div>
            <div className="w-2/3 flex items-start justify-between mt-2">
                <span className="text-sm font-semibold text-gray-600 w-1/6">Description</span>
                <textarea
                    value={editOrganization.description}
                    onChange={(ev) => setEditOrganization(state => ({ ...state, description: ev.target.value }))}
                    rows={8}
                    disabled={!isEditMode}
                    className={`w-4/6 text-gray-50 text-sm font-meduim rounded-lg border-none outline-none focus:bg-gray-800 duration-300 ${isEditMode ? "bg-gray-900 px-4 py-2 rounded-lg" : "bg-transparent"}`} placeholder="Description.." />
            </div>

            {
                isEditMode ? (
                    <div className='w-full flex items-center justify-end my-4'>
                        <div onClick={() => { setEditOrganization(organization); setIsEditMode(false) }} className='w-fit self-end border border-px border-yellow-600 px-8 py-2 rounded-lg font-semibold text-yellow-600 mr-4 cursor-pointer'>Cancel</div>
                        <div onClick={() => { updateOrganization(); setIsEditMode(false); }} className='w-fit self-end bg-yellow-600 border border-px border-yellow-600 px-8 py-2 rounded-lg font-semibold text-gray-50 cursor-pointer'>Save</div>
                    </div>
                ) : (
                    <div onClick={() => setIsEditMode(true)} className='my-4 w-fit self-end bg-yellow-600 px-8 py-2 rounded-lg font-semibold text-gray-50 ml-20 cursor-pointer flex items-center'><Icon icon="lucide:edit" className='mr-2' /> Edit</div>
                )
            }
        </div>)
}

