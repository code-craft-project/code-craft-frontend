type ChallengeLevel = 'easy' | 'medium' | 'hard';

interface ChallengeEntity {
    id?: number;
    title: string;
    description: string;
    topic: string;
    level: ChallengeLevel;
    is_public: boolean;
    type: "in_out" | "project";
    creator_id?: number;
};

interface TestCase {
    input: string;
    type: string;
    output: string;
    newInput: string;
}
interface useChallengeReturn {
    challenge: ChallengeEntity;
    isLoading: boolean;
    getChallengeById: (challengeId: number) => Promise<void>;
}