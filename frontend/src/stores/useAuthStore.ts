import { create } from "zustand";
import { useUser, useAuth } from "@clerk/react";
import { useEffect } from "react";
import { fetchUser } from "../lib/apiCalls";
import type { User } from "@/types/global";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    error: null,
    setUser: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));

export const useInitAuth = () => {
    const { user: clerkUser, isLoaded: isClerkLoaded, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const { setUser, setIsLoading, setError } = useAuthStore((state) => state);

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

        // Load user data
        loadUser();
    }, [isClerkLoaded, isSignedIn, getToken, setUser, setIsLoading, setError]);
};