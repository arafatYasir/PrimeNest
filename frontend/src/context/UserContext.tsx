import { createContext, useContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/react";
import { fetchUser } from "../lib/apiCalls";
import type { User } from "@/types/global";

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { user: clerkUser, isLoaded: isClerkLoaded, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            if (!isClerkLoaded) return;
            
            if (!isSignedIn) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const token = await getToken();
                if (token && clerkUser) {
                    const userData = await fetchUser(clerkUser.id, token);
                    setUser(userData);
                }
            } catch (e: any) {
                setError(e.message || "Failed to load user data");
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, [clerkUser, isClerkLoaded, isSignedIn, getToken]);

    return (
        <UserContext.Provider value={{ user, isLoading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};