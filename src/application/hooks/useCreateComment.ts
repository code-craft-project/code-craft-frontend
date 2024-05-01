import { useContext, useState } from "react";
import { challengesService } from "../services";
import ToastContext from "../contexts/ToastContext";

export default function useCreateComment(): useCreateCommentReturn {
    const [newComment, setNewComment] = useState<ChallengeCommentEntity>({ comment: '', is_reply: true });
    const [isLoading, setIsLoading] = useState(false);
    const toastManager = useContext(ToastContext);

    const createNewComment = async (challengeId: number): Promise<ChallengeCommentEntity | null> => {
        setIsLoading(true);
        const response = await challengesService.createComment(challengeId, newComment);
        if (response.status == 'success') {
            return response.data;
        } else {
            toastManager.alertError(response.message || "Something went wrong");
        }
        setIsLoading(false);
        return null;
    }

    const replyToComment = async (challengeId: number, commentId: number): Promise<ChallengeCommentEntity | null> => {
        setIsLoading(true);
        const response = await challengesService.replyTOComment(challengeId, commentId, newComment);
        if (response.status == 'success') {
            return response.data;
        } else {
            toastManager.alertError(response.message || "Something went wrong");
        }
        setIsLoading(false);
        return null;
    }

    const toggleLikeComment = async (challengeId: number, commentId: number): Promise<ChallengeCommentEntity | null> => {
        setIsLoading(true);
        const response = await challengesService.toggleLikeComment(challengeId, commentId);
        if (response.status == 'success') {
            return response.data;
        } else {
            toastManager.alertError(response.message || "Something went wrong");
        }
        setIsLoading(false);
        return null;
    }

    return {
        newComment,
        setNewComment,
        createNewComment,
        replyToComment,
        toggleLikeComment,
        isLoading
    };
}