import { useContext, useEffect, useState } from "react";
import { filesUploadServices, organizationsService } from "../services";
import { useNavigate } from "react-router-dom";
import ToastContext from "../contexts/ToastContext";

export default function useCreateOrganization(): useCreateOrganizationReturn {
    const [organization, setOrganization] = useState<OrganizationEntity>({ name: '', description: '', type: undefined });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toastManager = useContext(ToastContext);
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        if (image) {
            const url = URL.createObjectURL(image);
            setImageUrl(url);
        }
    }, [image]);

    const createOrganization = async (): Promise<void> => {
        setIsLoading(true);
        
        let profile_image_url = undefined;
        if (image) {
            const uploadImageResponse = await filesUploadServices.uploadImage(image);
            if (uploadImageResponse.status == 'success') {
                profile_image_url = uploadImageResponse.data;
            }
        }

        const response = await organizationsService.createOrganization({ ...organization, profile_image_url });
        if (response.status == 'success') {
            toastManager.alertSuccess("Organization Created Successfully");
            navigate(`/organization/${response.data.id}`);
        } else {
            toastManager.alertError(response.message || "Something went wrong");
        }
        setIsLoading(false);
    }

    return {
        organization, setOrganization, createOrganization,
        image, setImage,
        imageUrl, setImageUrl,
        isLoading
    };
}