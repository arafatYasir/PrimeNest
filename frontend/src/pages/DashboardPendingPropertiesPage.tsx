import DashboardPendingProperties from "@/components/dashboard/pending properties/DashboardPendingProperties";

const DashboardPendingPropertiesPage = () => {

    return (
        <div>
            {/* ---- Header ---- */}
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-text">Pending Properties</h1>
                <p className="text-text-secondary mt-1">Review and manage property listings pending approval.</p>
            </div>

            {/* ---- Pending Properties ---- */}
            <DashboardPendingProperties />
        </div>
    )
}

export default DashboardPendingPropertiesPage