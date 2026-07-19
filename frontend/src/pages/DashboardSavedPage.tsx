import DashboardSavedProperties from "@/components/dashboard/saved/DashboardSavedProperties"

const DashboardSavedPage = () => {
    return (
        <div>
            {/* ---- Header ---- */}
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-text">Saved Properties</h1>
                <p className="text-text-secondary mt-1">Browse and organize your saved listings.</p>
            </div>

            {/* ---- Saved Properties ---- */}
            <DashboardSavedProperties />
        </div>
    )
}

export default DashboardSavedPage