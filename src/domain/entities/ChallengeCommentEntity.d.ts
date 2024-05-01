interface ChallengeCommentEntity {
    id?: number;
    comment: string;
    user_id?: number;
    user?: UserEntity;
    challenge_id?: number;
    is_reply: boolean;
    reply_to_comment_id?: number;
    likes?: number;
    replies?: number;
    replies_details?: ChallengeCommentEntity[];
    didLike?: boolean;
    created_at?: string;
};

interface useCreateCommentReturn {
    newComment: ChallengeCommentEntity;
    setNewComment: React.Dispatch<React.SetStateAction<ChallengeCommentEntity>>;
    createNewComment: (challengeId: number) => Promise<ChallengeCommentEntity | null>;
    replyToComment: (challengeId: number, commentId: number) => Promise<ChallengeCommentEntity | null>;
    toggleLikeComment: (challengeId: number, commentId: number) => Promise<ChallengeCommentEntity | null>;
    isLoading: boolean;
};