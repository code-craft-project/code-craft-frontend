import { useParams } from "react-router-dom";
import ChallengeComment from "./ChallengeComment";
import { useContext, useEffect } from "react";
import ChallengeContext from "../../../application/contexts/ChallengeContext";

export default function ChallengeComments() {
    const { id } = useParams();

    const { comments, getChallengeComments } = useContext(ChallengeContext);

    useEffect(() => {
        if (id) {
            getChallengeComments(parseInt(id));
        }
    }, [id]);


    return (
        <div className="w-full flex flex-col pb-16">
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