import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useEffect } from "react";
import SubmissionContext from "../../../application/contexts/SubmissionContext";
import { useParams } from "react-router-dom";

export default function ChallengeSubmissions() {
    const { id } = useParams();
    const { submissions, getSubmissions } = useContext(SubmissionContext);

    useEffect(() => {
        if (id) {
            getSubmissions(parseInt(id));
        }
    }, [id]);

    const parseSubmissionContent = (submission: SubmissionEntity): ExecutionRequest => {
        return JSON.parse(submission.content);
    }

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex items-center bg-blue-800/60 rounded-lg px-4 py-1 my-2">
                <div className="flex-1 text-md text-gray-50">Status</div>
                <div className="flex-1 text-md text-gray-50">Language</div>
                <div className="flex-1 text-md text-gray-50">Memory</div>
            </div>

            {
                submissions.map((submission, index) => {
                    return (
                        <div key={index} className="w-full flex items-center px-4 py-1 mb-2">
                            <div className={`flex-1 text-sm font-medium ${submission.status == 'correct' ? "text-green-500" : "text-red-500"}`}>{submission.status == 'correct' ? "Accepted" : "Wrong Answer"}</div>
                            <div className="flex-1">
                                <div className="w-fit px-4 font-semibold text-xs bg-blue-800 rounded-full text-gray-50">{parseSubmissionContent(submission).language}</div>
                            </div>
                            <div className="flex-1 flex items-center">
                                <Icon icon="material-symbols:memory" className="text-xl" />
                                <div className="text-md text-gray-50 ml-1">49.7MB</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}