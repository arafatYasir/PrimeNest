import { useUserContext } from "@/context/UserContext"
import { useEffect, useState } from "react";
import { profileSchema } from "@/lib/validations";

const DashboardAddPropertyPage = () => {
    const [isAllowed, setIsAllowed] = useState(false);

    // Get the user information
    const { user } = useUserContext();

    // Update propety adding permission based on user data
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

    console.log(isAllowed);

    return (
        <div className="space-y-6 max-w-4xl">
            {/* ---- Header ---- */}
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-text">Add New Property</h1>
                <p className="text-text-secondary mt-1">Fill in the details below to list your brand new property.</p>
            </div>

        </div>
    )
}

export default DashboardAddPropertyPage