import { createContext } from "react";

export default createContext<useChallengeReturn>({
    challenge: { description: '', is_public: true, level: 'easy', title: '', topic: 'problem solving', type: 'in_out' },
    comments: [],
    isLoading: true,
    isCommentsLoading: true,
    getChallengeById: async (challengeId: number) => { challengeId; },
    getChallengeComments: async (challengeId: number) => { challengeId; },
    appendNewComment: (comment: ChallengeCommentEntity) => { comment; },
    likeComment: (commentId: number, didLike: boolean) => { commentId; didLike; }
});