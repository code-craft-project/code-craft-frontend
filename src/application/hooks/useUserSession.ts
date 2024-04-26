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
        const user:any = getCurrentUser()
        const accessToken = getAccessToken();
        if (accessToken && user.data) {
            setUserSession(state => ({ ...state, access_token: accessToken, user: user.data}));
        }    
    }, []);

    const getCurrentUser = async () => {
        try {
            const response = await userAuthentication.currentUser();
                if (response.status == "success") {
                    return response
                } else {
                    console.error('Token expired:', response.message);
                    return response.message
                }
        }catch (error) {
            console.log(error);
            return ('something has wrong')
        }
    }


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
