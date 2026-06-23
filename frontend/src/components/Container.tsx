const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container mx-auto py-25 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    )
}

export default Container