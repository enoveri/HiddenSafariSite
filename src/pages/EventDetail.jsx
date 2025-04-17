// src/pages/EventDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaUtensils,
  FaHotel,
  FaCar,
  FaFirstAid,
  FaBoxOpen,
  FaChalkboardTeacher,
  FaClock,
  FaTrophy,
  FaUserFriends,
  FaMountain,
} from "react-icons/fa";

// IntroSection: includes booking card, icons, etc.
const IntroSection = ({ event }) => {
  return (
    <section className="relative max-w-7xl px-8 py-8 flex justify-center gap-8">
      {/* LEFT SIDE: Event info */}
      <div className="items-center mx-5 w-2/5">
        <h2 className="text-maroon text-2xl font-poppins font-medium mb-1">
          {event?.categoryLabel}
        </h2>
        <p className="text-darkBrown text-lg mb-3">{event?.introSubtitle}</p>
        <h3 className="text-3xl font-bold text-black mb-6">{event?.heading}</h3>

        {/* Icons row */}
        <div className="flex space-x-6 text-gray-700 gap-2">
          <div className="flex items-center">
            <FaClock className="text-2xl mb-1" />
            <span className="text-sm">Food</span>
          </div>
          <div className="flex  items-center">
            <FaTrophy className="text-2xl mb-1" />
            <span className="text-sm">Trophy</span>
          </div>
          <div className="flex items-center">
            <FaUserFriends className="text-2xl mb-1" />
            <span className="text-sm">Age</span>
          </div>
          <div className="flex  items-center">
            <FaMountain className="text-2xl mb-1" />
            <span className="text-sm">Altitude</span>
          </div>
        </div>
        <div>
          <h1>About</h1>
          {event?.about}
        </div>
      </div>

      {/* RIGHT SIDE: Booking Card */}
      <div
        className="
            h-full
            w-auto          
            bg-white
            border
            border-gray-300
            rounded-xl
            p-6
            relative
            shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]
            flex flex-col
            gap-6
          "
      >
        {/* Price & description */}
        <div className="text-xl font-bold mb-2">
          {event ? event.price || "₹7,999 / person" : "₹7,999 / person"}
        </div>
        <p className="text-base mb-4 text-gray-700">
          {event ? event.includes || "Includes:" : "Includes:"}
        </p>

        {/* Icon list matching the left side */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-10 text-gray-800">
          <div className="flex items-center space-x-4">
            <div className="p-6 bg-[#E1C2C2A1] rounded-full border border-[#E1C2C2A1] flex items-center justify-center">
              <FaUtensils className="text-2xl text-[#E25B32]" />
            </div>
            <span className="text-base">Food</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-6 bg-[#E1C2C2A1] rounded-full border border-[#E1C2C2A1] flex items-center justify-center">
              <FaHotel className="text-2xl text-[#E25B32]" />
            </div>
            <span className="text-base">Accommodation</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-6 bg-[#E1C2C2A1] rounded-full border border-[#E1C2C2A1] flex items-center justify-center">
              <FaCar className="text-2xl text-[#E25B32]" />
            </div>
            <span className="text-base">Traveling</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-6 bg-[#E1C2C2A1] rounded-full border border-[#E1C2C2A1] flex items-center justify-center">
              <FaFirstAid className="text-2xl text-[#E25B32]" />
            </div>
            <span className="text-base">First Aid</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-6 bg-[#E1C2C2A1] rounded-full border border-[#E1C2C2A1] flex items-center justify-center">
              <FaBoxOpen className="text-2xl text-[#E25B32]" />
            </div>
            <span className="text-base">Accessories</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-6 bg-[#E1C2C2A1] rounded-full border border-[#E1C2C2A1] flex items-center justify-center">
              <FaChalkboardTeacher className="text-2xl text-[#E25B32]" />
            </div>
            <span className="text-base">Instructor</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="#"
            className="
              bg-[#E25B32]
              hover:bg-[#d04d27]
              text-white
              font-medium
              py-2
              px-8
              rounded-md
              transition-colors
            "
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

const EventDetail = () => {
  const { category, eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        let apiEndpoint;
        switch (category) {
          case "highlighted":
            apiEndpoint =
              "http://54.210.95.246:3005/api/v1/events/highlighted-events";
            break;
          case "snow-treks":
            apiEndpoint =
              "http://54.210.95.246:3005/api/v1/events/snow-treks-events";
            break;
          case "summer-events":
            apiEndpoint =
              "http://54.210.95.246:3005/api/v1/events/summer-events";
            break;
          case "epic-adventure":
            apiEndpoint =
              "http://54.210.95.246:3005/api/v1/events/epic-adventure-events";
            break;
          case "special-events":
            apiEndpoint =
              "http://54.210.95.246:3005/api/v1/events/special-events";
            break;
          default:
            apiEndpoint = `http://54.210.95.246:3005/api/v1/events/${category}-events`;
        }

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

        const allEvents = await response.json();
        const matchedEvent = allEvents.find((e) => e.id.toString() === eventId);
        if (!matchedEvent) {
          throw new Error(
            `Event with ID ${eventId} not found in category ${category}`
          );
        }

        setEvent(matchedEvent);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E25B32] mx-auto mb-4"></div>
          <p className="text-lg">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to load event
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Event details not found. Please try again later."}
          </p>
          <Link
            to="/events"
            className="inline-block bg-[#E25B32] hover:bg-[#d04d27] text-white py-2 px-6 rounded-md transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const images = [
    event.bannerImages1,
    event.bannerImages2,
    event.bannerImages3,
  ].filter(Boolean);

  const handleImageChange = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[558px] bg-[url('https://img.freepik.com/free-photo/extra-long-shot-peaceful-landscape-with-trees_23-2148980230.jpg')] bg-cover bg-center"></section>

      {/* Intro Section */}
      <IntroSection event={event} />

      {/* Dates Card */}
      <div className="my-8 mx-auto w-full max-w-[1280px] bg-[#F5E4DA] p-6">
        <h2 className="text-2xl font-bold mb-4">Dates</h2>

        {/* Months row */}
        <div className="flex items-center space-x-4 mb-4">
          <button className="bg-[#E25B32] text-white px-3 py-1 rounded-full">
            April
          </button>
          <button className="border border-black px-3 py-1 rounded-full">
            May
          </button>
          <button className="border border-black px-3 py-1 rounded-full">
            June
          </button>
        </div>

        {/* Days row */}
        <div className="flex items-center space-x-6">
          <button className="w-10 h-10 flex items-center justify-center border-2 border-[#E25B32] text-[#E25B32] rounded-full">
            20
          </button>
          <button className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full">
            23
          </button>
          <button className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full">
            27
          </button>
          <button className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full">
            29
          </button>
        </div>
      </div>

      {/* Schedule Section — each day’s layout matches your screenshot */}
      <div className="my-8 mx-auto w-full max-w-[1280px] px-8">
        <h2 className="text-2xl font-bold mb-6">Schedule</h2>
        {event.schedule.map((dayPlan) => (
          <div key={dayPlan.day} className="md:flex items-start mb-8 last:mb-0">
            {/* Left column: day, stats, description */}
            <div className="md:w-3/5 md:pr-4">
              <h3 className="text-xl font-bold mb-2">Day {dayPlan.day}</h3>
              {/* Title or route name, e.g. "Londorossi Gate to Forest Camp" */}
              <p className="font-semibold mb-1">{dayPlan.title}</p>
              {/* Stats (Elevation, Distance, etc.) — only if your data provides them */}
              <p className="text-gray-600 mb-1">
                <strong>Elevation (ft):</strong> {dayPlan.elevation}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Distance:</strong> {dayPlan.distance}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Hiking Time:</strong> {dayPlan.hikingTime}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Habitat:</strong> {dayPlan.habitat}
              </p>
              {/* Main paragraph describing that day */}
              <p className="mb-4">{dayPlan.description || dayPlan.plan}</p>
            </div>

            {/* Right column: image */}
            <div className="md:w-2/5 mt-4 md:mt-0">
              <img
                src={dayPlan.bannerImage}
                alt={`Day ${dayPlan.day} banner`}
                className="w-full h-auto rounded-md shadow"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetail;
