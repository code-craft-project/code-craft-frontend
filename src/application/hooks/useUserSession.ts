import { useContext, useEffect, useState } from "react";
import UserSessionContext from "../contexts/UserSessionContext";

const ACCESS_TOKEN_KEY = "access_token";

export default function useUserSession() {

    const [userSession, setUserSession] = useState<UserSession>({
        access_token: "",
        user: {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    });
    const {user} = useContext(UserSessionContext)

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            setUserSession(state => ({ ...state, access_token: accessToken, user: user }));
        }    
    }, []);

    function saveAccessToken(userSession: UserSession){
        let { access_token } = userSession;
        localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    }

    function getAccessToken(){
        let access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if(access_token){
            return access_token;
        }
        return null;
    }

    function clearAccessToken(){
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    return {
        saveAccessToken,
        getAccessToken,
        clearAccessToken,
        userSession,
        setUserSession
    }
};
