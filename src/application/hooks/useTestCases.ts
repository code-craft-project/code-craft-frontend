import { useContext } from "react";
import { challengesService } from "../services";
import { CreateChallengeContext } from "../contexts/CreateChallengeContext";

export default function useTestCases(): useTestCasesReturn {

    const {testCases,setTestCases} = useContext(CreateChallengeContext)

    const createTestCases = async (challengeId: number): Promise<CreateTestCasesResponse> => {
        try{
            const response = await challengesService.createTestCases(challengeId,{test_cases:testCases})
            if (response.status == "success") {
                return {data:response.data, status:response.status}
            } else {
                console.error('Test Cases created failed:', response.message);
                return {status:response.status, message:response.message}
            }
        } catch (error) {
            console.log(error);
            return {message: error as string}
        }
    }

    return {
        testCases,setTestCases,
        createTestCases,
    }
}
