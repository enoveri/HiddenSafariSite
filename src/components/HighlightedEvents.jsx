// src/components/HighlightedEvents.jsx
import React, { useEffect, useState, useRef } from "react";
import HighlightedEventCard from "./HighlightedEventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const HighlightedEvents = () => {
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch("http://54.210.95.246:3005/api/v1/events/highlighted-events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        // Set initial 3 visible events
        setVisibleEvents(data.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  // Scroll by approximately one card's width + gap
  const handleScrollRight = () => {
    if (events.length <= 3) return;

    const nextIndex = (currentIndex + 1) % (events.length - 2);
    setCurrentIndex(nextIndex);
    setVisibleEvents(events.slice(nextIndex, nextIndex + 3));

    if (scrollContainerRef.current) {
      // Smooth scroll effect
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="flex flex-col py-12 px-8" id="highlighted-events">
      <h2 className="text-3xl font-poppins font-medium text-maroon mb-4 text-center">
        Highlighted Events
      </h2>
      <p className="mb-8 text-lg text-darkBrown text-center">
        Recommended camps by our Instructors
      </p>

      {/* Outer container for arrow-based scroll - centered with mx-auto */}
      <div className="relative mx-auto ">
        {/* Card list with centering */}
        <div
          ref={scrollContainerRef}
          className="
            flex
            flex-row
            justify-center
            gap-4
            transition-all
            duration-300
          "
        >
          {visibleEvents.map((event, idx) => (
            // Each card is "shrink-0" so it won't compress or overlap
            <div className="shrink-0" key={`${event.id}-${idx}`}>
              <HighlightedEventCard event={event} />
            </div>
          ))}
        </div>

        {/* Right arrow button to scroll */}
        {events.length > 3 && (
          <button
            onClick={handleScrollRight}
            className="
              absolute
              top-1/2
              right-0
              -translate-y-1/2
             
              p-3
              rounded-full
              text-5xl
              text-white
             
              shadow-md
            "
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </section>
  );
};

export default HighlightedEvents;
