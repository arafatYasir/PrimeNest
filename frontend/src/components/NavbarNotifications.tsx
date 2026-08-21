import { Bell } from "lucide-react"
import { Button } from "./ui/button"

const NavbarNotifications = () => {
    return (
        <div>
            <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                title="Notifications"
                className="relative size-9 rounded-full text-text-secondary hover:text-primary active:text-primary"
            >
                <Bell className="size-4 xs:size-5" strokeWidth={2.25} />
                <span className="absolute right-2.5 top-2 xs:right-1.5 xs:top-1.5 flex size-1 xs:size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75" />
                    <span className="relative inline-flex size-1 xs:size-2 rounded-full bg-error ring-2 ring-background" />
                </span>
            </Button>
        </div>
    )
}

export default NavbarNotifications