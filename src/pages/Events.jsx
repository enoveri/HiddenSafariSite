import React, { useState } from "react";
import HighlightedEvents from "../components/HighlightedEvents";
import CarouselSection from "../components/CarouselSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Events() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      {/* Orange header section */}
      <section className="w-full bg-[#E25B32] pt-20 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Events</h1>
          <p className="text-xl text-white mt-2">
            Life is either a daring adventure or nothing.
          </p>

          {/* Search bar */}
          <div className="mt-6 flex justify-end">
            <form onSubmit={handleSearchSubmit} className="relative w-72">
              <input
                type="text"
                placeholder="Search Here"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 px-4 pr-10 rounded-full text-gray-700 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-600"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex flex-col items-center py-10 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Event cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* South Africa Safari Card */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/src/assets/safari-zebras.jpg"
                alt="Whole Of South Africa"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=South+Africa+Safari";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Whole Of South Africa</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-700">From $ 3,560</p>
                  <p className="text-gray-600 text-sm">10 Days/9 Nights</p>
                </div>
              </div>
            </div>

            {/* South Africa with Mauritius Card */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/src/assets/mauritius-sunset.jpg"
                alt="South Africa with Mauritius"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=South+Africa+With+Mauritius";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  South Africa with Mauritius
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-700">From $ 4,050</p>
                  <p className="text-gray-600 text-sm">15 Days/14 Nights</p>
                </div>
              </div>
            </div>

            {/* Splendid South Africa Card */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/src/assets/splendid-africa.jpg"
                alt="Splendid South Africa"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Splendid+South+Africa";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Splendid South Africa</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-700">From $ 3,280</p>
                  <p className="text-gray-600 text-sm">10 Days/10 Nights</p>
                </div>
              </div>
            </div>
          </div>

          {/* Original carousels - you can keep or remove these as needed */}
          <HighlightedEvents />

          <CarouselSection
            category="snow-treks"
            title="Snow Treks"
            subTitle="Experience the magic of winter landscapes with our guided snow treks"
            apiEndpoint="http://54.210.95.246:3005/api/v1/events/snow-treks-events"
          />
          <CarouselSection
            category="summer-events"
            title="Summer Events"
            subTitle="Join our exciting range of summer activities"
            apiEndpoint="http://54.210.95.246:3005/api/v1/events/summer-events"
          />
          <CarouselSection
            category="epic-adventure"
            title="Epic Adventure"
            subTitle="Push your limits with our most thrilling outdoor challenges."
            apiEndpoint="http://54.210.95.246:3005/api/v1/events/epic-adventure-events"
          />
          <CarouselSection
            category="special-events"
            title="Special Events"
            subTitle="Unique, limited-time gatherings that celebrate remarkable occasions"
            apiEndpoint="http://54.210.95.246:3005/api/v1/events/special-events"
          />
        </div>
      </main>
    </>
  );
}

export default Events;
