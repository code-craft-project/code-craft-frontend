import { useEffect, useRef, useState } from "react";
import { CODE_HISTORY_KEY, cTemplate, cppTemplate, javascriptTemplate, phpTemplate, pythonTemplate } from "../consts";
import { challengesService } from "../services";

export interface useSubmissionReturn {
    sourceCode: string;
    setSourceCode: React.Dispatch<React.SetStateAction<string>>;
    language: SupportedLanguages;
    setLanguage: React.Dispatch<React.SetStateAction<SupportedLanguages>>;
    runResult: ExecutionResult;
    run: (challengeId: number) => void;
    submit: (challengeId: number) => void;
    testCases: TestCaseEntity[];
    getTestCases: (challengeId: number) => Promise<void>;
    submissions: SubmissionEntity[];
    getSubmissions: (challengeId: number) => Promise<void>;
};

export default function useSubmission(): useSubmissionReturn {
    const ws = useRef<WebSocket | null>(null);
    const [sourceCode, setSourceCode] = useState('');
    const [language, setLanguage] = useState<SupportedLanguages>('javascript');
    const [runResult, setRunResult] = useState<ExecutionResult>({ output: '', error: '' });
    const [testCases, setTestCases] = useState<TestCaseEntity[]>([]);
    const [submissions, setSubmissions] = useState<SubmissionEntity[]>([]);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:3002/");
        ws.current.onopen = () => {
            console.log("websocket:", "client connected");
        }

        ws.current.onclose = () => {
            console.log("websocket:", "client disconnected");
        }

        ws.current.onerror = (error) => {
            console.log("websocket:", "client error:", error);
        }

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data.toString()) as RealTimeMessage;
                handleRealTimeResponse(data);
            } catch (error) {
                console.log("websocket:", "onmessage: client error:", error);

            }
        }
    }, []);

    const handleRealTimeResponse = (data: RealTimeMessage) => {
        if (data.service == 'code_execution') {
            const submissionResult = data.payload as SubmissionResult;
            if (submissionResult.operation == 'run') {
                handleRunOperation(submissionResult);
            }

            if (submissionResult.operation == 'submit') {
                handleSubmitOperation(submissionResult);
            }
        }
    }

    const handleRunOperation = (submissionResult: SubmissionResult) => {
        const runOperationResult = submissionResult.payload as RunOperationResult;
        setTestCases(oldTestCases => {
            const updatedTestCases = [...oldTestCases];
            const index = updatedTestCases.findIndex(e => e.id == runOperationResult.testCase.id);
            if (index != -1) {
                updatedTestCases[index].output_result = runOperationResult.executionResult.output;

                try {
                    const output = JSON.stringify(JSON.parse(updatedTestCases[index].output));
                    const outputResult = JSON.stringify(JSON.parse(updatedTestCases[index].output_result as string));
                    updatedTestCases[index].run_result = (output == outputResult) ? 'correct' : 'wrong';
                } catch (err) {
                    updatedTestCases[index].run_result = 'wrong';
                }
            }

            return updatedTestCases;
        });

        setRunResult(runOperationResult.executionResult);
    }

    const handleSubmitOperation = (submissionResult: SubmissionResult) => {
        const submitOperationResult = submissionResult.payload as SubmitOperationResult;
        if (submitOperationResult.submission.status == 'correct') {
            setTestCases(oldTestCases => {
                const updatedTestCases = [...oldTestCases];
                for (let i = 0; i < updatedTestCases.length; i++) {
                    updatedTestCases[i].output_result = updatedTestCases[i].output;
                    updatedTestCases[i].run_result = 'correct';
                }

                return updatedTestCases;
            });

        } else {
            setTestCases(oldTestCases => {
                const updatedTestCases = [...oldTestCases];

                // Check if the test case exists
                const index = updatedTestCases.findIndex(e => e.id == submitOperationResult.testCase?.id);
                if (index != -1) {
                    if (submitOperationResult.executionResult.output.slice(-1) == '\n') {
                        updatedTestCases[index].output_result = submitOperationResult.executionResult.output.slice(0, -1);
                    } else {
                        updatedTestCases[index].output_result = submitOperationResult.executionResult.output;
                    }

                    updatedTestCases[index].run_result = (updatedTestCases[index].output.toString() == updatedTestCases[index].output_result?.toString()) ? 'correct' : 'wrong';
                } else {
                    const testCase = submitOperationResult.testCase;
                    if (testCase) {
                        if (submitOperationResult.executionResult.output.slice(-1) == '\n') {
                            testCase.output_result = submitOperationResult.executionResult.output.slice(0, -1);
                        } else {
                            testCase.output_result = submitOperationResult.executionResult.output;
                        }

                        testCase.run_result = (testCase.output.toString() == testCase.output_result?.toString()) ? 'correct' : 'wrong';
                        updatedTestCases.push(testCase);
                    }
                }

                return updatedTestCases;
            });

        }
    }

    const getSourceCodeParams = (testCases: TestCaseEntity[]): string => {
        let params = '';

        switch (language) {
            case 'javascript':
                if (testCases.length > 0) {
                    const inputs = testCases[0].inputs;
                    inputs?.forEach((_, index) => {
                        params += `arg${index}`;
                        if (index != inputs.length - 1) {
                            params += ', ';
                        }
                    });
                }
                return params;
            case 'c':
                if (testCases.length > 0) {
                    const inputs = testCases[0].inputs;
                    inputs?.forEach((input, index) => {
                        if (input.type == "string") {
                            params += `char* arg${index}`;
                        }
                        if (input.type == "number") {
                            params += `int arg${index}`;
                        }
                        if (input.type == "boolean") {
                            params += `bool arg${index}`;
                        }
                        if (input.type == "array_of_numbers") {
                            params += `int arg${index}[]`;
                        }
                        if (input.type == "array_of_strings") {
                            params += `char* arg${index}[]`;
                        }
                        if (input.type == "array_of_booleans") {
                            params += `bool arg${index}[]`;
                        }
                        if (index != inputs.length - 1) {
                            params += ', ';
                        }
                    });
                }
                return params;
            case 'c++':
                if (testCases.length > 0) {
                    const inputs = testCases[0].inputs;
                    inputs?.forEach((input, index) => {
                        if (input.type == "string") {
                            params += `char* arg${index}`;
                        }
                        if (input.type == "number") {
                            params += `int arg${index}`;
                        }
                        if (input.type == "boolean") {
                            params += `bool arg${index}`;
                        }
                        if (input.type == "array_of_numbers") {
                            params += `int arg${index}[]`;
                        }
                        if (input.type == "array_of_strings") {
                            params += `char* arg${index}[]`;
                        }
                        if (input.type == "array_of_booleans") {
                            params += `bool arg${index}[]`;
                        }
                        if (index != inputs.length - 1) {
                            params += ', ';
                        }
                    });
                }
                return params;
            case 'php':
                if (testCases.length > 0) {
                    const inputs = testCases[0].inputs;
                    inputs?.forEach((_, index) => {
                        params += `$arg${index}`;
                        if (index != inputs.length - 1) {
                            params += ', ';
                        }
                    });
                }
                return params;
            case 'python':
                if (testCases.length > 0) {
                    const inputs = testCases[0].inputs;
                    inputs?.forEach((_, index) => {
                        params += `arg${index}`;
                        if (index != inputs.length - 1) {
                            params += ', ';
                        }
                    });
                }
                return params;
        }
        return '';
    }

    const getSourceCodeParamsComment = (testCases: TestCaseEntity[]): string => {
        let params = '@params\n';
        if (testCases.length > 0) {
            const inputs = testCases[0].inputs;
            inputs?.forEach((input, index) => {
                params += `\t@arg${index} ${input.type}\n`;
            });
        }
        return params;
    }

    const createStartTemplate = (testCases: TestCaseEntity[]): void => {
        switch (language) {
            case 'javascript':
                setSourceCode(javascriptTemplate.replace("INPUTS", getSourceCodeParams(testCases)).replace("@params", getSourceCodeParamsComment(testCases)));
                break;
            case 'c':
                setSourceCode(cTemplate.replace("INPUTS", getSourceCodeParams(testCases)).replace("@params", getSourceCodeParamsComment(testCases)));
                break;
            case 'c++':
                setSourceCode(cppTemplate.replace("INPUTS", getSourceCodeParams(testCases)).replace("@params", getSourceCodeParamsComment(testCases)));
                break;
            case 'php':
                setSourceCode(phpTemplate.replace("INPUTS", getSourceCodeParams(testCases)).replace("@params", getSourceCodeParamsComment(testCases)));
                break;
            case 'python':
                setSourceCode(pythonTemplate.replace("INPUTS", getSourceCodeParams(testCases)).replace("@params", getSourceCodeParamsComment(testCases)));
                break;
        }
    }

    useEffect(() => {
        createStartTemplate(testCases);
    }, [language]);

    const run = (challengeId: number): void => {
        const submissionRequest: SubmissionRequest = { challengeId, operation: 'run', payload: { language, sourceCode } };
        const realTimeMessage: RealTimeMessage = { service: 'code_execution', payload: submissionRequest };
        ws.current?.send(JSON.stringify(realTimeMessage));
    }

    const submit = (challengeId: number): void => {
        const submissionRequest: SubmissionRequest = { challengeId, operation: 'submit', payload: { language, sourceCode } };
        const realTimeMessage: RealTimeMessage = { service: 'code_execution', payload: submissionRequest };
        ws.current?.send(JSON.stringify(realTimeMessage));
    }

    const getTestCases = async (challengeId: number): Promise<void> => {
        const response = await challengesService.getTestCasesByChallengeId(challengeId);
        if (response.status == 'success') {
            setTestCases(response.data);
            const codeHistory = localStorage.getItem(CODE_HISTORY_KEY);
            if (codeHistory) {
                const result = JSON.parse(codeHistory) as CodeHistory;
                if (challengeId == result.challenge_id) {
                    setSourceCode(result.sourceCode);
                    setLanguage(result.language);
                    return;
                }
            }
            createStartTemplate(response.data);
        } else {
            // TODO: Handle Error
        }
    }

    const getSubmissions = async (challengeId: number): Promise<void> => {
        const response = await challengesService.getSubmissions(challengeId);
        if (response.status == 'success') {
            setSubmissions(response.data);
        } else {
            console.log({ response });
            // TODO: Handle Error
        }
    }

    return {
        sourceCode, setSourceCode,
        language, setLanguage,
        runResult, run, submit,
        testCases, getTestCases,
        submissions, getSubmissions
    };
}