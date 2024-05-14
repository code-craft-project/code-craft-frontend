import { createContext } from "react";

const initChallenge: ChallengeEntity = {
    title: '',
    description: '',
    is_public: true,
    level: 'easy',
    topic: 'algorithms',
    type: 'in_out'
}

export const CreateChallengeContext = createContext<useCreateChallengeReturn>({
    challenge: initChallenge,
    setChallenge: () => { },
    createOrganizationChallenge: async (orgId: number) => { orgId; return null; },
    testCases: [],
    setTestCases: () => { },
    testCaseFile: null,
    setTestCaseFile: () => { },
    getTestCases: async (challengeId: number) => { challengeId; },
    createEventChallenge: async (eventId: number): Promise<ChallengeEntity | null> => { eventId; return null; },
    resetChallenge: () => { },
    projectFile: null,
    setProjectFile: () => { }
});