import { Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

interface SellerInfo {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
    profilePic?: string;
    bio?: string;
    createdAt: string;
    updatedAt: string;
}

export default function SellerInformations({ seller }: { seller: SellerInfo }) {
    if (!seller) return null;

    const {
        fullName,
        email,
        phone,
        profilePic,
        bio,
        createdAt,
    } = seller;

    const memberSince = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
    }).format(new Date(createdAt));

    return (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4 sticky top-[65px]">
            {/* ---- Profile Header ---- */}
            <div className="flex items-center gap-4">
                {profilePic ? (
                    <div className="size-15 overflow-hidden border border-border rounded-full">
                        <img
                            src={profilePic}
                            alt={fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex size-15 items-center justify-center rounded-full bg-section border border-border text-text-secondary font-bold text-2xl">
                        {fullName.charAt(0)}
                    </div>
                )}

                <div>
                    <h4 className="font-semibold text-text text-lg leading-tight">
                        {fullName}
                    </h4>
                    <span className="text-sm text-text-secondary font-medium flex items-center gap-1 mt-1">
                        <Calendar className="size-3.5" />
                        Member since {memberSince}
                    </span>
                </div>
            </div>

            {/* ---- Bio Section ---- */}
            {(bio && bio.trim() !== "") && (
                <p className="text-sm text-text-secondary">
                    {bio.trim()}
                </p>
            )}

            {/* ---- Contact Details ---- */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary hover:text-text transition-colors">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-section border border-border/50">
                        <Mail className="size-4 text-secondary" />
                    </div>
                    <span className="font-medium truncate">{email}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-text-secondary hover:text-text transition-colors">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-section border border-border/50">
                        <Phone className="size-4 text-secondary" />
                    </div>
                    <span className="font-medium">
                        {phone && phone.trim() !== "" ? phone : "Not Provided"}
                    </span>
                </div>
            </div>

            {/* ---- Action Buttons ---- */}
            <div className="pt-2 space-y-2.5">
                <Button
                    size="lg"
                    className="w-full h-10"
                >
                    <MessageSquare className="size-4 mr-1" />
                    Contact Agent
                </Button>
            </div>
        </div>
    );
}