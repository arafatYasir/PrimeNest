import { contactInfos } from "@/lib/data"
import type { ContactInfo } from "@/types/global"

const ContactInfos = () => {
    return (
        <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
                <h2 className="font-heading text-lg xs:text-xl sm:text-2xl font-bold text-text">
                    Contact Information
                </h2>
                <p className="mt-2 text-xs xs:text-sm text-text-secondary">
                    Choose the most convenient way to connect with us. Our team is ready to assist you.
                </p>
            </div>

            {/* ---- Info Cards ---- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {
                    contactInfos.map(({ title, subtitle, icon: Icon, informations }: ContactInfo) => (
                        <div
                            key={title}
                            className="group flex gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-250 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5"
                        >
                            <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-250 ease-in">
                                <Icon className="size-4 sm:size-5" />
                            </div>

                            <div>
                                <h3 className="font-heading text-xs xs:text-sm font-bold text-text">
                                    {title}
                                </h3>
                                <p className="mt-1 text-[11px] xs:text-xs text-text-secondary font-medium">{subtitle}</p>
                                {informations.map((item, idx) => (
                                    item.type === "phone" ? (
                                        <a
                                            key={idx}
                                            href={`tel:${item.value}`}
                                            className={`${idx === 0 ? "mt-2" : ""} block text-xs xs:text-sm font-medium text-secondary hover:text-secondary-hover transition-colors`}
                                        >
                                            {item.value}
                                        </a>
                                    ) : item.type === "mail" ? (
                                        <a
                                            key={idx}
                                            href={`mailto:${item.value}`}
                                            className={`${idx === 0 ? "mt-2" : ""} block text-xs xs:text-sm font-medium text-secondary hover:text-secondary-hover transition-colors`}
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p
                                            key={idx}
                                            className={`${idx === 0 ? "mt-2" : ""} text-xs xs:text-sm font-medium text-text`}
                                        >
                                            {item.value}
                                        </p>
                                    )
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ContactInfos