import { createContext } from "react";

export default createContext<useUserSessionReturn>({
    isLoading: true,
    userSession: { access_token: '' },
    isValidSession: false,
    signOut: () => { },
    signIn: (userSession: UserSession) => { userSession; }
});
