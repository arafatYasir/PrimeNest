import { useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Mail, User, Phone, Save, Lock } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

// Profile Schema
const profileSchema = z.object({
    fullName: z.string().trim().min(3, "Full name must be at least 3 characters."),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(
        /^[\d\s\-+()\.]{10,15}$/,
        "Phone number must be 10-15 characters (digits, spaces, dashes, parentheses, dots, plus sign only)"
    ),
    bio: z.string().min(80, "Bio must be at least 80 characters long."),
    profilePic: z.string().optional()
});

// Profile Type
type ProfileFormValues = z.infer<typeof profileSchema>;

const DashboardProfilePage = () => {
    // Get the user informations
    const { user } = useUserContext();

    // Profile Form State
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            bio: "",
            profilePic: ""
        }
    });

    const watchedProfilePic = watch("profilePic");
    const watchedFullName = watch("fullName");
    const watchedBio = watch("bio");
    const watchedEmail = watch("email");

    // Update form when user data loads
    useEffect(() => {
        if (user) {
            reset({
                fullName: user.fullName || "",
                email: user.email || "",
                phone: user.phone || "",
                bio: user.bio || "",
                profilePic: user.profilePic || ""
            });
        }
    }, [user, reset]);

    // Submit handler
    const onSubmit = async (data: ProfileFormValues) => {
        console.log("Form submitted with data: ", data);
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-text">Your Agent Profile</h1>
                <p className="text-text-secondary mt-1">Manage the information of your agent profile.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-8">
                {/* ---- Profile Picture ---- */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border">
                    <div className="relative group">
                        <div className="size-24 sm:size-28 rounded-full overflow-hidden border-2 border-border bg-section flex items-center justify-center shadow-xs">
                            {watchedProfilePic ? (
                                <img
                                    src={watchedProfilePic}
                                    alt={watchedFullName || "Profile Photo"}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <div className="text-4xl font-bold text-text-secondary">
                                    {watchedFullName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
                        <h3 className="font-heading text-lg font-semibold text-text">Profile Photo</h3>
                        <p className="text-sm text-text-secondary ">
                            Upload a professional headshot. Recommended size is at least 400x400px.
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <Button type="button" variant="outline" className="gap-2">
                                <Camera className="size-3.5" />
                                Change Photo
                            </Button>
                        </div>
                    </div>
                </div>

                {/* ---- Input Form ---- */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* ---- Full Name ---- */}
                        <div className="space-y-2">
                            <label
                                htmlFor="fullName"
                                className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                            >
                                Full Name <span className="text-error">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    id="fullName"
                                    placeholder="e.g. Jane Doe"
                                    {...register("fullName")}
                                    className={cn(
                                        "pl-9",
                                        errors.fullName && "border-error"
                                    )}
                                />
                                <User className="size-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* ---- Error Message ---- */}
                            {errors.fullName && <p className="text-xs text-error">{errors.fullName.message}</p>}
                        </div>

                        {/* ---- Email Address (Read-only) ---- */}
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
                                <p
                                    className={cn(
                                        "h-10 w-full min-w-0 border border-border/70 px-3.5 text-xs xs:text-sm transition-colors outline-none rounded-lg text-text-secondary flex items-center pl-9 bg-section/60 cursor-not-allowed"
                                    )}
                                >
                                    {watchedEmail}
                                </p>
                                <Mail className="size-4 text-text-secondary/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* ---- Phone Number ---- */}
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
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                {...register("phone")}
                                className={cn(
                                    "pl-9",
                                    errors.phone && "border-error"
                                )}
                            />
                            <Phone className="size-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
                    </div>

                    {/* ---- Bio ---- */}
                    <div className="space-y-2">
                        <label
                            htmlFor="bio"
                            className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                        >
                            Bio <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                            id="bio"
                            rows={5}
                            placeholder="Write a brief professional bio introducing your experience, and services to potential buyers and sellers..."
                            {...register("bio")}
                            className={cn(
                                "py-3 leading-relaxed resize-none",
                                errors.bio && "border-error"
                            )}
                        />
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                            <span>Brief description for your agent profile. Displayed on public listing pages.</span>
                            <span className="font-medium tabular-nums">
                                {watchedBio?.length || 0} characters
                            </span>
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.bio && <p className="text-xs text-error">{errors.bio.message}</p>}
                    </div>

                    {/* ---- Action Button ---- */}
                    <div className="pt-4 border-t border-border">
                        <Button type="submit" size="lg" className="px-6 font-medium shadow-xs" disabled={isSubmitting}>
                            <Save className="size-4 mr-2" />
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DashboardProfilePage;