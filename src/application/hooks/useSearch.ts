import { useState } from "react"
import { searchService } from "../services";

export default function useSearch() {
    const [query, setQuery] = useState('');
    const [jobPosts, setJobPosts] = useState<JobPostEntity[]>([]);
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [organizations, setOrganizations] = useState<OrganizationEntity[]>([]);
    const [challenges, setChallenges] = useState<ChallengeEntity[]>([]);

    const searchJobPosts = async () => {
        const res = await searchService.searchJobPosts(query);
        if (res.status == 'success') {
            setJobPosts(res.data);
        }
    }

    const searchEvents = async () => {
        const res = await searchService.searchEvents(query);
        if (res.status == 'success') {
            setEvents(res.data);
        }
    }

    const searchOrganizations = async () => {
        const res = await searchService.searchOrganizations(query);
        if (res.status == 'success') {
            setOrganizations(res.data);
        }
    }

    const searchChallenges = async () => {
        const res = await searchService.searchChallenges(query);
        if (res.status == 'success') {
            setChallenges(res.data);
        }
    }

    const resetSearchResult = () => {
        setChallenges([]);
        setJobPosts([]);
        setOrganizations([]);
        setEvents([]);
    }

    return {
        query, setQuery,
        jobPosts, events, organizations, challenges,
        searchJobPosts, searchEvents, searchOrganizations, searchChallenges,
        resetSearchResult
    }
}