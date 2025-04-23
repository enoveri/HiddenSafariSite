// src/pages/EventDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { eventService } from "../api";
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
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaCheck,
} from "react-icons/fa";

// Booking Modal Component
const BookingModal = ({ isOpen, onClose, event }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDate: "",
    participants: 1,
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#E25B32] text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Book Your Adventure</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FaCheck className="text-green-500 text-3xl" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Booking Confirmed!
              </h4>
              <p className="text-gray-600">
                Thank you for your booking. We've sent the details to your
                email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Event Details
                </h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium">{event?.heading}</p>
                  <p className="text-sm text-gray-600">
                    {event?.price || "₹7,999 / person"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="travelDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Travel Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="travelDate"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="participants"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Participants
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUsers className="text-gray-400" />
                    </div>
                    <select
                      id="participants"
                      name="participants"
                      value={formData.participants}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="specialRequests"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]"
                    placeholder="Any special requirements or dietary restrictions?"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#E25B32] hover:bg-[#d04d27] text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E25B32] ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// IntroSection: includes booking card, icons, etc.
const IntroSection = ({ event, onBookNow }) => {
  const amenities = [
    { icon: FaUtensils, label: "Food" },
    { icon: FaHotel, label: "Accommodation" },
    { icon: FaCar, label: "Traveling" },
    { icon: FaFirstAid, label: "First Aid" },
    { icon: FaBoxOpen, label: "Accessories" },
    { icon: FaChalkboardTeacher, label: "Instructor" },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col lg:flex-row justify-center gap-8">
      {/* LEFT SIDE: Event info */}
      <div className="w-full lg:w-2/5 mb-8 lg:mb-0">
        <h2 className="text-maroon text-xl sm:text-2xl font-poppins font-medium mb-1">
          {event?.categoryLabel}
        </h2>
        <p className="text-darkBrown text-base sm:text-lg mb-3">
          {event?.introSubtitle}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-black mb-6">
          {event?.heading}
        </h3>

        {/* Icons row */}
        <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-700">
          <div className="flex items-center">
            <FaClock className="text-xl sm:text-2xl mb-1" />
            <span className="text-xs sm:text-sm ml-1">Food</span>
          </div>
          <div className="flex items-center">
            <FaTrophy className="text-xl sm:text-2xl mb-1" />
            <span className="text-xs sm:text-sm ml-1">Trophy</span>
          </div>
          <div className="flex items-center">
            <FaUserFriends className="text-xl sm:text-2xl mb-1" />
            <span className="text-xs sm:text-sm ml-1">Age</span>
          </div>
          <div className="flex items-center">
            <FaMountain className="text-xl sm:text-2xl mb-1" />
            <span className="text-xs sm:text-sm ml-1">Altitude</span>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-xl font-bold mb-2">About</h1>
          {event?.about}
        </div>
      </div>

      {/* RIGHT SIDE: Booking Card */}
      <div
        className="
            w-full
            lg:w-auto          
            bg-white
            border
            border-gray-300
            rounded-xl
            p-4
            sm:p-6
            relative
            shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]
            flex flex-col
            gap-4
            sm:gap-6
          "
      >
        {/* Price & description */}
        <div className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
          {event ? event.price || "₹7,999 / person" : "₹7,999 / person"}
        </div>
        <p className="text-sm sm:text-base mb-2 sm:mb-4 text-gray-700">
          {event ? event.includes || "Includes:" : "Includes:"}
        </p>

        {/* Icon list matching the left side */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-8 gap-x-4 sm:gap-x-10 text-gray-800">
          {amenities.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 sm:space-x-4"
              >
                <div className="p-2 sm:p-3 bg-[#E1C2C2A1] rounded-full border border-[#E1C2C2A1] flex items-center justify-center">
                  <IconComponent className="text-lg sm:text-2xl text-[#E25B32]" />
                </div>
                <span className="text-sm sm:text-base">{item.label}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={onBookNow}
            className="
              bg-[#E25B32]
              hover:bg-[#d04d27]
              text-white
              font-medium
              py-2
              px-6
              sm:px-8
              rounded-md
              transition-colors
              w-full
              sm:w-auto
              text-center
            "
          >
            Book Now
          </button>
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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEventById(eventId);
        setEvent(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching event ${eventId}:`, err);
        setError("Failed to load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

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
      {/* Hero Section with overlay - responsive height */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[558px]">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/extra-long-shot-peaceful-landscape-with-trees_23-2148980230.jpg')] bg-cover bg-center"></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </section>

      {/* Intro Section */}
      <IntroSection event={event} onBookNow={openBookingModal} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        event={event}
      />

      {/* Dates Card - now responsive */}
      <div className="my-8 mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8">
        <div className="bg-[#F5E4DA] p-4 sm:p-6 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Dates</h2>

          {/* Months row - responsive with wrap for small screens */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 ml-2.5">
            {["April", "May", "June"].map((month, index) => (
              <button
                key={month}
                className={`${
                  index === 0
                    ? "bg-[#E25B32] text-white"
                    : "border border-black"
                } px-2 sm:px-3 py-1 text-sm sm:text-base rounded-full`}
              >
                {month}
              </button>
            ))}
          </div>

          {/* Days row - responsive with wrap */}
          <div className="flex flex-wrap gap-3 sm:gap-6">
            {[20, 23, 27, 29].map((day, index) => (
              <button
                key={day}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-2 ${
                  index === 0
                    ? "border-[#E25B32] text-[#E25B32]"
                    : "border-black"
                } rounded-full`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Section with timeline - improved for mobile */}
      <div className="my-8 mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl font-bold mb-6">Schedule</h2>
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-[15px] top-2 bottom-0 w-1 bg-[#E25B32] opacity-30"></div>

          {event.schedule.map((dayPlan) => (
            <div key={dayPlan.day} className="relative flex mb-12 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 -top-1 h-8 w-8 rounded-full bg-[#E25B32] text-white flex items-center justify-center z-10">
                <span className="text-sm font-medium">{dayPlan.day}</span>
              </div>

              {/* Content container with left margin to make space for timeline */}
              <div className="ml-14 flex flex-col md:flex-row w-full">
                {/* Left column: day, stats, description */}
                <div className="md:w-3/5 md:pr-4">
                  <h3 className="text-xl font-bold mb-2">Day {dayPlan.day}</h3>
                  <p className="font-semibold mb-1">{dayPlan.plan}</p>
                  {dayPlan.elevation && (
                    <p className="text-gray-600 mb-1">
                      <strong>Elevation (ft):</strong> {dayPlan.elevation}
                    </p>
                  )}
                  {dayPlan.distance && (
                    <>
                      <p className="text-gray-600 mb-1">
                        <strong>Distance:</strong> {dayPlan.distance}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <strong>Hiking Time:</strong> {dayPlan.hikingTime}
                      </p>
                      <p className="text-gray-600 mb-4">
                        <strong>Habitat:</strong> {dayPlan.habitat}
                      </p>
                      <p className="mb-4">
                        {dayPlan.description || dayPlan.plan}
                      </p>
                    </>
                  )}
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
            </div>
          ))}
        </div>
      </div>

      {/* Image Gallery - Responsive */}
      <div className="my-12 mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl font-bold mb-6">Gallery</h2>
        <div className="relative">
          {/* Main image */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-lg">
            <img
              src={images[currentImageIndex]}
              alt={`${event.heading} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={() => handleImageChange("prev")}
                  className="bg-black/30 hover:bg-black/50 text-white h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => handleImageChange("next")}
                  className="bg-black/30 hover:bg-black/50 text-white h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`h-16 sm:h-20 w-auto cursor-pointer rounded-md transition-opacity ${
                    idx === currentImageIndex
                      ? "opacity-100 ring-2 ring-[#E25B32]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section - Responsive Accordion */}
      <div className="my-12 mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {[
            {
              question: "What should I pack for this trek?",
              answer:
                "For this trek, we recommend packing lightweight, moisture-wicking clothing, a sturdy pair of hiking boots, a rain jacket, a hat, sunscreen, a water bottle, and a daypack. Don't forget your personal medications and toiletries.",
            },
            {
              question: "What is the difficulty level of this trek?",
              answer:
                "This trek is rated as moderate difficulty. It's suitable for beginners with reasonable fitness levels as well as experienced trekkers. Some sections may be challenging but are manageable with proper guidance from our instructors.",
            },
            {
              question: "Is transportation included in the package?",
              answer:
                "Yes, transportation from the meeting point to the trekking location and back is included in the package. Details about the meeting point will be shared after booking confirmation.",
            },
            {
              question: "What is the cancellation policy?",
              answer:
                "You can cancel up to 14 days before the trek date for a full refund. Cancellations between 7-14 days will receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations less than 7 days before the event.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <details className="group">
                <summary className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <span className="transition-transform group-open:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* Book Now CTA - Responsive */}
      <div className="my-12 mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8">
        <div className="bg-[#F5E4DA] p-6 sm:p-8 rounded-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Ready to Join This Adventure?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Book your spot now to secure your place on this amazing journey.
            Limited spots available!
          </p>
          <button
            onClick={openBookingModal}
            className="inline-block bg-[#E25B32] hover:bg-[#d04d27] text-white font-semibold py-3 px-8 rounded-md transition-colors text-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
