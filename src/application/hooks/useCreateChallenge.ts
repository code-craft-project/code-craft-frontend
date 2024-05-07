import { useState } from "react"
import { challengesService, organizationsService } from "../services";

const initChallenge: ChallengeEntity = {
    title: '',
    description: '',
    is_public: true,
    level: 'easy',
    topic: 'problem solving',
    type: 'in_out'
};

const initTestCase: TestCaseEntity = {
    output: '',
    inputs: [{ input: '', index: 0, type: 'string' }]
};

export default function useCreateChallenge(): useCreateChallengeReturn {
    const [challenge, setChallenge] = useState<ChallengeEntity>(initChallenge);
    const [testCases, setTestCases] = useState<TestCaseEntity[]>([initTestCase]);
    const [testCaseFile, setTestCaseFile] = useState<File | null>(null);

    const createOrganizationChallenge = async (organizationId: number): Promise<ChallengeEntity | null> => {
        const res = await organizationsService.createOrganizationChallenge(organizationId, challenge);
        if (res.status == 'success') {
            await challengesService.createTestCases(res.data.id!, testCases);
            return res.data;
        }

        return null;
    }
    
    // FIXME: This must not be here. we must Refactor the update Challenge code.
    const getTestCases = async (challengeId: number): Promise<void> => {
        const response = await challengesService.getTestCasesByChallengeId(challengeId);
        if (response.status == 'success') {
            setTestCases(response.data);
        } else {
            // TODO: Handle Error
        }
    }

    return {
        challenge, setChallenge, createOrganizationChallenge,
        testCases, setTestCases, getTestCases,
        testCaseFile, setTestCaseFile
    }
}