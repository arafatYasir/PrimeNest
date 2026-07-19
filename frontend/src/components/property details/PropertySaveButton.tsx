import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useUserContext } from "@/context/UserContext"
import { useState, useEffect } from "react"
import { Skeleton } from "../ui/skeleton"
import { useAuth } from "@clerk/react"
import { useMutation } from "@tanstack/react-query"
import { saveProperty } from "@/lib/apiCalls"
import { toast } from "sonner"

const PropertySaveButton = ({ propertyId }: { propertyId: string }) => {
    // Get user informations
    const { user, isLoading } = useUserContext();

    // Get the user's token
    const { getToken } = useAuth();

    // States
    const [isPropertySaved, setIsPropertySaved] = useState(Boolean(user && user.savedProperties.includes(propertyId)));

    useEffect(() => {
        if (user) {
            setIsPropertySaved(user.savedProperties.includes(propertyId));
        }
    }, [user, propertyId]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return saveProperty(propertyId, token);
        },
        onError: (error) => {
            toast.error(error.message, {
                className: "text-error!"
            });

            // Roll back to previous state
            setIsPropertySaved(false);
        },
        onSuccess: (data) => {
            toast.success(data.message, {
                className: "text-success!"
            });
        }
    });

    const handleSaveProperty = () => {
        // Check if the user is logged in
        if (!user) {
            return toast.warning("Please login to save the property", {
                className: "text-warning!"
            });
        }

        // Update the state optimistically
        setIsPropertySaved(true);

        // Save the property in database
        saveMutation.mutate();
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
                        onClick={handleSaveProperty}
                        disabled={saveMutation.isPending}
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