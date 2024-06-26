import { useContext, useEffect } from "react";
import UserSessionContext from "../../application/contexts/UserSessionContext";
import LoadingIndicator from "./LoadingIndicator";

interface ProtectedRouteProps {
    children: React.ReactNode;
};

export default function ProtectedAuthenticatedRoute({ children }: ProtectedRouteProps) {
    const { isLoading, isValidSession } = useContext(UserSessionContext);

    useEffect(() => {
        
        if (!isLoading && !isValidSession) {
            setTimeout(() => {
                window.location.href = '/sign-in';
            }, 1000);
        }
    }, [isLoading, isValidSession]);

    if (isLoading) {
        return (
            <LoadingIndicator />
        )
    }

    if (!isValidSession) {
        return (
            <div className="text-gray-50 h-screen bg-black w-full flex items-center justify-center">
                <a className="text-blue-700 hover:text-blue-600 hover:underline duration-300 cursor-pointer mr-2" href="/sign-in"> Click here to redirect manually,</a>
                Redirecting to Sign In Page...
            </div>
        )
    }

    return <>{children}</>
}