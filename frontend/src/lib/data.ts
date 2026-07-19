import { Heart, MapPin, MessageSquare, ShieldCheck, Clock, Mail, Phone, AlertCircle, Users, PlusCircle, Building2 } from "lucide-react";

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
            { label: "Houses", href: "/properties?propertyType=House" },
            { label: "Apartments", href: "/properties?propertyType=Apartment" },
            { label: "Condos", href: "/properties?propertyType=Condo" },
            { label: "Lands", href: "/properties?propertyType=Land" },
        ],
    },
    {
        title: "For Sellers",
        links: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Manage Listings", href: "/dashboard/properties" },
            { label: "Lead Inbox", href: "/dashboard/inbox" },
        ],
    },
    {
        title: "Account",
        links: [
            { label: "My Profile", href: "/dashboard/profile" },
            { label: "Saved Properties", href: "/dashboard/saved" },
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

export const contactInfos = [
    {
        icon: Phone,
        title: "Call or WhatsApp",
        subtitle: "Mon-Fri from 9am to 6pm",
        informations: [
            { type: "phone", value: "+1 (800) 555-0199" },
            { type: "phone", value: "+1 (800) 555-0198" }
        ]
    },
    {
        icon: Mail,
        title: "Email Support",
        subtitle: "We response within 24 hours",
        informations: [
            { type: "mail", value: "support@primenest.com" },
            { type: "mail", value: "sales@primenest.com" }
        ]
    },
    {
        icon: MapPin,
        title: "Headquarters Office",
        subtitle: "Visit our physical workspace",
        informations: [
            { type: "text", value: "100 Pine Street, Suite 1200 San Francisco, CA 94111" }
        ]
    },
    {
        icon: Clock,
        title: "Operating Hours",
        subtitle: "Our digital channels are open 24/7",
        informations: [
            { type: "text", value: "Support: 24/7 Availability" },
            { type: "text", value: "Sales Office: 9 AM - 6 PM EST" }
        ]
    }
];

export const aboutUsProblems = [
    {
        icon: AlertCircle,
        title: "Uncertainty",
        description: "Not knowing whether online property listings are genuine."
    },
    {
        icon: AlertCircle,
        title: "Unreliable Info",
        description: "Difficulty finding complete and reliable information."
    },
    {
        icon: AlertCircle,
        title: "Scattered Chat",
        description: "Communication scattered across different channels."
    },
    {
        icon: AlertCircle,
        title: "Stressful Process",
        description: "A journey that often feels complex and overwhelming."
    },
];

export const aboutUsCorePillars = [
    {
        icon: ShieldCheck,
        title: "Verified Listings",
        description: "Every property submitted to PrimeNest goes through an administrative review before appearing on the marketplace, helping maintain a more trustworthy browsing experience."
    },
    {
        icon: MessageSquare,
        title: "Transparent Communication",
        description: "Private conversations between buyers and sellers allow negotiations to happen directly, making discussions clearer and more efficient."
    },
    {
        icon: Users,
        title: "Built for Both Buyers & Sellers",
        description: "PrimeNest is designed as a balanced marketplace where both buyers and sellers have the tools they need to make informed decisions and complete transactions with confidence."
    }
];

export const dashboardQuickActions = [
    {
        icon: PlusCircle,
        title: "Create New Property",
        description: "List a new property and reach potential buyers instantly.",
        to: "/dashboard/add-property",
    },
    {
        icon: Building2,
        title: "View All Properties",
        description: "Browse and manage all your active property listings.",
        to: "/dashboard/properties",
    },
    {
        icon: MessageSquare,
        title: "View Lead Inbox",
        description: "Check new messages and conversations from interested buyers.",
        to: "/dashboard/inbox",
    },
    {
        icon: Heart,
        title: "Saved Properties",
        description: "Revisit properties you've saved for later.",
        to: "/dashboard/saved",
    },
];