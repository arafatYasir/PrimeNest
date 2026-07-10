import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface PropertyImageSliderProps {
    images: string[];
    title: string;
}

const PropertyImageSlider = ({ images, title }: PropertyImageSliderProps) => {
    // States
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api]);

    return (
        <div className="relative">
            <Carousel setApi={setApi} className="relative w-full">
                <CarouselContent>
                    {
                        images.map((image: string, i: number) => (
                            <CarouselItem key={i}>
                                <div className="overflow-hidden rounded-2xl border border-border/80">
                                    <img
                                        src={image}
                                        alt={`${title}-${i}`}
                                        className="w-full aspect-video object-cover transition-all duration-500 hover:scale-[1.01]"
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>

                {/* ---- Slider Controll Buttons --- */}
                <CarouselPrevious className="left-4 size-10 bg-white/90! hover:bg-white! text-primary! border border-border/40 shadow-lg transition-all duration-200 hover:scale-105 active:scale-100 disabled:opacity-0 disabled:pointer-events-none" />
                <CarouselNext className="right-4 size-10 bg-white/90! hover:bg-white! text-primary! border border-border/40 shadow-lg transition-all duration-200 hover:scale-105 active:scale-100 disabled:opacity-0 disabled:pointer-events-none" />

                {/* ---- Count Indicator ---- */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 inline-flex items-center justify-center rounded-full bg-primary/80 backdrop-blur-xs px-3.5 py-1.5 text-xs font-semibold text-white tracking-wider shadow-md border border-white/20 select-none">
                    {current} / {count}
                </div>
            </Carousel>
        </div>
    )
}

export default PropertyImageSlider