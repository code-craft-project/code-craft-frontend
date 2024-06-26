import { useEffect, useState } from "react";
import { axiosHttp, userAuthentication, usersService } from "../services";

const USER_SESSION_KEY = "user_session";

export default function useUserSession(): useUserSessionReturn {
    const [isLoading, setIsLoading] = useState(true);
    const [isValidSession, setIsValidSession] = useState(false);
    const [userSession, setUserSession] = useState<UserSession>({
        access_token: "",
        user: {
            username: "",
            first_name: "",
            last_name: "",
            email: ""
        }
    });
    const [userSkills, setUserSkills] = useState<SkillEntity[]>([])

    const [userProgress, setUserProgress] = useState<UserProgress>({
        correct_easy_submissions: 0,
        correct_hard_submissions: 0,
        correct_medium_submissions: 0,
        total_easy_submissions: 0,
        total_hard_submissions: 0,
        total_medium_submissions: 0,
        total_correct_submissions: 0,
        total_submissions: 0
    });

    useEffect(() => {
        fetchUserSession();
    }, []);

    const fetchUserSession = async () => {
        setIsLoading(true);
        const accessToken = getAccessToken()
        if (accessToken) {
            try {
                const response = await userAuthentication.currentUser();
                if (response.status === "success") {
                    setUserSession(state => ({ ...state, access_token: accessToken, user: response.data }));
                    setIsValidSession(true);
                } else {
                    setIsValidSession(false);
                    console.error('Token expired:', response.message);
                }
            } catch (error) {
                setIsValidSession(false);
                console.error('Error fetching user:', error);
            }
        } else {
            setIsValidSession(false);
        }
        setIsLoading(false);
    };

    function getAccessToken() {
        let userSession = localStorage.getItem(USER_SESSION_KEY);
        if (userSession) {
            return userSession;
        }
        return null;
    }

    function signIn(userSession: UserSession) {
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(userSession));
        axiosHttp.reload();
        setUserSession(userSession);
        setIsValidSession(true);
        setIsLoading(false);
    }

    function signOut() {
        localStorage.removeItem(USER_SESSION_KEY);
        setIsValidSession(false);
    }

    const getUserProgress = async () => {
        const response = await usersService.getUserProgress();
        if (response.status == 'success') {
            setUserProgress(response.data);
        } else {
            // TODO: Handle Errors
        }
    }

    const getUserSkills = async () => {
        const response = await usersService.getUserSkills();
        if (response.status == 'success') {
            setUserSkills(response.data);
        } else {
            // TODO: Handle Errors
        }
    }

    return {
        isLoading,
        userSession,
        isValidSession,
        signIn,
        signOut,
        userProgress,
        getUserProgress,
        getUserSkills,
        userSkills,
        setUserSkills,
    }
};
