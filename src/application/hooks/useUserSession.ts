import {  useEffect, useState } from "react";
import { userAuthentication } from "../services";

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

    useEffect(() => {
        
        fetchUserSession();   
    }, []);
    
    const fetchUserSession = async () => {
        const accessToken = getAccessToken()
        if (accessToken) {
            try {
                const response = await userAuthentication.currentUser();
                if (response.status === "success") {
                    setUserSession(state => ({ ...state, access_token: accessToken, user: response.data }));
                } else {
                    console.error('Token expired:', response.message);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    };
    
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
