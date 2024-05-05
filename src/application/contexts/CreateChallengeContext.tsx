import { createContext, useState } from "react";
// type testCasesState = { inputs: [{ input: string, type: string }], output: string }
interface CreateChallengeContextValue {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    description: string ;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    title: string ;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    topic: ChallengeTopic ;
    setTopic: React.Dispatch<React.SetStateAction<ChallengeTopic>>;
    level: ChallengeLevel ;
    setLevel: React.Dispatch<React.SetStateAction<ChallengeLevel>>;
    is_public: boolean ;
    setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
    type: "in_out" | "project" ;
    setType: React.Dispatch<React.SetStateAction<"in_out" | "project">>;
    testCases: TestCaseEntity[] ;
    setTestCases: React.Dispatch<React.SetStateAction<TestCaseEntity[]>>;
}

export const CreateChallengeContext = createContext<CreateChallengeContextValue >({
    step: 1,
    setStep: () => {},
    description: '',
    setDescription: () => {},
    title: '',
    setTitle: () => {},
    topic: 'algorithms',
    setTopic: () => {},
    level: 'hard',
    setLevel: () => {},
    is_public: true,
    setIsPublic: () => {},
    type: 'project',
    setType: () => {},
    testCases: [{ inputs: [{ input: '', type: 'number',index: 1 }], output: '' }],
    setTestCases: () => {},
});
export const CreateChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [step, setStep] = useState<number>(1);
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [topic, setTopic] = useState<ChallengeTopic>('algorithms')
    const [level, setLevel] = useState<ChallengeLevel>('hard')
    const [is_public, setIsPublic] = useState<boolean>(true)
    const [type, setType] = useState<"in_out" | "project">('project')
    const [ testCases,setTestCases ] = useState<TestCaseEntity[]>([{ inputs: [{ input: '', type: 'boolean', index:1 }], output: '' }])

    return <CreateChallengeContext.Provider value={ { step, setStep, description, setDescription, title, setTitle, topic, setTopic, level, setLevel, is_public, setIsPublic,type, setType, testCases, setTestCases } }> { children } </CreateChallengeContext.Provider>;

};