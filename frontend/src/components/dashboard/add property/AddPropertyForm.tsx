import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Building2,
    Home,
    DollarSign,
    Maximize2,
    Bed,
    Bath,
    Calendar,
    MapPin,
    Globe,
    UploadCloud,
    Trash2,
    Sparkles,
    Tag,
    Plus,
    X,
    Check,
    Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { type PropertyFormValues, propertySchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import PropertyLocationMap from "./PropertyLocationMap";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { toast } from "sonner";
import { createProperty } from "@/lib/apiCalls";

const SUGGESTED_FEATURES = [
    "Swimming Pool",
    "Garden",
    "Garage",
    "Air Conditioning",
    "Gym",
    "Security System",
    "Solar Panels",
    "Balcony",
    "Pet Friendly",
    "High-Speed Internet"
];

const AddPropertyForm = () => {
    // States
    const [objectUrls, setObjectUrls] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [featureInput, setFeatureInput] = useState("");

    // React Hook Form
    const { register, watch, setValue, handleSubmit, reset, formState: { errors } } = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            title: "",
            description: "",
            propertyType: "House",
            listingType: "For Sale",
            price: 0,
            area: 0,
            yearBuilt: new Date().getFullYear(),
            beds: 1,
            baths: 1,
            country: "",
            city: "",
            fullAddress: "",
            lat: 0,
            lon: 0,
            features: [],
            images: [],
        }
    });

    // Get the user's token
    const { getToken } = useAuth();

    // Property creation api call
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: PropertyFormValues) => {
            const token = await getToken();
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("propertyType", values.propertyType);
            formData.append("listingType", values.listingType);
            formData.append("price", values.price.toString());
            formData.append("area", values.area.toString());
            formData.append("yearBuilt", values.yearBuilt.toString());

            if (watch("propertyType") !== "Land") {
                formData.append("beds", (values.beds ?? 1).toString());
                formData.append("baths", (values.baths ?? 1).toString());
            }

            formData.append("country", values.country);
            formData.append("city", values.city);
            formData.append("fullAddress", values.fullAddress);
            formData.append("lat", values.lat.toString());
            formData.append("lon", values.lon.toString());
            values.features.forEach((feature) => formData.append("features", feature));
            values.images.forEach((image) => formData.append("images", image));

            return createProperty(token ?? "", formData);
        },
        onSuccess: () => {
            toast.success("Property Created!", {
                className: "text-success!"
            });

            // Reset form state
            reset();
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update profile photo", {
                className: "text-error!"
            });
        }
    });

    // Extra hooks
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    // Variables
    const images = watch("images");
    const features = watch("features") || [];

    // Create object urls from images
    useEffect(() => {
        const urls = images.map((file) => URL.createObjectURL(file));
        setObjectUrls(urls);

        // Cleanup: revoke object urls
        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        }
    }, [images]);

    // Functions
    const handleTriggerInput = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    }

    const processFiles = (newFiles: FileList | File[]) => {
        const validImageFiles = Array.from(newFiles).filter((file) =>
            file.type.startsWith("image/")
        );
        if (validImageFiles.length === 0) return;

        const currentImages = watch("images") || [];
        const sizeLeft = 10 - currentImages.length;
        if (sizeLeft <= 0) return;

        const filesToAdd = validImageFiles.slice(0, sizeLeft);
        setValue("images", [...currentImages, ...filesToAdd], { shouldValidate: true });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            processFiles(e.target.files);
        }
        e.target.value = "";
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const currentImages = watch("images") || [];
        const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
        setValue("images", updated, { shouldValidate: true });
    };

    // Features Handlers
    const handleAddFeature = () => {
        const trimmed = featureInput.trim();
        if (!trimmed) return;
        if (features.length >= 10) return;
        if (features.includes(trimmed)) {
            setFeatureInput("");
            return;
        }
        setValue("features", [...features, trimmed], { shouldValidate: true });
        setFeatureInput("");
    };

    const handleKeyDownFeature = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddFeature();
        }
    };

    const handleRemoveFeature = (indexToRemove: number) => {
        const updated = features.filter((_, idx) => idx !== indexToRemove);
        setValue("features", updated, { shouldValidate: true });
    };

    const toggleSuggestedFeature = (suggestion: string) => {
        if (features.includes(suggestion)) {
            setValue("features", features.filter((f) => f !== suggestion), { shouldValidate: true });
        } else {
            if (features.length >= 10) return;
            setValue("features", [...features, suggestion], { shouldValidate: true });
        }
    };

    return (
        <form onSubmit={handleSubmit((data) => mutate(data))} className="rounded-2xl border bg-card p-6 sm:p-8 space-y-6">
            {/* ---- Section 1: Basic Information ---- */}
            <div className="space-y-6">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b pb-2">Basic Information</h2>

                <div className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                        <label
                            className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                            htmlFor="title"
                        >
                            Property Title <span className="text-error">*</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="e.g. Modern Luxury Villa with Private Pool & Garden"
                            {...register("title")}
                            id="title"
                            className={cn(errors.title && "border-error")}
                        />

                        {/* ---- Error Message ---- */}
                        {errors.title && <p className="text-xs text-error">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <div className="space-y-2">
                            <label
                                className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                                htmlFor="description"
                            >
                                Property Description <span className="text-error">*</span>
                            </label>
                            <Textarea
                                rows={5}
                                placeholder="Write a compelling detailed description of the property, surrounding neighborhood, amenities, and key highlights..."
                                className={cn("py-3 leading-relaxed resize-none", errors.description && "border-error")}
                                id="description"
                                {...register("description")}
                            />
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.description && <p className="text-xs text-error">{errors.description.message}</p>}

                        <p className="text-xs text-text-secondary font-medium tabular-nums text-right mt-1">
                            {watch("description")?.length || 0} characters
                        </p>
                    </div>
                </div>
            </div>

            {/* ---- Section 2: Property Type & Listing Category ---- */}
            <div className="space-y-6">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b pb-2">Category & Listing Type</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Property Type Dropdown */}
                    <div className="space-y-2">
                        <label
                            className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                            htmlFor="propertyType"
                        >
                            Property Type <span className="text-error">*</span>
                        </label>
                        <Select
                            id="propertyType"
                            {...register("propertyType")}
                            value={watch("propertyType")}
                            onValueChange={(val) => val && setValue("propertyType", val)}
                        >
                            <SelectTrigger className={cn("w-full h-10! rounded-lg px-3.5 text-sm! text-text", errors.propertyType && "border-error")}>
                                <SelectValue placeholder="Select Property Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="House">House</SelectItem>
                                <SelectItem value="Apartment">Apartment</SelectItem>
                                <SelectItem value="Condo">Condo</SelectItem>
                                <SelectItem value="Land">Land</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* ---- Error Message ---- */}
                        {errors.propertyType && <p className="text-xs text-error">{errors.propertyType.message}</p>}
                    </div>

                    {/* Listing Type Dropdown */}
                    <div className="space-y-2">
                        <label
                            className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                            htmlFor="listingType"
                        >
                            Listing Type <span className="text-error">*</span>
                        </label>
                        <Select
                            id="listingType"
                            {...register("listingType")}
                            value={watch("listingType")}
                            onValueChange={(val) => val && setValue("listingType", val)}
                        >
                            <SelectTrigger className={cn("w-full h-10! rounded-lg px-3.5 text-sm! text-text", errors.listingType && "border-error")}>
                                <SelectValue placeholder="Select Listing Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="For Sale">For Sale</SelectItem>
                                <SelectItem value="For Rent">For Rent</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* ---- Error Message ---- */}
                        {errors.listingType && <p className="text-xs text-error">{errors.listingType.message}</p>}
                    </div>
                </div>
            </div>

            {/* ---- Section 3: Property Specifications & Pricing ---- */}
            <div className="space-y-6">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b pb-2">Specifications & Pricing</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Price */}
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <label
                            className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                            htmlFor="price"
                        >
                            Price ($) <span className="text-error">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <DollarSign className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                            <Input
                                placeholder="450,000"
                                className={cn("pl-9", errors.price && "border-error")}
                                id="price"
                                {...register("price", { valueAsNumber: true })}
                            />
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.price && <p className="text-xs text-error">{errors.price.message}</p>}
                    </div>

                    {/* Area */}
                    <div className="space-y-2">
                        <label
                            className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                            htmlFor="area"
                        >
                            Area (sq ft) <span className="text-error">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <Maximize2 className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                            <Input
                                placeholder="2,800"
                                className={cn("pl-9", errors.area && "border-error")}
                                id="area"
                                {...register("area", { valueAsNumber: true })}
                            />
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.area && <p className="text-xs text-error">{errors.area.message}</p>}
                    </div>

                    {/* Year Built */}
                    <div className="space-y-2">
                        <label
                            className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                            htmlFor="yearBuilt"
                        >
                            Year Built <span className="text-error">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <Calendar className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                            <Input
                                placeholder="2022"
                                className={cn("pl-9", errors.yearBuilt && "border-error")}
                                id="yearBuilt"
                                {...register("yearBuilt", { valueAsNumber: true })}
                            />
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.yearBuilt && <p className="text-xs text-error">{errors.yearBuilt.message}</p>}
                    </div>

                    {/* ---- Beds/Baths show conditionally ---- */}
                    {
                        (watch("propertyType") !== "Land") && (
                            <>
                                {/* Beds */}
                                <div className="space-y-2">
                                    <label
                                        className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                                        htmlFor="beds"
                                    >
                                        Bedrooms
                                    </label>
                                    <div className="relative flex items-center">
                                        <Bed className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                                        <Input
                                            placeholder="4"
                                            className={cn("pl-9", errors.beds && "border-error")}
                                            id="beds"
                                            {...register("beds", { valueAsNumber: true })}
                                        />
                                    </div>

                                    {/* ---- Error Message ---- */}
                                    {errors.beds && <p className="text-xs text-error">{errors.beds.message}</p>}
                                </div>

                                {/* Baths */}
                                <div className="space-y-2">
                                    <label
                                        className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                                        htmlFor="baths"
                                    >
                                        Bathrooms
                                    </label>
                                    <div className="relative flex items-center">
                                        <Bath className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                                        <Input
                                            placeholder="3"
                                            className={cn("pl-9", errors.baths && "border-error")}
                                            id="baths"
                                            {...register("baths", { valueAsNumber: true })}
                                        />
                                    </div>

                                    {/* ---- Error Message ---- */}
                                    {errors.baths && <p className="text-xs text-error">{errors.baths.message}</p>}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            {/* ---- Section 4: Location Details ---- */}
            <div className="space-y-6">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b pb-2">Location Details</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Country */}
                        <div className="space-y-2">
                            <label
                                className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                                htmlFor="country"
                            >
                                Country <span className="text-error">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <Globe className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                                <Input
                                    type="text"
                                    placeholder="United States"
                                    className={cn("pl-9", errors.country && "border-error")}
                                    id="country"
                                    {...register("country")}
                                />
                            </div>

                            {/* ---- Error Message ---- */}
                            {errors.country && <p className="text-xs text-error">{errors.country.message}</p>}
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label
                                className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                                htmlFor="city"
                            >
                                City <span className="text-error">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <Home className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                                <Input
                                    type="text"
                                    placeholder="Los Angeles"
                                    className={cn("pl-9", errors.city && "border-error")}
                                    id="city"
                                    {...register("city")}
                                />
                            </div>

                            {/* ---- Error Message ---- */}
                            {errors.city && <p className="text-xs text-error">{errors.city.message}</p>}
                        </div>
                    </div>

                    {/* Full Address */}
                    <div className="space-y-2">
                        <label
                            className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                            htmlFor="fullAddress"
                        >
                            Full Address <span className="text-error">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <MapPin className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="1245 Sunset Blvd, Suite 400, Los Angeles, CA 90026"
                                className={cn("pl-9", errors.fullAddress && "border-error")}
                                id="fullAddress"
                                {...register("fullAddress")}
                            />
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.fullAddress && <p className="text-xs text-error">{errors.fullAddress.message}</p>}
                    </div>

                    {/* Property Map Location Selection */}
                    <div className="pt-2">
                        <PropertyLocationMap
                            lat={watch("lat")}
                            lon={watch("lon")}
                            onLocationSelect={(lat, lon) => {
                                setValue("lat", lat, { shouldValidate: true });
                                setValue("lon", lon, { shouldValidate: true });
                            }}
                            onClearLocation={() => {
                                setValue("lat", 0, { shouldValidate: true });
                                setValue("lon", 0, { shouldValidate: true });
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* ---- Section 5: Features & Amenities ---- */}
            <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b flex-wrap gap-2">
                    <h2 className="font-heading text-lg sm:text-xl font-bold text-text">Features & Amenities</h2>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-section border text-text-secondary">
                        {features.length} / 10 features
                    </span>
                </div>

                <div className="space-y-4">
                    {/* ---- Feature Input Field ---- */}
                    <div className="space-y-2">
                        <label
                            className="text-xs xs:text-sm font-medium text-text flex items-center gap-1.5"
                            htmlFor="featureInput"
                        >
                            Property Features <span className="text-text-secondary font-normal">(Press Enter or click Add)</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1 flex items-center">
                                <Tag className="absolute left-3.5 size-4 text-text-secondary pointer-events-none" />
                                <Input
                                    id="featureInput"
                                    type="text"
                                    placeholder="e.g. Swimming Pool, Smart Home Controls, Hardwood Floors..."
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyDown={handleKeyDownFeature}
                                    className={cn("pl-9 pr-4", errors.features && "border-error")}
                                    disabled={features.length >= 10}
                                />
                            </div>
                            <Button
                                type="button"
                                variant="secondary"
                                size="lg"
                                onClick={handleAddFeature}
                                disabled={!featureInput.trim() || features.length >= 10}
                                className="shrink-0"
                            >
                                <Plus className="size-4" />
                                <span className="hidden xs:inline">Add Feature</span>
                            </Button>
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.features && <p className="text-xs text-error">{errors.features.message}</p>}
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="space-y-2 pt-1">
                        <p className="text-xs font-medium text-text-secondary flex items-center gap-1">
                            <Sparkles className="size-3.5 text-accent" /> Popular Suggestions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTED_FEATURES.map((suggestion) => {
                                const isSelected = features.includes(suggestion);
                                return (
                                    <button
                                        key={suggestion}
                                        type="button"
                                        onClick={() => toggleSuggestedFeature(suggestion)}
                                        disabled={!isSelected && features.length >= 10}
                                        className={cn(
                                            "text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                                            isSelected
                                                ? "bg-secondary text-white border-secondary shadow-xs"
                                                : "bg-section/70 hover:bg-section text-text border-border hover:border-secondary/50"
                                        )}
                                    >
                                        {isSelected ? <Check className="size-3.5" /> : <Plus className="size-3.5 text-text-secondary" />}
                                        {suggestion}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Added Features Badges (At the bottom) */}
                    {features.length > 0 && (
                        <div className="space-y-2 pt-3 border-t border-dashed">
                            <p className="text-xs font-semibold text-text">Selected Features ({features.length}):</p>
                            <div className="flex flex-wrap gap-2">
                                {features.map((feature, idx) => (
                                    <span
                                        key={feature + idx}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 shadow-2xs group hover:bg-error/10 hover:text-error hover:border-error/20 transition-all duration-200"
                                    >
                                        <span>{feature}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFeature(idx)}
                                            className="text-primary/70 hover:text-error rounded-full p-0.5 transition-colors cursor-pointer"
                                            aria-label={`Remove ${feature}`}
                                        >
                                            <X className="size-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ---- Section 6: Property Images ---- */}
            <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b flex-wrap gap-2">
                    <h2 className="font-heading text-lg sm:text-xl font-bold text-text">Property Gallery</h2>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-section border text-text-secondary">
                        Max 10 images
                    </span>
                </div>

                {/* ---- Image Dropzone ---- */}
                <div
                    className={cn(
                        "group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-3",
                        isDragging
                            ? "border-secondary bg-secondary/15 scale-[1.01]"
                            : "border-border hover:border-secondary bg-section/50 hover:bg-secondary/10"
                    )}
                    onClick={handleTriggerInput}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="p-4 rounded-full bg-card border text-secondary shadow-xs">
                        <UploadCloud className="size-8" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-text">
                            <span className="text-secondary hover:underline">Click to upload</span> or drag and drop photos
                        </p>
                        <p className="text-xs text-text-secondary">High quality images improve buyer engagement (Up to 5 MB each)</p>
                    </div>
                </div>

                {/* ---- Image Input ---- */}
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                />

                {/* ---- Images Preview ---- */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium text-text-secondary">
                        <span>Uploaded Photos ({images.length})</span>
                        <span className="text-secondary flex items-center gap-1">
                            <Sparkles className="size-3.5" /> First image set as thumbnail
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {
                            images.length > 0 && images.map((image, idx) => (
                                <div
                                    key={image.name + idx}
                                    className="relative group aspect-4/3 rounded-xl overflow-hidden border bg-section shadow-xs"
                                >
                                    <img
                                        src={objectUrls[idx]}
                                        alt={image.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {
                                        idx === 0 && (
                                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary/90 text-white text-[10px] font-semibold tracking-wider">
                                                Thumbnail
                                            </div>
                                        )
                                    }

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                        <Button
                                            type="button"
                                            size="icon-lg"
                                            className="bg-card/90 text-error hover:bg-card shadow-xs"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveImage(idx);
                                            }}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* ---- Action Buttons ---- */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => reset()}
                >
                    Cancel
                </Button>
                <Button variant="secondary" size="lg" type="submit" disabled={isPending}>
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Building2 className="size-4" />
                    )}
                    {isPending ? "Publishing..." : "Publish Property"}
                </Button>
            </div>
        </form>
    );
};

export default AddPropertyForm;