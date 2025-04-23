// src/components/ExperienceSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const ExperienceSection = () => {
  const [videos, setVideos] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Enhanced video data with titles and durations
    setVideos([
      {
        id: 1,
        title: "Winter Adventure",
        duration: "2:45",
        imageUrl:
          "https://img.freepik.com/free-photo/beautiful-woman-with-backpack-smiling_176420-4203.jpg",
      },
      {
        id: 2,
        title: "Family Treks",
        duration: "3:12",
        imageUrl:
          "https://img.freepik.com/free-photo/mother-with-cute-son-winter-oark_1157-19263.jpg",
      },
      {
        id: 3,
        title: "Roadtrip Moments",
        duration: "1:55",
        imageUrl:
          "https://img.freepik.com/free-photo/woman-with-man-photographing-while-traveling-vehicle_107420-9769.jpg",
      },
      {
        id: 4,
        title: "Desert Expedition",
        duration: "4:20",
        imageUrl:
          "https://img.freepik.com/free-photo/indian-men-resting-by-bonfire-with-their-camel_53876-47057.jpg",
      },
    ]);
  }, []);

  // Check scroll position to update navigation buttons visibility
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const checkScrollable = () => {
      setCanScrollLeft(scrollContainer.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.scrollLeft <
          scrollContainer.scrollWidth - scrollContainer.clientWidth - 10
      );
    };

    // Check on mount and whenever videos change
    checkScrollable();
    scrollContainer.addEventListener("scroll", checkScrollable);

    return () => {
      scrollContainer.removeEventListener("scroll", checkScrollable);
    };
  }, [videos]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  // Touch scrolling enhancement
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);

  const handleTouchStart = (e) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setInitialScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    try {
      const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
      const distance = (x - startX) * 1.5; // Multiply by 1.5 for faster scrolling
      scrollContainerRef.current.scrollLeft = initialScrollLeft - distance;
    } catch (err) {
      console.error("Touch error:", err);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handler for video play
  const handleVideoPlay = (videoId) => {
    console.log(`Playing video ${videoId}`);
    // Future enhancement: Implement modal video player or redirect to video page
  };

  return (
    <section
      className="w-full py-8 sm:py-12 px-4 sm:px-8 bg-[#ECD1D1]"
      id="experience-yourself"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header with responsive design */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-poppins font-medium text-[#7d4744] mb-2">
            Experience yourself
          </h2>
          <p className="text-lg text-[#5a4a42]">
            Exclusive footage from our camps
          </p>
        </div>

        {/* Video gallery with navigation */}
        <div className="relative">
          {/* Left navigation button */}
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7d4744] -ml-5"
              aria-label="Scroll left"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-[#7d4744]"
              />
            </button>
          )}

          {/* Video cards container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto hide-scrollbar scroll-smooth pb-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative flex-none w-[300px] sm:w-[400px] lg:w-[547px] h-[250px] sm:h-[300px] lg:h-[368px] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] group"
              >
                {/* Video thumbnail with gradient overlay */}
                <img
                  src={video.imageUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Video title and duration */}
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white text-lg sm:text-xl font-medium">
                    {video.title}
                  </h3>
                  <p className="text-white/80 text-sm">{video.duration}</p>
                </div>

                {/* Play button */}
                <button
                  onClick={() => handleVideoPlay(video.id)}
                  className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/20 transition-colors duration-300"
                  aria-label={`Play ${video.title}`}
                >
                  <div className="bg-red-600 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="text-white ml-1"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Right navigation button */}
          {canScrollRight && (
            <button
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7d4744] -mr-5"
              aria-label="Scroll right"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[#7d4744]"
              />
            </button>
          )}
        </div>
      </div>

      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
