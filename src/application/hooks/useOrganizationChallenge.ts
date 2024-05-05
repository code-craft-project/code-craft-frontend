import { useContext, useEffect, useState } from "react";
import useTestCases from "./useTestCases";
import ToastContext from "../contexts/ToastContext";
import { CreateChallengeContext } from "../contexts/CreateChallengeContext";
import { organizationsService } from "../services";

export default function useOrganizationChallenge(): useOrganizationChallengeReturn {

    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [challenge, setChallenge] = useState<ChallengeEntity| null>(null);
    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = (_p0: string) => { toastManager.alertSuccess('Success Message') }
    const alertErroreHandler = (_p0: string) => { toastManager.alertError("Error Message"); }
    const {description, title, topic, level, is_public, type} = useContext(CreateChallengeContext)
    const {createTestCases} = useTestCases()

    useEffect(() => {
        setChallenge({description, title, topic, level, is_public, type})
    },[description, title, topic, level, is_public, type])

    const createOrganizationChallenge = async (organization_id: number): Promise<void> => {
        setIsLoading(true);
        try{
            const response = await organizationsService.createOrganizationChallenge(organization_id, challenge);
            if (response.status == "success") {
                console.log(response)
                if(response.data.id){
                    const test_casesResponse = await createTestCases(response.data.id)

                    if (test_casesResponse.status && test_casesResponse.status == "success") {
                        console.log("success")
                        alertSuccessHandler("Challenge created successful");
                        setTimeout(() => {
                            window.location.href = `/organization/${organization_id}/dashboard`;
                        }, 2000);
                    }else if (test_casesResponse.status && test_casesResponse.status == "error") {
                        console.error('Test cases created failed:', test_casesResponse.message);
                        alertErroreHandler("Test cases created failed");
                    }else{
                        console.error('Test cases created failed:', test_casesResponse.message);
                        alertErroreHandler("Test cases created failed");
                    }
                }else{
                    console.log("something went wrong")
                    alertErroreHandler("Challenge created failed");
                }
            } else {
                console.error('Challenge created failed:', response.message);
                alertErroreHandler("Challenge created failed");
            }
        } catch (error) {
            console.log(error);
            alertErroreHandler("Challenge created failed ");
        }
        setIsLoading(true);
    }

    return {
        createOrganizationChallenge,
        challenge,isLoading,
        setChallenge,
        file, setFile,
        fileUrl, setFileUrl
    }
}