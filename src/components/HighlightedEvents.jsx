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
    <section
      className="py-16 px-4 max-w-7xl mx-auto overflow-hidden"
      id="highlighted-events"
    >
      {/* Section heading area with improved spacing */}
      <div className="mb-10">
        <h2 className="text-4xl font-poppins font-semibold text-[#7d4744] mb-3">
          Highlighted Events
        </h2>
        <p className="text-xl text-[#5a4a42]">
          Recommended camps by our Instructors
        </p>
      </div>

      {/* Container with cards and button in a row */}
      <div className="flex flex-row items-center justify-center">
        {/* Card list */}
        <div
          ref={scrollContainerRef}
          className="
            flex
            flex-row
            justify-center
            gap-32
            transition-all
            duration-300
            overflow-hidden
          "
        >
          {visibleEvents.map((event, idx) => (
            <div className="shrink-0" key={`${event.id}-${idx}`}>
              <HighlightedEventCard event={event} />
            </div>
          ))}
        </div>

        {/* Simple white chevron with no background box */}
        {events.length > 3 && (
          <span
            onClick={handleScrollRight}
            className="
            ml-8
            w-12
            h-12
            flex
            bg-transparent
            items-center
            justify-center
            text-white
            hover:text-gray-200
            flex-shrink-0
            transition-colors
            focus:outline-none
          "
            aria-label="View more events"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-5xl" />
          </span>
        )}
      </div>
    </section>
  );
};

export default HighlightedEvents;
