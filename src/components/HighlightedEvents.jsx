// src/components/HighlightedEvents.jsx
import React, { useEffect, useState, useRef } from "react";
import HighlightedEventCard from "./HighlightedEventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../api";
import { API_BASE_URL, ENDPOINTS } from "../utils/apiConfig";

const HighlightedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Calculate how many cards to show based on screen size
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    // Responsive handler to determine cards to show
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchHighlightedEvents = async () => {
      setLoading(true);
      try {
        const response = await api.get(ENDPOINTS.HIGHLIGHTED_EVENTS);
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching highlighted events:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightedEvents();
  }, []);

  const handleScrollLeft = () => {
    if (events.length <= cardsToShow) return;

    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleScrollRight = () => {
    if (events.length <= cardsToShow) return;

    const maxIndex = Math.max(0, events.length - cardsToShow);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 0;
      const gap = 16; // Gap between cards in pixels

      carouselRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <section className="py-10 md:py-16 px-4 max-w-7xl mx-auto w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7d4744]"></div>
      </section>
    );
  }

  if (error || events.length === 0) {
    return (
      <section className="py-10 md:py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center text-gray-600">
          {error
            ? "Error loading highlighted events."
            : "No highlighted events available."}
        </div>
      </section>
    );
  }

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < events.length - cardsToShow;

  return (
    <section
      className="py-10 md:py-16 px-4 max-w-7xl mx-auto w-full"
      id="highlighted-events"
    >
      {/* Section heading area with improved responsive spacing */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-[#7d4744] mb-2 md:mb-3">
          Highlighted Events
        </h2>
        <p className="text-lg md:text-xl text-[#5a4a42]">
          Recommended camps by our Instructors
        </p>
      </div>

      {/* Carousel container with navigation arrows */}
      <div className="relative">
        {/* Left navigation button */}
        {canScrollLeft && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7d4744]"
            aria-label="View previous events"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-[#7d4744]" />
          </button>
        )}

        {/* Cards container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 md:gap-8 pb-6 hide-scrollbar scroll-smooth"
          style={{
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer and Edge
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-none transition-transform duration-300 hover:scale-[1.02]"
            >
              <HighlightedEventCard event={event} />
            </div>
          ))}
        </div>

        {/* Right navigation button */}
        {canScrollRight && (
          <button
            onClick={handleScrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7d4744]"
            aria-label="View more events"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-[#7d4744]" />
          </button>
        )}
      </div>

      {/* Pagination indicator dots */}
      {events.length > cardsToShow && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({
            length: Math.ceil(events.length - cardsToShow + 1),
          }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-[#7d4744] w-4" : "bg-gray-300"
              }`}
              onClick={() => {
                setCurrentIndex(i);
                scrollToIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HighlightedEvents;
