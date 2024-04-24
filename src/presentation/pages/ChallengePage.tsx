import { Icon } from "@iconify/react/dist/iconify.js";
import ChallengeBox from "../components/challenge_page/ChallengeBox";
import CodeEditor from "../components/challenge_page/CodeEditor";
import ExecutionResult from "../components/challenge_page/ExecutionResult";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useChallenge from "../../application/hooks/useChallenge";
import LoadingIndicator from "../components/LoadingIndicator";

const challenge: ChallengeEntity = {
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

export default function ChallengePage() {
    const { id } = useParams();
    const { isLoading, challenge, getChallengeById } = useChallenge();


    useEffect(() => {
        if (id) {
            getChallengeById(parseInt(id));
        }
    }, [id]);

    return (
        <div className="w-full h-screen flex flex-col items-center overflow-auto bg-gray-950">
            <div className="w-full flex items-center justify-between py-2 px-4">
                <div className="w-1/3 flex items-center justify-start">
                    <div className="h-10 w-10 bg-gray-800 rounded-full mr-2"></div>
                    <Icon icon="icon-park-solid:paragraph-triangle" />
                    <div className="ml-2 text-sm font-semibold">{challenge.title} - {challenge.topic}</div>
                </div>

                <div className="w-1/3 flex items-center justify-center">
                    <div className="flex items-center text-gray-50 bg-gray-900 rounded-l-lg py-2 px-4">
                        <Icon icon="gravity-ui:play-fill" />
                        <div className="text-sm font-semibold ml-2">Run</div>
                    </div>
                    <div className="flex items-center text-green-500 bg-gray-900 rounded-r-lg py-2 px-4 ml-px">
                        <Icon icon="mingcute:upload-3-line" />
                        <div className="text-sm font-semibold ml-2">Submit</div>
                    </div>
                </div>

                <div className="w-1/3 flex items-center justify-end">
                    <div className="h-8 w-8 bg-gray-900 rounded-full"></div>
                    <div className="text-gray-50 text-sm font-semibold ml-2">@username</div>
                </div>
            </div>

            {
                isLoading ? (
                    <div className="w-full flex items-center justify-center flex-grow">
                        <LoadingIndicator />
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-between flex-grow p-4 overflow-auto">
                        <div className="w-1/2 h-full px-1 overflow-auto">
                            <ChallengeBox challenge={challenge} />
                        </div>

                        <div className="w-1/2 h-full px-1">
                            <div className="w-full h-full">
                                <div className="w-full h-1/2 pb-1">
                                    <CodeEditor />
                                </div>
                                <div className="w-full h-1/2 pt-1">
                                    <ExecutionResult />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}