interface UserSession {
    access_token: string;
    user?: UserEntity;
};

interface useUserSessionReturn {
    userSession: UserSession;
    userProgress: UserProgress;
    isLoading: boolean;
    isValidSession: boolean;
    signIn: (userSession: UserSession) => void;
    signOut: () => void;
    getUserProgress: () => void;
    getUserSkills: () => void;
    userSkills: SkillEntity[],
    setUserSkills: React.Dispatch<React.SetStateAction<SkillEntity[]>>
};

