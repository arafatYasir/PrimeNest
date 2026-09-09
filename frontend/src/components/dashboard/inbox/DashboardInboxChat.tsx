const DashboardInboxChat = () => {
    return (
        <div className="flex-3 min-h-screen bg-card rounded-r-xl flex flex-col items-center justify-center p-8">
            <div className="mb-8">
                <img
                    src="/images/two_people_chatting.webp"
                    width={200}
                    height={200}
                    alt="Two people chatting"
                    className="size-50 pointer-events-none"
                    fetchPriority="high"
                />
            </div>
            
            <h2 className="font-heading text-text text-2xl font-bold mb-3">
                Let's Talk About Properties
            </h2>
            
            <p className="text-text-secondary text-base text-center max-w-[320px] leading-relaxed">
                Select a conversation from the left sidebar to discuss details directly with our agents.
            </p>
        </div>
    )
}

export default DashboardInboxChat