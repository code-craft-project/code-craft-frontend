type ChallengeLevel = 'Hard' | 'Medium' | 'Easy'  ;
type ChallengeStatus = "Done" | "Not Started"
interface ChallengeEntity {
    id?: number;
    title: string;
    description: string;
    topic: string;
    level: ChallengeLevel;
    is_public: boolean;
    type: "in_out" | "project";
    creator_id?: number;
    creator?: UserEntity;
    comments?: number;
    submissions?: number;
    score: number;
    status: ChallengeStatus; // TODO: Make sure to update this property when fetching challenges.
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

type ChallengeLevelColor = {
    [key in ChallengeLevel]: string;
};