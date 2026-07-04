import { useEffect } from "react";
import Container from "@/components/Container";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfos from "@/components/contact/ContactInfos";

export default function ContactPage() {
    // Scroll to the top on first page render
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <main className="bg-background min-h-screen">
            {/* ---- Hero Header Section ---- */}
            <ContactHero />

            {/* ---- Main Content Grid ---- */}
            <section className="py-12 sm:py-16 lg:py-20">
                <Container className="py-0!">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* ---- Left Column: Contact Cards & Info ---- */}
                        <ContactInfos />

                        {/* ---- Right Column: Contact Form ---- */}
                        <></>
                    </div>
                </Container>
            </section>
        </main>
    );
}
