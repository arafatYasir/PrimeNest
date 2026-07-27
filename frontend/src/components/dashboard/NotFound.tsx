import type { LucideIcon } from "lucide-react";
import React from "react";

interface NotFoundProps {
    title: string;
    icon: LucideIcon;
    description: string;
    render?: React.ReactNode;
}

const NotFound = ({ title, icon: Icon, description, render }: NotFoundProps) => {
    return (
        <div className="flex flex-col gap-y-3 items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-xs mt-6">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                <Icon className="size-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-text">{title}</h3>
            <p className="max-w-md text-sm text-text-secondary">
                {description}
            </p>
            {render}
        </div>
    )
}

export default NotFound