import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
    fullName: z.string().trim().min(1, "Full name is required.").min(3, "Full name must be at least 3 characters."),
    email: z.string().trim().min(1, "Email address is required.").email("Please enter a valid email address."),
    phone: z.string().regex(
        /^[\d\s\-+()\.]{10,15}$/,
        "Phone number must be 10-15 characters (digits, spaces, dashes, parentheses, dots, plus sign only)"
    ),
    subject: z.string().trim().min(1, "Subject is required.").min(3, "Subject must be at least 3 characters."),
    message: z.string().trim().min(1, "Message is required.").min(10, "Message must be at least 10 characters.")
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullName: "", email: "", phone: "", subject: "", message: ""
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: ContactFormValues) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("fullName", data.fullName);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("subject", data.subject);
            formData.append("message", data.message);
            formData.append("access_key", "bdf0d575-9bb6-4fe1-a9ff-4663778618aa");

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success("Message Sent!", {
                    className: "text-success!"
                });

                reset();
            } else {
                toast.error("Message Sending Failed!", {
                    className: "text-error!"
                });
            }
        } catch (e: any) {
            console.error("Contact form error: ", e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-lg shadow-primary/5">
                <div className="mb-6">
                    <h3 className="font-heading text-lg xs:text-xl font-bold text-text">
                        Send Message
                    </h3>
                    <p className="text-xs xs:text-sm text-text-secondary mt-1">
                        Fill out the form below, and our agent will follow up shortly.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* ---- Name & Email ---- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                htmlFor="fullName"
                            >
                                Full Name
                            </label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                id="fullName"
                                {...register("fullName")}
                                className={cn(errors.fullName && "border-error")}
                            />
                            {errors.fullName && (
                                <p className="text-[11px] xs:text-xs text-error">{errors.fullName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="john@example.com"
                                id="email"
                                {...register("email")}
                                className={cn(errors.email && "border-error")}
                            />
                            {errors.email && (
                                <p className="text-[11px] xs:text-xs text-error">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    {/* ---- Phone & Subject ---- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                htmlFor="phone"
                            >
                                Phone Number
                            </label>
                            <Input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                id="phone"
                                {...register("phone")}
                                className={cn(errors.phone && "border-error")}
                            />
                            {errors.phone && (
                                <p className="text-[11px] xs:text-xs text-error">{errors.phone.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                                htmlFor="subject"
                            >
                                Subject
                            </label>
                            <Input
                                type="text"
                                placeholder="e.g. Property valuation"
                                id="subject"
                                {...register("subject")}
                                className={cn(errors.subject && "border-error")}
                            />
                            {errors.subject && (
                                <p className="text-[11px] xs:text-xs text-error">{errors.subject.message}</p>
                            )}
                        </div>
                    </div>

                    {/* ---- Message ---- */}
                    <div className="space-y-2">
                        <label
                            className="text-[11px] xs:text-xs block font-semibold uppercase tracking-wider text-text-secondary"
                            htmlFor="message"
                        >
                            Message
                        </label>
                        <Textarea
                            rows={6}
                            className={cn("py-2.5 resize-none", errors.message && "border-error")}
                            placeholder="Write your message here..."
                            id="message"
                            {...register("message")}
                        />
                        {errors.message && (
                            <p className="text-[11px] xs:text-xs text-error">{errors.message.message}</p>
                        )}
                    </div>

                    {/* ---- Button ---- */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-secondary hover:bg-secondary-hover text-white shadow-xs h-10"
                        disabled={loading}
                    >
                        {
                            loading ? (
                                <>
                                    <LoaderCircle className="size-3.5 xs:size-4 mr-1 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="size-3.5 xs:size-4 mr-1" />
                                    Send Message
                                </>
                            )
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;