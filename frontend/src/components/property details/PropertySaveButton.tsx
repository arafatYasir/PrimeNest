import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/useAuthStore"
import { useState, useEffect, useRef } from "react"
import { Skeleton } from "../ui/skeleton"
import { useAuth } from "@clerk/react"
import { useMutation } from "@tanstack/react-query"
import { saveProperty, unsaveProperty } from "@/lib/apiCalls"
import { toast } from "sonner"

const PropertySaveButton = ({ propertyId }: { propertyId: string }) => {
    // Get user informations
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);

    // Get the user's token
    const { getToken } = useAuth();

    // States
    const [isPropertySaved, setIsPropertySaved] = useState(false);

    // Ref to track what the server actually thinks
    const serverStateRef = useRef(false);

    // Ref to hold the debounce timeout ID
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Set the correct property status after user data updates
    useEffect(() => {
        if (user && !isLoading) {
            const isSaved = user.savedProperties.includes(propertyId);
            setIsPropertySaved(isSaved);
            serverStateRef.current = isSaved;
        }
    }, [user, isLoading, propertyId]);

    // Clean up debounce timer on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return saveProperty(propertyId!, token ?? "");
        },
        onSuccess: () => {
            // Update the server state ref
            serverStateRef.current = true;
        },
        onError: (error) => {
            toast.error(error.message, {
                className: "text-error!"
            });

            // Roll back to previous state
            setIsPropertySaved(false);
        }
    });

    const unsaveMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return unsaveProperty(propertyId!, token ?? "");
        },
        onSuccess: () => {
            // Update the server state ref
            serverStateRef.current = false;
        },
        onError: (error) => {
            toast.error(error.message, {
                className: "text-error!"
            });

            // Roll back to previous state
            setIsPropertySaved(true);
        }
    });

    const handleToggleSave = () => {
        // Check if the user is logged in
        if (!user) {
            return toast.warning("Please login to save the property", {
                className: "text-warning!"
            });
        }

        // Toggle UI optimistically
        const newState = !isPropertySaved;
        setIsPropertySaved(newState);

        // Clear any pending debounce timer
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Debounce the API call
        debounceRef.current = setTimeout(() => {
            // Only call the API if the desired state differs from server state
            if (newState !== serverStateRef.current) {
                if (newState) {
                    saveMutation.mutate();
                } else {
                    unsaveMutation.mutate();
                }
            }
        }, 300);
    }

    return (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:right-8 z-100">
            {
                isLoading ? (
                    <Skeleton className="size-8 rounded-lg" />
                ) : (
                    <Button
                        size="icon-lg"
                        variant="outline"
                        title={isPropertySaved ? "Unsave Property" : "Save Property"}
                        onClick={handleToggleSave}
                        disabled={saveMutation.isPending || unsaveMutation.isPending}
                    >
                        <Heart
                            className={
                                cn(
                                    "size-4.5",
                                    isPropertySaved && "text-error fill-error"
                                )
                            }
                            strokeWidth={1.5}
                        />
                    </Button>
                )
            }
        </div >
    )
}

export default PropertySaveButton