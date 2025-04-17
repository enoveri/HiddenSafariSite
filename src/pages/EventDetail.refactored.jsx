import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaUtensils, FaHotel, FaCar, FaFirstAid, FaBoxOpen, FaChalkboardTeacher } from "react-icons/fa";

// Import custom components
import ImageCarousel from "../components/EventDetail/ImageCarousel";
import AmenityItem from "../components/EventDetail/AmenityItem";
import { LoadingState, ErrorState } from "../components/EventDetail/LoadingAndError";

// Import services
import { eventService } from "../services/eventService";

/**
 * Event Detail Page Component
 * Displays detailed information about a specific event
 */
const EventDetail = () => {
  // Get route parameters
  const { category, eventId } = useParams();
  
  // Component state
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);

  // Fetch event data when component mounts or parameters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const eventData = await eventService.getEventDetails(category, eventId);
        setEvent(eventData);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, category]);

  // Handle image carousel navigation
  const handleImageChange = (direction) => {
    if (!event) return;
    
    const images = [event.bannerImages1, event.bannerImages2, event.bannerImages3].filter(Boolean);
    
    if (typeof direction === "number") {
      // If direction is a number, it's a direct index selection
      setCurrentImageIndex(direction);
    } else if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Show loading state
  if (loading) {
    return <LoadingState />;
  }

  // Show error state
  if (error || !event) {
    return <ErrorState errorMessage={error} />;
  }

  // Filter out any null/undefined images
  const images = [event.bannerImages1, event.bannerImages2, event.bannerImages3].filter(Boolean);

  // Amenities data for the sidebar
  const amenities = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#E25B32]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
          <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16z" />
        </svg>
      ),
      label: "Food"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#E25B32]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
          <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
        </svg>
      ),
      label: "Accommodation"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#E25B32]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
        </svg>
      ),
      label: "Travelling"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#E25B32]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H96V32H64zm64 0V480H448V32H128zM512 480c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H480V480h32zM256 176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H320v48c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V288H208c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16h48V176z" />
        </svg>
      ),
      label: "First Aid"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#E25B32]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
        </svg>
      ),
      label: "Accessories"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#E25B32]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
        </svg>
      ),
      label: "Instructor"
    }
  ];

  // Features icons for the main content area
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
          <path d="M152 64h144V24c0-13.25 10.7-24 24-24s24 10.75 24 24v40h40c35.3 0 64 28.65 64 64v320c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V128c0-35.35 28.65-64 64-64h40V24c0-13.25 10.7-24 24-24s24 10.75 24 24v40zM48 248h80v-56h-80v56zm0 48v64h80v-64h-80zm128 0v64h96v-64h-96zm144 0v64h80v-64h-80zm80-104h-80v56h80v-56zm-128 56h96v-56h-96v56z" />
        </svg>
      )
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
          <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z" />
        </svg>
      )
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
          <path d="M184 88c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm19.4-63.8c0-.1 0-.2 0-.2c0 .1 0 .1 0 .2zm-431.8 0c0-.1 0-.1 0-.2c0 0 0 .1 0 .2zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM512 88c0-30.9-25.1-56-56-56s-56 25.1-56 56s25.1 56 56 56s56-25.1 56-56zM320 160c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" />
        </svg>
      )
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
          <path d="M384.3 309.1l15.71 93.46c2.004 11.92-11.48 20.11-21.91 13.2L288 348l-90.05 67.82c-10.44 6.893-23.92-1.328-21.91-13.2l15.71-93.46-66.84-67.2c-7.694-7.75-3.443-21.31 7.1-22.94l94.01-14.05L266.7 122.4c4.859-10.11 19.74-10.11 24.59 0l40.73 82.62l94.01 14.05c10.54 1.631 14.79 15.19 7.1 22.94L384.3 309.1zM574.1 443.6c-10.44 6.895-23.92-1.328-21.91-13.2l15.71-93.46l-66.84-67.2c-7.694-7.75-3.443-21.31 7.1-22.94l94.01-14.05l40.73-82.62c4.859-10.12 19.74-10.12 24.59 0l40.73 82.62l94.01 14.05c10.54 1.631 14.79 15.19 7.1 22.94l-66.84 67.2l15.71 93.46c2.004 11.92-11.48 20.11-21.91 13.2L576 391.8l-90.05 67.84c-10.44 6.893-23.92-1.328-21.91-13.2l15.71-93.46l-66.84-67.2c-7.694-7.75-3.443-21.31 7.1-22.94l94.01-14.05l40.73-82.62c4.859-10.11 19.74-10.11 24.59 0l40.73 82.62l94.01 14.05c10.54 1.631 14.79 15.19 7.1 22.94l-66.84 67.2l15.71 93.46c2.004 11.92-11.48 20.11-21.91 13.2L576 391.8L485.9 459.6z" />
        </svg>
      )
    }
  ];

  // Main render
  return (
    <div className="bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            <h1 className="text-5xl font-medium text-[#7d4744] mb-3">
              {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
            </h1>
            <p className="text-2xl text-[#5a4a42] mb-6">Embark on an unforgettable adventure</p>
            <h2 className="text-4xl mb-8">{event.heading || "Adventure"}</h2>

            {/* Image carousel */}
            {images.length > 0 && (
              <ImageCarousel 
                images={images} 
                currentIndex={currentImageIndex} 
                onChangeImage={handleImageChange} 
              />
            )}

            {/* Features section */}
            <div className="flex space-x-16 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto text-[#7d4744]">
                    {feature.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Event description */}
            <div className="prose prose-lg max-w-none mb-8">
              <h3 className="text-2xl font-medium mb-4">About this event</h3>
              <p>{event.description || "Join us for an exciting adventure in the heart of nature."}</p>
            </div>

            {/* Itinerary section */}
            {event.itinerary && (
              <div className="mt-10">
                <h3 className="text-2xl font-medium mb-6">Itinerary</h3>
                <div className="space-y-6">
                  {Array.from({ length: event.days || 3 }).map((_, index) => (
                    <div 
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedDay === index + 1 ? "border-[#E25B32] bg-[#FFF3E0]" : "border-gray-200"
                      }`}
                      onClick={() => setSelectedDay(index + 1)}
                    >
                      <h4 className="font-medium">Day {index + 1}</h4>
                      <p className="text-gray-600">
                        {event.itinerary[`day${index + 1}`] || "Details coming soon"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-4xl font-bold mb-2">
                ₹{event.price || "7,999"} <span className="text-2xl font-normal">/ person</span>
              </h2>

              <h3 className="text-2xl font-medium mt-8 mb-6">Includes</h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {amenities.map((amenity, index) => (
                  <AmenityItem 
                    key={index} 
                    icon={amenity.icon} 
                    label={amenity.label} 
                  />
                ))}
              </div>

              <button className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-medium py-4 px-6 rounded-lg mt-12 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;
