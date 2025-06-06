"use client";

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import "@/styles/Carousel.css";
import { toast } from "react-toastify";

const bannerImages = [
  "/images/main-banner-1.jpg",
  "/images/main-banner-2.jpg",
  "/images/main-banner-3.jpg",
];

const Banner = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex justify-between py-6">
      <div className="w-[80%]">
        <Carousel
          plugins={[autoplayPlugin.current]}
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index} className="carousel-item">
                <img src={bannerImages[index]} alt={`banner-${index + 1}`} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="ml-4">
        <img
          src="/images/sub-banner.jpg"
          alt={`sub-banner`}
          className="h-[300px] cursor-pointer"
          onClick={() => toast.info("Feature under development")}
        />
      </div>
    </div>
  );
};

export default Banner;
