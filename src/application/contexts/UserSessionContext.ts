import { createContext } from "react";

export default createContext<useUserSessionReturn>({
    isLoading: true,
    userSession: { access_token: '' },
    userProgress: {
        correct_easy_submissions: 0,
        correct_hard_submissions: 0,
        correct_medium_submissions: 0,
        total_easy_submissions: 0,
        total_hard_submissions: 0,
        total_medium_submissions: 0,
        total_correct_submissions: 0,
        total_submissions: 0
    },
    isValidSession: false,
    signOut: () => { },
    signIn: (userSession: UserSession) => { userSession; },
    getUserProgress: () => { },
    getUserSkills: () => { },
    userSkills: [],
    setUserSkills: () => { },
});
