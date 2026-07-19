import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useUserContext } from "@/context/UserContext"
import { useState } from "react"

const PropertySaveButton = ({ propertyId }: { propertyId: string }) => {
    // Get user informations
    const { user } = useUserContext();

    const [isPropertySaved, setIsPropertySaved] = useState(Boolean(user && user.savedProperties.includes(propertyId)));

    return (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:right-8 z-100">
            <Button
                size="icon-lg"
                variant="outline"
                title={isPropertySaved ? "Unsave Property" : "Save Property"}
                onClick={() => setIsPropertySaved(prev => !prev)}
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
        </div>
    )
}

export default PropertySaveButton