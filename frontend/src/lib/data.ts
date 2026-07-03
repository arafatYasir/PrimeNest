import { Heart, MapPin, MessageSquare, ShieldCheck } from "lucide-react";

export const navItems = [
    { label: "Browse Properties", to: "/properties" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
];


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
        ],
    },
];

export const propertyTypes = [
    { value: "Any", label: "Any" },
    { value: "House", label: "House" },
    { value: "Apartment", label: "Apartment" },
    { value: "Condo", label: "Condo" },
    { value: "Land", label: "Land" },
];

export const propertyStatuses = [
    { value: "Any", label: "Any" },
    { value: "Available", label: "Available" },
    { value: "Pending", label: "Pending" },
    { value: "Sold", label: "Sold" }
];

export const listingTypes = [
    { value: "Any", label: "Any" },
    { value: "For Sale", label: "For Sale" },
    { value: "For Rent", label: "For Rent" }
]

export const bedsAndBathsFilterItems = [
    { value: "Any", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
];

export const sortOptions = [
    { value: "None", label: "None" },
    { value: "Price (Low to High)", label: "Price (Low to High)" },
    { value: "Price (High to Low)", label: "Price (High to Low)" },
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
    { value: "Bedrooms", label: "Bedrooms" },
    { value: "Bathrooms", label: "Bathrooms" },
    { value: "Square Feet", label: "Square Feet" },
];