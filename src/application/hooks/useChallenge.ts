import { useContext, useState } from "react";
import { challengesService } from "../services";
import ToastContext from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

const initChallenge: ChallengeEntity = {
    title: "Two Sum",
    description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.


**Example 1**:


Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2**:

Input: nums = [3,2,4], target = 6
Output: [1,2]

**Example 3:**

Input: nums = [3,3], target = 6
Output: [0,1]

    
Constraints:
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
    
Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
`,
    is_public: true,
    level: "easy",
    topic: "Problem Solving",
    type: "in_out"
};

export default function useChallenge(): useChallengeReturn {
    const { alertError } = useContext(ToastContext);
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState<ChallengeEntity>(initChallenge);
    const [comments, setComments] = useState<ChallengeCommentEntity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);

    const getChallengeById = async (challengeId: number): Promise<void> => {
        setIsLoading(true);
        const response = await challengesService.getChallengeById(challengeId);
        if (response.status == 'success') {
            setChallenge(response.data);
        } else {
            // TODO: Handle Error
            alertError("Challenge Not Found");
            navigate("/home");
            return;
        }
        setIsLoading(false);
    }

    const getChallengeComments = async (challengeId: number): Promise<void> => {
        setIsCommentsLoading(true);
        const response = await challengesService.getComments(challengeId);
        if (response.status == 'success') {
            setComments(response.data);
        } else {
            // TODO: Handle Error
        }
        setIsCommentsLoading(false);
    }

    const appendNewComment = (comment: ChallengeCommentEntity) => {
        if (comment.is_reply) {
            setComments(state => {
                const list = [...state];
                const targetIndex = list.findIndex(c => c.id == comment.reply_to_comment_id);
                if (targetIndex != -1) {
                    list[targetIndex].replies_details?.push(comment);
                }

                return list;
            });
        } else {
            setComments(state => ([...state, comment]));
        }
    }

    const likeComment = (commentId: number, didLike: boolean): void => {
        setComments(state => {
            const list = [...state];
            const targetIndex = list.findIndex(c => c.id == commentId);
            console.log("list[targetIndex]:", list[targetIndex]);
            if (targetIndex != -1) {
                if (didLike) {
                    list[targetIndex].likes = (list[targetIndex].likes as number) + 1;
                } else {
                    list[targetIndex].likes = (list[targetIndex].likes as number) - 1;
                }
            }

            return list;
        });

    }

    return {
        challenge, getChallengeById,
        comments, getChallengeComments,
        isLoading, isCommentsLoading,
        appendNewComment,
        likeComment
    };
}