import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { userProfilePicture } from "../../../application/consts";
import { useContext, useState } from "react";
import useCreateComment from "../../../application/hooks/useCreateComment";
import ChallengeContext from "../../../application/contexts/ChallengeContext";
import UserSessionContext from "../../../application/contexts/UserSessionContext";
import ToastContext from "../../../application/contexts/ToastContext";

interface ChallengeCommentProps {
    comment: ChallengeCommentEntity;
};

export default function ChallengeComment({ comment }: ChallengeCommentProps) {
    const { newComment, setNewComment, replyToComment, toggleLikeComment } = useCreateComment();
    const { appendNewComment, likeComment } = useContext(ChallengeContext);
    const { isValidSession } = useContext(UserSessionContext);
    const { alertError } = useContext(ToastContext);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [didLikeComment, setDidLikeComment] = useState(comment.didLike);

    const replyToAComment = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const response = await replyToComment(comment.challenge_id as number, comment.id as number);
        console.log({ response });
        if (response) {
            appendNewComment(response);
            setIsReplyOpen(false);
            setNewComment({ comment: '', is_reply: true });
        }
    }

    const toggleReplyInput = () => {
        if (!isValidSession) {
            alertError("You need to Sign In first");
            return;
        }

        setIsReplyOpen(state => !state);
    }

    const likeCommentHandler = async () => {
        if (!isValidSession) {
            alertError("You need to Sign In first");
            return;
        }

        await toggleLikeComment(comment.challenge_id as number, comment.id as number);
        likeComment(comment.id as number, !didLikeComment);
        setDidLikeComment(state => !state);
    }

    return (
        <div className="w-full flex flex-col items-start py-2 px-4">
            <div className="w-full flex flex-col">
                <div className="w-full flex items-center mt-2">
                    <div className="h-7 w-7 bg-gray-300 rounded-full">
                        <img src={comment.user?.profile_image_url || userProfilePicture} onError={(ev: any) => { ev.target.src = userProfilePicture; }} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex items-baseline ml-1">
                        <div className="text-gray-50 text-md ml-1">{comment.user?.first_name} {comment.user?.last_name}</div>
                        <div className="text-gray-400 text-xs ml-1">{moment(comment.created_at).fromNow()}</div>
                    </div>
                </div>
                <div className="w-full flex">
                    {(comment.replies_details && comment.replies_details.length > 0) && (
                        <div className="w-7 h-full flex flex-col items-center">
                            <div className="w-px h-full bg-gray-100"></div>
                        </div>
                    )}
                    <div className="flex-grow">
                        <div className="w-full mt-2 flex">
                            <div className="text-gray-300 text-xs border-1.5 border-gray-100 rounded-lg w-full py-2 px-4 whitespace-pre-wrap">
                                {comment.comment}
                            </div>
                        </div>
                        <div className="w-full flex items-center mt-4">
                            <div onClick={likeCommentHandler} className="flex items-center cursor-pointer text-gray-50 hover:text-blue-600">
                                {
                                    didLikeComment ? (
                                        <Icon icon="ph:heart-fill" />
                                    ) : (
                                        <Icon icon="ph:heart" />
                                    )
                                }
                                <div className="text-xs font-semibold ml-2">{comment.likes} Like</div>
                            </div>
                            <div onClick={toggleReplyInput} className="flex items-center cursor-pointer text-gray-50 ml-8 hover:text-gray-400">
                                <Icon icon="mage:message-round" />
                                <div className="text-xs font-semibold ml-2">{comment.replies} Reply</div>
                            </div>
                        </div>
                        <div className={`w-full ${isReplyOpen ? "max-h-16" : "max-h-0"} duration-300 overflow-hidden flex items-center my-2`}>
                            <input value={newComment.comment} onChange={(ev) => setNewComment(state => ({ ...state, comment: ev.target.value, is_reply: true }))} placeholder="Type your reply" className="flex-grow bg-blue-900 focus:bg-blue-950 rounded-lg px-4 py-2 text-sm outline-none" />
                            <div onClick={replyToAComment} className="ml-2 bg-blue-900 hover:bg-blue-800 px-8 rounded-lg text-sm uppercase py-2 font-semibold cursor-pointer">Reply</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col">
                {
                    comment.replies_details?.map((reply, index) => {
                        const isLastComment = () => {
                            return index == comment.replies_details!.length - 1;
                        }

                        return (
                            <div className="w-full flex">
                                {
                                    (comment.replies_details && comment.replies_details.length > 0) && (
                                        <div className="w-7 h-full flex flex-col items-center relative">
                                            <div className={`w-px ${isLastComment() ? "h-5" : "h-full"} bg-gray-100`}></div>
                                            <div className="w-1/2 h-px bg-gray-100 absolute top-5 left-1/2"></div>
                                        </div>
                                    )
                                }
                                <div key={index} className="flex-grow flex flex-col">
                                    <div className="w-full flex items-center mt-2">
                                        <div className="h-7 w-7 bg-gray-300 rounded-full">
                                            <img src={comment.user?.profile_image_url || userProfilePicture} onError={(ev: any) => { ev.target.src = userProfilePicture; }} className="w-full h-full object-cover rounded-full" />
                                        </div>
                                        <div className="flex items-baseline ml-1">
                                            <div className="text-gray-50 text-md ml-1">{reply.user?.first_name} {reply.user?.last_name}</div>
                                            <div className="text-gray-400 text-xs ml-1">{moment(reply.created_at).fromNow()}</div>
                                        </div>
                                    </div>
                                    <div className="pl-10 w-full mt-2">
                                        <div className="text-gray-300 text-xs border-1.5 border-gray-100 rounded-lg w-full py-2 px-4 whitespace-pre-wrap">
                                            {reply.comment}
                                        </div>
                                    </div>
                                    {/* <div className="w-full flex items-center mt-4 pl-10">
                                        <div className="flex items-center cursor-pointer text-gray-50 hover:text-blue-600">
                                            <Icon icon="ph:heart" />
                                            <div className="text-xs font-semibold ml-2">{reply.likes} Like</div>
                                        </div>
                                        <div className="flex items-center cursor-pointer text-gray-50 ml-8 hover:text-gray-400">
                                            <Icon icon="mage:message-round" />
                                            <div className="text-xs font-semibold ml-2">{reply.replies} Reply</div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}