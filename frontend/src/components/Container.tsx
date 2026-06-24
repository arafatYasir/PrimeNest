import { cn } from "@/lib/utils"

const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("container mx-auto py-16 xs:py-20 sm:py-25 px-4 sm:px-6 lg:px-8", className)}>
            {children}
        </div>
    )
}

export default Container