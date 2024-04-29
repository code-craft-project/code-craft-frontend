import { useContext, useState } from "react";
import { organizationsService } from "../services";
import { useNavigate } from "react-router-dom";
import ToastContext from "../contexts/ToastContext";

export default function useCreateOrganization(): useCreateOrganizationReturn {
    const [organization, setOrganization] = useState<OrganizationEntity>({ name: '', description: '', type: undefined });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toastManager = useContext(ToastContext);

    const createOrganization = async (): Promise<void> => {
        setIsLoading(true);
        const response = await organizationsService.createOrganization(organization);
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
        isLoading
    };
}