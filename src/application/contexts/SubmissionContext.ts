import { createContext } from "react";
import { useSubmissionReturn } from "../hooks/useSubmission";

export default createContext<useSubmissionReturn>({
    language: 'javascript',
    run: () => { },
    runResult: { error: '', output: '' },
    setLanguage: () => { },
    setSourceCode: () => { },
    sourceCode: '',
    testCases: [],
    getTestCases: async (challengeId: number): Promise<void> => { challengeId; },
    submissions: [],
    getSubmissions: async (challengeId: number) => { challengeId; },
    submit: (challengeId: number) => { challengeId },
    hasWrongResults: () => false,
    newExecutionResult: false,
    setNewExecutionResult: () => { }
});