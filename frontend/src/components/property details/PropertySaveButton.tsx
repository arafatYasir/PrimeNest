import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const PropertySaveButton = ({ isPropertySaved }: { isPropertySaved: boolean }) => {
    return (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:right-8 z-100">
            {
                isPropertySaved ? (
                    <Button size="icon-lg" variant="outline" title="Unsave Property">
                        <Heart
                            className={cn(
                                "size-4.5",
                                "text-error fill-error"
                            )}
                            strokeWidth={1.5}
                        />
                    </Button>
                ) : (
                    <Button size="icon-lg" variant="outline" title="Save Property">
                        <Heart
                            className={
                                cn(
                                    "size-4.5"
                                )
                            }
                            strokeWidth={1.5}
                        />
                    </Button>
                )
            }
        </div>
    )
}

export default PropertySaveButton