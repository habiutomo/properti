import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export function ImageCarousel({ images, className }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return <div className={cn("h-64 bg-gray-200 flex items-center justify-center", className)}>No images available</div>;
  }

  return (
    <div className={className}>
      <Carousel
        className="w-full"
        onSelect={(index) => setCurrentImage(index)}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
                <DialogTrigger asChild>
                  <div 
                    className="relative h-64 md:h-96 w-full cursor-pointer overflow-hidden rounded-md"
                    onClick={() => setCurrentImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Property image ${index + 1}`}
                      className="h-full w-full object-cover transition-all hover:scale-105 duration-300"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="relative h-[80vh]">
                    <img 
                      src={images[currentImage]} 
                      alt={`Property image ${currentImage + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="flex mt-2 overflow-x-auto space-x-2 p-1">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`relative w-20 h-16 flex-shrink-0 cursor-pointer rounded-sm overflow-hidden border-2 ${index === currentImage ? 'border-primary' : 'border-transparent'}`}
            onClick={() => setCurrentImage(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
