type ChallengeLevel = 'hard' | 'medium' | 'easy';
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

type ChallengeLevelColor = {
    [key in ChallengeLevel]: string;
};