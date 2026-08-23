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

/// why do we have to pass the setter functions as the dependency of useEffect? Because the setter function values are never changed so what is the point of it?

// sometimes I see we need to do `useAuthStore((state) => state.user)` to get the value of something. Like we have to pass a callback function to access the state. But other times I see that in /src/components/property details/PropertySaveButton.tsx we are doing only `useAuthStore()` to get data why is that so? What is the difference? How is both working?