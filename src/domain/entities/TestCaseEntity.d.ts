type TestCaseRunResult = 'correct' | 'wrong';

interface TestCaseEntity {
    id?: number;
    challenge_id?: number;
    output: string;
    created_at?: string;
    updated_at?: string;
    inputs?: TestCaseInputEntity[];
    run_result?: TestCaseRunResult;
    output_result?: string;
};

interface useTestCasesReturn {
    testCases: TestCaseEntity[];
    setTestCases: React.Dispatch<React.SetStateAction<TestCaseEntity[]>>
    createTestCases: (challenge_id: number) => Promise<CreateTestCasesResponse>
}

interface CreateTestCasesResponse {
    data?: TestCaseEntity[]
    status?: 'success' | 'error'
    message?: string
}