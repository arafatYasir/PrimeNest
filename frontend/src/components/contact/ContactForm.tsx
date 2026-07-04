import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import React, { useState } from "react";

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
}

const ContactForm = () => {
    // States
    const [formData, setFormData] = useState<FormData>({
        fullName: "", email: "", phone: "", subject: "", message: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});

    // Functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined
            }));
        }
    }

    const handleCheckErrors = (): boolean => {
        const newErrors: FormErrors = {};

        // Full Name Validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required.";
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters.";
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Phone Validation
        if (formData.phone.trim() && formData.phone.trim().length < 7) {
            newErrors.phone = "Phone number must be at least 7 characters.";
        }

        // Subject Validation
        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required.";
        } else if (formData.subject.trim().length < 3) {
            newErrors.subject = "Subject must be at least 3 characters.";
        }

        // Message Validation
        if (!formData.message.trim()) {
            newErrors.message = "Message is required.";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const isValid = handleCheckErrors();

        if (isValid) {
            // Form submission logic coming soon
        }
    }

    return (
        <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-lg shadow-primary/5">
                <div className="mb-6">
                    <h3 className="font-heading text-xl font-bold text-text">
                        Send Message
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                        Fill out the form below, and our agent will follow up shortly.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* ---- Name & Email ---- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                className="text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                htmlFor="fullName"
                            >
                                Full Name
                            </label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.fullName && (
                                <p className="text-xs text-destructive">{errors.fullName}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="john@example.com"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                className="text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                htmlFor="phone"
                            >
                                Phone Number
                            </label>
                            <Input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.phone && (
                                <p className="text-xs text-destructive">{errors.phone}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                htmlFor="subject"
                            >
                                Subject
                            </label>
                            <Input
                                type="text"
                                placeholder="e.g. Property valuation"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.subject && (
                                <p className="text-xs text-destructive">{errors.subject}</p>
                            )}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label
                            className="text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                            htmlFor="message"
                        >
                            Message
                        </label>
                        <Textarea
                            rows={6}
                            className={`py-2.5 resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            placeholder="Write your message here..."
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        {errors.message && (
                            <p className="text-xs text-destructive">{errors.message}</p>
                        )}
                    </div>

                    {/* ---- Button ---- */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-secondary hover:bg-secondary-hover text-white shadow-xs py-3 mt-2 h-11"
                    >
                        <Send className="size-4 mr-2" />
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;