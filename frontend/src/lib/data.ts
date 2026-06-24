import { Heart, MapPin, MessageSquare, ShieldCheck } from "lucide-react";

export const FEATURES = [
    {
        icon: MapPin,
        title: "Interactive Map Search",
        description:
            "Browse properties directly on an interactive map. Filter by location, price, and type to find your perfect home in seconds.",
    },
    {
        icon: MessageSquare,
        title: "Seamless Negotiations",
        description:
            "Send purchase proposals and negotiate directly with sellers through private messaging. Close deals faster, all in one place.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Transactions",
        description:
            "Every listing is admin-verified before going live. Pay and receive payments securely with built-in transaction protection.",
    },
    {
        icon: Heart,
        title: "Save & Compare Favorites",
        description:
            "Bookmark properties you love and compare them side by side. Build your shortlist and never lose track of a listing that caught your eye.",
    }
];

export const FOOTER_COLUMNS = [
    {
        title: "Browse",
        links: [
            { label: "All Properties", href: "/properties" },
            { label: "Houses", href: "/properties" },
            { label: "Apartments", href: "/properties" },
            { label: "Condos", href: "/properties" },
            { label: "Lands", href: "/properties" },
        ],
    },
    {
        title: "For Sellers",
        links: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Manage Listings", href: "/dashboard" },
            { label: "Lead Inbox", href: "/dashboard" },
        ],
    },
    {
        title: "Account",
        links: [
            { label: "My Profile", href: "/profile" },
            { label: "Saved Properties", href: "/saved" },
            { label: "Sign In", href: "/sign-in" },
        ],
    },
];