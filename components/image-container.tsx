"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ImageContainer() {
  const { imageData, isLoading, selectedFilters, getNewImage } =
    useAppContext();
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      setImageLoading(true);
    } else {
      timeout = setTimeout(() => {
        setImageLoading(false);
      }, 600);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      await getNewImage();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      {(!!isLoading || !!imageLoading) && (
        <div className="mx-4 lg:mx-8 min-h-[65vh] bg-gray-200 animate-pulse flex items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-600">
          Loading...
        </div>
      )}

      {!isLoading && imageData && (
        <div
          className={cn(
            "flex flex-col justify-center items-center w-full min-h-[65vh]",
            imageLoading && "absolute inset-0 invisible"
          )}
        >
          <Image
            src={
              imageData.urls.regular ||
              "https://source.unsplash.com/random?still-life-photography,still-life,objects,food,nature"
            }
            alt={imageData.alt_description || "Inspirational artwork"}
            width={imageData.width || 400}
            height={imageData.height || 600}
            className="w-auto max-h-[58vh] mx-auto text-center object-cover border-4 border-black dark:border-white"
          />
          <div className="w-full block text-sm p-4 text-center font-thin">
            <span>{imageData.user.name + " / "}</span>
            <a
              href={`${imageData.user.links.html}?utm_source=Still-a-Work-of-Art&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          </div>
          {/* <Button
            variant="outline"
            size="icon"
            className="absolute bottom-16 left-16 border-none"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-16 left-2 border-none"
          >
            <Download className="h-4 w-4" />
          </Button> */}
        </div>
      )}

      {!isLoading && !imageLoading && !imageData && (
        <div className="mx-4 lg:mx-8 min-h-[60vh] bg-gray-200 flex items-center text-sm justify-center text-center text-gray-400 dark:bg-gray-600">
          Oops! Unable to fetch image. Please try again
        </div>
      )}

      <Button
        onClick={getNewImage}
        className={cn(
          "mt-4 block mx-auto mb-1 bg-black text-white dark:text-black dark:bg-white hover:bg-gray-800",
          isLoading && "hover:cursor-wait",
          selectedFilters.length === 0 && "hover:cursor-not-allowed"
        )}
        disabled={imageLoading || selectedFilters.length === 0}
        size="lg"
      >
        {imageLoading ? "Loading new Picture" : "Try another Picture"}
      </Button>
      <p
        className={cn(
          "w-full text-[0.65rem] text-center mt-3 pt-0 mb-0 py-0",
          selectedFilters.length > 0 ? "invisible" : "visible"
        )}
      >
        Please select at least one tag to continue
      </p>
    </div>
  );
}
