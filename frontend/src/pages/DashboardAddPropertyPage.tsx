import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { profileSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, CheckCircle2, Image, User, Phone, FileText, XCircle } from "lucide-react";
import { Link } from "react-router";

const DashboardAddPropertyPage = () => {
    const [isAllowed, setIsAllowed] = useState(false);

    // Get the user information
    const { user } = useUserContext();

    // Update property adding permission based on user data
    useEffect(() => {
        if (user) {
            // Validate the fields for profile completion
            const result = profileSchema.safeParse({
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                bio: user.bio,
                profilePic: user.profilePic
            });

            setIsAllowed(result.success);
        }
    }, [user]);

    const checklistItems = [
        { key: "profilePic", label: "Profile Picture", icon: Image, value: user?.profilePic },
        { key: "fullName", label: "Full Name", icon: User, value: user?.fullName },
        { key: "phone", label: "Phone Number", icon: Phone, value: user?.phone },
        { key: "bio", label: "Bio", icon: FileText, value: user?.bio },
    ];

    return (
        <div className="space-y-6 max-w-4xl">
            {/* ---- Header ---- */}
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-text">Add New Property</h1>
                <p className="text-text-secondary mt-1">Fill in the details below to list your brand new property.</p>
            </div>

            {/* ---- Property Form / Error ---- */}
            {
                isAllowed ? (
                    <></>
                ) : (
                    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                            <AlertCircle className="size-5 text-warning shrink-0 mt-0.5" />

                            <div className="space-y-1">
                                <h3 className="font-heading font-semibold text-base">Complete your profile to list properties</h3>
                                <p className="text-sm text-amber-800/90 leading-relaxed">
                                    Before you can create and publish new property listings, we require all real estate agents to maintain a complete profile. This ensures trust and credibility with potential clients.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                Required Profile Fields Checklist
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {checklistItems.map((item) => {
                                    const Icon = item.icon;
                                    const isComplete = Boolean(item.value && String(item.value).trim().length > 0);

                                    return (
                                        <div
                                            key={item.key}
                                            className="flex items-center justify-between p-3 rounded-xl border border-border bg-section/40"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-card border border-border text-text-secondary">
                                                    <Icon className="size-4" />
                                                </div>
                                                <span className="text-sm font-medium text-text">{item.label}</span>
                                            </div>

                                            {isComplete ? (
                                                <div className="flex items-center gap-1 text-xs font-medium text-success bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                                                    <CheckCircle2 className="size-3.5" />
                                                    <span>Completed</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-xs font-medium text-error bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                                                    <XCircle className="size-3.5" />
                                                    <span>Missing</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border flex items-center justify-between flex-wrap gap-4">
                            <p className="text-xs text-text-secondary">
                                Once updated, property creation will be unlocked immediately.
                            </p>
                            <Link to="/dashboard/profile">
                                <Button size="lg" className="gap-2 font-medium shadow-xs">
                                    Complete Agent Profile
                                    <ArrowRight className="size-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default DashboardAddPropertyPage;
