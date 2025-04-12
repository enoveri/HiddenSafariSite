// src/components/CarouselSection.jsx
import React, { useEffect, useState } from "react";

const CarouselSection = ({ category, title, subTitle, apiEndpoint }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMzc2NzgsImV4cCI6MTcyOTMyMTY3OCwiaXNzIjoidXJuOmlzc3VlciJ9.ktWmxeC4NqHv1_W0qKt0avlCaDPBNivvDStv6BwHu9K5Geq9TegxH-S1cPfiRhcGdH30YUg1iDShFNOW7mBSwoKsVMMzWJfaqlN0aG1ELh3m9EL-GepR6gxQ5YkZQ9WfBGeoRDNHyYtq02ajgbRLrueuovCf5Nz9iu-ig0onh9XnZJ7J1kEQF3C6gjB0jLqJ8UcWY72S_O0_6tfq8lFuAXQjYbonMCAsx_hG-wJkmE8hlfcgN6BlcemZq-cTghJVNswBmzSoqgTEW1UnBYVoVOyptFQfVFOjdpRUaAlE4R0JHoRfFLR9vsxxvO5Y_x3Z8Eqfcq7O2CPGGPG_5yxt7w",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiEndpoint]);

  if (loading) {
    return <div className="py-12 px-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="py-12 px-8 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <section className="py-12 px-8">
      <h2 className="text-3xl font-poppins font-medium text-maroon mb-4">
        {title}
      </h2>
      <p className="mb-8 text-lg text-darkBrown">{subTitle}</p>

      {/* Scrollable row of cards with spacing - scrollbar hidden */}
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {events.map((event) => (
          <div
            key={event.id}
            className="
              relative
              min-w-[238px]
              h-[313px]
              shrink-0
              border
              border-black
              rounded-lg
              shadow-md
              overflow-hidden
            "
          >
            {/* Top portion: image plus an overlaid heading */}
            <div className="relative w-full h-[239px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.bannerImages1})` }}
              ></div>
              {/* Optional top text overlay (uppercase or calligraphic) */}
              <h4
                className="
                  absolute
                  top-3
                  left-3
                  text-white
                  text-xl
                  font-bold
                  drop-shadow
                  uppercase
                "
              >
                {event.title || "Untitled"}
              </h4>
            </div>

            {/* Bottom portion: smaller heading */}
            <div className="p-4">
              <h3 className="text-xl font-phetsarath text-center">
                {event.heading}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarouselSection;
