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