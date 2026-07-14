import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react"
import { Link } from "react-router"

const DashboardPropertiesPage = () => {
    return (
        <div>
            {/* ---- Header ---- */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight text-text">My Properties</h1>
                    <p className="text-text-secondary mt-1">Manage all your property listings here.</p>
                </div>

                <Link to="/dashboard/add-property">
                    <Button size="lg" variant="secondary">
                        <CirclePlus className="size-4 mr-1" />
                        Add Property
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardPropertiesPage