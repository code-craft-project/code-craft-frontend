import { useEffect, useState } from "react";
import { organizationsService } from "../services";

export default function useOrganizations() {
    const [organizations, setOrganizations] = useState<OrganizationEntity[]>([]);

    useEffect(() => {
        getOrganization();
    }, []);

    const getOrganization = async () => {
        try {
            const response = await organizationsService.getMyOrganization()
            if (response.status == "success") {
                setOrganizations(response.data);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { organizations };
}