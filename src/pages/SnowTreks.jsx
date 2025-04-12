import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function SnowTreks() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://54.210.95.246:3005/api/v1/events/snow-treks-events"
        );
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load snow trek events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="font-sans text-black">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Snow Treks
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Experience the magic of winter landscapes with our guided snow treks
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <p className="text-xl">Loading events...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {event.title}
                  </h2>
                  <p className="mt-2 text-gray-500">{event.description}</p>
                  <div className="mt-4 flex items-center">
                    <span className="text-gray-900 font-medium">
                      ${event.price}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {event.duration}
                    </span>
                  </div>
                  <div className="mt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default SnowTreks;
