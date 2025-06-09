"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const images = [
  {
    src: "https://touchcinema.com/storage/slider-app/1920wx1080h-40.jpg",
    alt: "Slide 1",
  },
  {
    src: "https://touchcinema.com/storage/slider-app/1920x1080-55.jpg",
    alt: "Slide 2",
  },
  {
    src: "https://touchcinema.com/storage/slide-web/1920x1080-3-1746948177.jpg",
    alt: "Slide 3",
  },
]

export default function HomeCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full h-[810px] relative"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="relative h-[810px] basis-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  )
}
