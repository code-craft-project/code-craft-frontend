import { useEffect, useState } from "react";
import { userAuthentication } from "../services";

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
        setUserSession(userSession);
        setIsValidSession(true);
        setIsLoading(false);
    }

    function signOut() {
        localStorage.removeItem(USER_SESSION_KEY);
        setIsValidSession(false);
    }

    return {
        isLoading,
        userSession,
        isValidSession,
        signIn,
        signOut,
    }
};
