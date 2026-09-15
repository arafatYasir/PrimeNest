import { MessageSquare } from "lucide-react"

const DashboardInboxEmptyState = () => {
    return (
        <div className="flex h-full flex-col items-center px-8 py-20 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-section">
                <MessageSquare className="size-6 text-text-secondary" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-text">
                No conversations yet
            </h3>

            <p className="mt-1.5 max-w-55 text-xs leading-relaxed text-text-secondary">
                Start a chat by visiting a property listing.
            </p>
        </div>
    )
}

export default DashboardInboxEmptyState