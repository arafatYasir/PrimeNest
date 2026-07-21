import { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Mail, User, Phone, Save, Lock } from "lucide-react";

const DashboardProfilePage = () => {
    const { user } = useUserContext();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        bio: "",
        profilePic: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                phone: user.phone || "",
                bio: user.bio || "",
                profilePic: user.profilePic || ""
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-text">Your Agent Profile</h1>
                <p className="text-text-secondary mt-1">Manage the informations of your agent profile.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-8">
                {/* Profile Picture Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border">
                    <div className="relative group">
                        <div className="size-24 sm:size-28 rounded-full overflow-hidden border-2 border-border bg-section flex items-center justify-center shadow-sm">
                            {formData.profilePic ? (
                                <img
                                    src={formData.profilePic}
                                    alt={formData.fullName || "Profile"}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <User className="size-12 text-text-secondary/60" />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
                        <h3 className="font-heading text-base font-semibold text-text">Profile Photo</h3>
                        <p className="text-xs text-text-secondary max-w-xs">
                            Upload a professional headshot. Recommended size is at least 400x400px.
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <Button type="button" variant="outline" size="sm" className="gap-2">
                                <Camera className="size-3.5" />
                                Change Photo
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="fullName"
                                className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                            >
                                Full Name <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    placeholder="e.g. Jane Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="pl-9"
                                />
                                <User className="size-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        {/* Email Address (Read-only) */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="email"
                                    className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                >
                                    Email Address
                                </label>
                                <span className="text-[10px] text-text-secondary/80 flex items-center gap-1 font-medium">
                                    <Lock className="size-3" /> Read-only
                                </span>
                            </div>
                            <div className="relative">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    readOnly
                                    value={formData.email}
                                    className="pl-9 bg-section/60 text-text-secondary cursor-not-allowed border-border/70 focus:border-border"
                                />
                                <Mail className="size-4 text-text-secondary/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <label
                            htmlFor="phone"
                            className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                        >
                            Phone Number <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={handleChange}
                                className="pl-9"
                            />
                            <Phone className="size-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <label
                            htmlFor="bio"
                            className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                        >
                            Bio <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                            id="bio"
                            name="bio"
                            required
                            rows={5}
                            placeholder="Write a brief professional bio introducing your experience, areas of expertise, and services to potential buyers and sellers..."
                            value={formData.bio}
                            onChange={handleChange}
                            className="py-3 resize-y leading-relaxed"
                        />
                        <p className="text-[11px] text-text-secondary">
                            Brief description for your agent profile. Displayed on public listing pages.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                        <Button type="button" size="lg" className="px-6 font-medium shadow-xs">
                            <Save className="size-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DashboardProfilePage;