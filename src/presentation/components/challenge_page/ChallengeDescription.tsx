import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type LevelColor = {
    [key in ChallengeLevel]: string;
};

interface ChallengeDescriptionProps {
    title: string;
    description: string;
    topic: string;
    level: ChallengeLevel;
};

export default function ChallengeDescription({ title, level, description, topic }: ChallengeDescriptionProps) {
    return (
        <div className="w-full flex flex-col">
            <div className="my-4 text-xl text-gray-50 font-semibold">{title}</div>
            <div className="text-sm text-gray-300 mb-4">{topic}</div>

            <div className={`text-sm font-semibold bg-blue-950 rounded-lg w-fit px-4 ${levelColorMap[level.toLowerCase() as ChallengeLevel]} mb-4`}>{level}</div>

            <div className={`w-full prose ${markdownStyle} pb-16`}><Markdown rehypePlugins={[rehypeRaw]} >{description}</Markdown></div>
        </div>
    )
}

const levelColorMap: LevelColor = {
    "easy": "text-green-500",
    "medium": "text-yellow-500",
    "hard": "text-red-500",
};

const markdownStyle = "prose-p:text-gray-50 prose-a:text-gray-50 prose-blockquote:text-gray-50 prose-figure:text-gray-50 prose-figcaption:text-gray-50 prose-strong:text-gray-50 prose-headings:text-gray-50 prose-em:text-gray-50 prose-kbd:text-gray-50 prose-code:text-gray-50 prose-pre:text-gray-50 prose-ol:text-gray-50 prose-ul:text-gray-50 prose-li:text-gray-50 prose-table:text-gray-50 prose-thead:text-gray-50 prose-tr:text-gray-50 prose-th:text-gray-50 prose-td:text-gray-50 prose-img:text-gray-50 prose-video:text-gray-50 prose-hr:text-gray-50 prose-lead:text-gray-50 text-gray-50"; 