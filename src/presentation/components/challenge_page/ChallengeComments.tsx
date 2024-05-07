import { useParams } from "react-router-dom";
import ChallengeComment from "./ChallengeComment";
import { useContext, useEffect } from "react";
import ChallengeContext from "../../../application/contexts/ChallengeContext";
import useCreateComment from "../../../application/hooks/useCreateComment";

export default function ChallengeComments() {
    const { id } = useParams();
    const { newComment, setNewComment, createNewComment } = useCreateComment();
    const { comments, getChallengeComments, appendNewComment } = useContext(ChallengeContext);

    useEffect(() => {
        if (id) {
            getChallengeComments(parseInt(id));
        }
    }, [id]);

    const newCommentHandler = async () => {
        const comment = await createNewComment(parseInt(id || '0'));
        if (comment) {
            appendNewComment(comment);
            setNewComment(s => ({ ...s, comment: '' }));
        }
    }

    return (
        <div className="w-full flex flex-col pb-16">
            <div className="w-full flex flex-col items-center py-4">
                <input value={newComment.comment} onChange={(ev) => setNewComment(state => ({ ...state, comment: ev.target.value }))} className="bg-gray-100/10 focus:bg-gray-100/20 w-full px-4 py-2 rounded-lg outline-none" placeholder="Type comment here..." />
                <div className="w-full flex flex-col items-end">
                    <div onClick={newCommentHandler} className="w-fit px-8 py-1 rounded-lg bg-green-600 mt-4 cursor-pointer active:scale-110 duration-300 select-none">Comment</div>
                </div>
            </div>
            {
                comments.map((comment, index) => {
                    return (
                        <ChallengeComment key={index} comment={comment} />
                    )
                })
            }
        </div>
    )
}