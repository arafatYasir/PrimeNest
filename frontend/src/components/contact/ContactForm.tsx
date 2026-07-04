import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const ContactForm = () => {
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

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
                                required
                            />
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
                                required
                            />
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
                            />
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
                                required
                            />
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
                            className="py-2.5 resize-none"
                            placeholder="Write your message here..."
                            id="message"
                            required
                        />
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
    )
}

export default ContactForm