import type React from "react";

interface DashboardErrorProps {
    title: string;
    render?: React.ReactNode;
}

const DashboardError = ({ title, render }: DashboardErrorProps) => {
    return (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-error/20 bg-error/5 p-4">
            <p className="text-error text-sm font-medium">{title}</p>

            {render}
        </div >
    )
}

export default DashboardError