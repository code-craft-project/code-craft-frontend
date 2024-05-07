type ChallengeLevel = 'hard' | 'medium' | 'easy';
type ChallengeStatus = "done" | "not started" | "wrong answer";
type ChallengeType = 'in_out' | 'project';

interface ChallengeEntity {
    id?: number;
    title: string;
    description: string;
    topic: ChallengeTopic;
    level: ChallengeLevel;
    is_public: boolean;
    type: ChallengeType;
    creator_id?: number;
    creator?: UserEntity;
    comments?: number;
    submissions?: number;
    status?: ChallengeStatus; // TODO: Make sure to update this property when fetching challenges.
    score?: number;
};

interface TestCase {
    input: string;
    type: string;
    output: string;
    newInput: string;
}
interface useChallengeReturn {
    challenge: ChallengeEntity;
    comments: ChallengeCommentEntity[];
    isLoading: boolean;
    isCommentsLoading: boolean;
    getChallengeById: (challengeId: number) => Promise<void>;
    getChallengeComments: (challengeId: number) => Promise<void>;
    appendNewComment: (comment: ChallengeCommentEntity) => void;
    likeComment: (commentId: number, didLike: boolean) => void;
}

interface useChallengesReturn {
    challenges: ChallengeEntity[];
    filtredChallenges: ChallengeEntity[];
    isChallengesLoading: boolean;
    getChallenges: () => void;
    getChallengesByTopic: (topic: ChallengeTopic) => void;
    filterChallenges: (challengeFilters: ChallengeFilters) => void;
}

type ChallengeLevelColor = {
    [key in ChallengeLevel]: string;
};

type ChallengeTopic = 'all topics' | 'problem solving' | 'algorithms' | 'data structures' | 'databases';

interface ChallengeFilters {
    difficulty: ChallengeLevel[];
};

interface useCreateChallengeReturn {
    challenge: ChallengeEntity;
    setChallenge: React.Dispatch<React.SetStateAction<ChallengeEntity>>;
    createOrganizationChallenge: (organizationId: number) => Promise<ChallengeEntity | null>;
    createEventChallenge: (eventId: number) => Promise<ChallengeEntity | null>;
    testCases: TestCaseEntity[];
    setTestCases: React.Dispatch<React.SetStateAction<TestCaseEntity[]>>;
    getTestCases: (challengeId: number) => Promise<void>;
    testCaseFile: File | null;
    setTestCaseFile: React.Dispatch<React.SetStateAction<File | null>>;
    resetChallenge: () => void;
};