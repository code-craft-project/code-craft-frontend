import { useState } from "react"
import { challengesService } from "../services";

export default function useChallenges(): useChallengesReturn {
    const [challenges, setChallenges] = useState<ChallengeEntity[]>([]);
    const [filtredChallenges, setFiltredChallenges] = useState<ChallengeEntity[]>([]);
    const [isChallengesLoading, setIsChallengesLoading] = useState(true);

    const getChallenges = async () => {
        setIsChallengesLoading(true);
        const response = await challengesService.getChallenges();
        if (response.status == 'success') {
            setChallenges(response.data);
        } else {
            // TODO: Handle Error
            return;
        }
        setIsChallengesLoading(false);
    }

    const getChallengesByTopic = async (topic: ChallengeTopic) => {
        setIsChallengesLoading(true);
        const response = await challengesService.getChallengesByTopic(topic);
        if (response.status == 'success') {
            setChallenges(response.data);
        } else {
            // TODO: Handle Error
            return;
        }
        setIsChallengesLoading(false);
    }

    const filterChallenges = (challengeFilters: ChallengeFilters) => {
        setFiltredChallenges(challenges.filter(c => challengeFilters.difficulty.includes(c.level.toLowerCase() as ChallengeLevel)));
    }

    return {
        challenges,
        filtredChallenges,
        isChallengesLoading,
        getChallenges,
        getChallengesByTopic,
        filterChallenges
    }
}