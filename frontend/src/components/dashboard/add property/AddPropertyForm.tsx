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
} from "lucide-react";
import { useForm } from "react-hook-form";
import { type PropertyFormValues, propertySchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import PropertyLocationMap from "./PropertyLocationMap";
import React, { useRef } from "react";

const AddPropertyForm = () => {
    // React Hook Form
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<PropertyFormValues>({
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
        }
    });

    // Extra hooks
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    // Functions
    const handleTriggerInput = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        const temp = [];

        for (let i = 0; i < files.length; i++) {
            temp.push(files[i]);
        }

    }

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))} className="rounded-2xl border bg-card p-6 sm:p-8 space-y-6">
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

            {/* ---- Section 5: Property Images ---- */}
            <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b flex-wrap gap-2">
                    <h2 className="font-heading text-lg sm:text-xl font-bold text-text">Property Gallery</h2>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-section border text-text-secondary">
                        Max 10 images
                    </span>
                </div>

                {/* ---- Image Dropzone ---- */}
                <div
                    className="group border-2 border-dashed hover:border-secondary rounded-2xl p-8 text-center bg-section/50 hover:bg-secondary/10 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-3"
                    onClick={handleTriggerInput}
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

                {/* Image Previews Mock UI */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium text-text-secondary">
                        <span>Uploaded Photos (1)</span>
                        <span className="text-secondary flex items-center gap-1">
                            <Sparkles className="size-3.5" /> First image set as thumbnail
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {/* Sample Image Preview 1 */}
                        <div className="relative group aspect-4/3 rounded-xl overflow-hidden border bg-section shadow-xs">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
                                alt="Property preview 1"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary/90 text-white text-[10px] font-semibold tracking-wider">
                                Thumbnail
                            </div>

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                <Button size="icon-lg" className="bg-card/90 text-error hover:bg-card shadow-xs">
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- Action Buttons ---- */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <Button variant="outline" size="lg" type="button">
                    Cancel
                </Button>
                <Button variant="secondary" size="lg" type="submit">
                    <Building2 className="size-4" />
                    Publish Property
                </Button>
            </div>
        </form>
    );
};

export default AddPropertyForm;