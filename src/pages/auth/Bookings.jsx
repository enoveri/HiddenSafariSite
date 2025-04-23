import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faClock,
  faUsers,
  faFilter,
  faSearch,
  faFileDownload,
  faEye,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock bookings data - would normally come from API
  const bookingsData = {
    upcoming: [
      {
        id: "BK-2025-1234",
        title: "African Safari Adventure",
        destination: "Tanzania, East Africa",
        image:
          "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        startDate: "May 10, 2025",
        endDate: "May 18, 2025",
        duration: "9 days",
        price: 4200.0,
        status: "Confirmed",
        participants: 2,
        itinerary: [
          {
            day: 1,
            activity:
              "Arrival in Arusha, Tanzania. Welcome dinner and briefing.",
          },
          {
            day: 2,
            activity:
              "Transfer to Serengeti National Park. Afternoon game drive.",
          },
          { day: 3, activity: "Full day safari in Serengeti National Park." },
          {
            day: 4,
            activity: "Morning hot air balloon safari. Afternoon game drive.",
          },
          { day: 5, activity: "Transfer to Ngorongoro Conservation Area." },
          { day: 6, activity: "Full day safari in Ngorongoro Crater." },
          { day: 7, activity: "Visit to Maasai Village. Cultural experience." },
          {
            day: 8,
            activity: "Game drive and wildlife spotting. Farewell dinner.",
          },
          { day: 9, activity: "Transfer to Arusha. Departure." },
        ],
      },
      {
        id: "BK-2025-2513",
        title: "Mediterranean Coastal Retreat",
        destination: "Santorini, Greece",
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
        startDate: "July 5, 2025",
        endDate: "July 12, 2025",
        duration: "8 days",
        price: 3600.0,
        status: "Pending Payment",
        participants: 2,
        itinerary: [
          {
            day: 1,
            activity:
              "Arrival in Santorini. Hotel check-in and welcome dinner.",
          },
          {
            day: 2,
            activity: "Oia village tour. Sunset viewing at the castle.",
          },
          {
            day: 3,
            activity:
              "Catamaran cruise around the caldera. Swimming in hot springs.",
          },
          { day: 4, activity: "Wine tasting tour of local vineyards." },
          { day: 5, activity: "Beach day at Red Beach. Evening at leisure." },
          { day: 6, activity: "Visit to Ancient Thera archaeological site." },
          {
            day: 7,
            activity: "Cooking class with local chef. Farewell dinner.",
          },
          { day: 8, activity: "Departure day." },
        ],
      },
    ],
    past: [
      {
        id: "BK-2025-0987",
        title: "Northern Lights Expedition",
        destination: "Tromsø, Norway",
        image:
          "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        startDate: "January 5, 2025",
        endDate: "January 11, 2025",
        duration: "7 days",
        price: 3800.0,
        status: "Completed",
        participants: 2,
        rating: 5,
        review:
          "An absolutely magical experience! We saw the aurora borealis three nights in a row. The dog sledding was a highlight too.",
        itinerary: [
          {
            day: 1,
            activity: "Arrival in Tromsø. Hotel check-in and welcome dinner.",
          },
          {
            day: 2,
            activity: "City tour of Tromsø. Evening Northern Lights hunt.",
          },
          {
            day: 3,
            activity: "Dog sledding adventure. Evening aurora viewing.",
          },
          {
            day: 4,
            activity: "Visit to Sami reindeer camp. Cultural experience.",
          },
          {
            day: 5,
            activity:
              "Snowmobile safari. Evening Northern Lights photography workshop.",
          },
          { day: 6, activity: "Fjord cruise. Farewell dinner." },
          { day: 7, activity: "Departure day." },
        ],
      },
      {
        id: "BK-2024-4567",
        title: "Mount Everest Base Camp Trek",
        destination: "Nepal, Himalayas",
        image:
          "https://images.unsplash.com/photo-1486911278844-a81c5267e227?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        startDate: "March 5, 2025",
        endDate: "March 19, 2025",
        duration: "15 days",
        price: 5200.0,
        status: "Completed",
        participants: 1,
        rating: 5,
        review:
          "Life-changing experience! The guides were excellent and the views were breathtaking. Challenging but incredibly rewarding.",
        itinerary: [
          {
            day: 1,
            activity:
              "Arrival in Kathmandu. Hotel check-in and welcome dinner.",
          },
          {
            day: 2,
            activity: "Flight to Lukla (2,860m). Trek to Phakding (2,610m).",
          },
          { day: 3, activity: "Trek to Namche Bazaar (3,440m)." },
          { day: 4, activity: "Acclimatization day in Namche Bazaar." },
          { day: 5, activity: "Trek to Tengboche (3,870m)." },
          { day: 6, activity: "Trek to Dingboche (4,360m)." },
          { day: 7, activity: "Acclimatization day in Dingboche." },
          { day: 8, activity: "Trek to Lobuche (4,940m)." },
          {
            day: 9,
            activity:
              "Trek to Gorak Shep (5,170m) and Everest Base Camp (5,364m).",
          },
          {
            day: 10,
            activity:
              "Hike to Kala Patthar (5,545m). Trek back to Pheriche (4,240m).",
          },
          { day: 11, activity: "Trek to Namche Bazaar (3,440m)." },
          { day: 12, activity: "Trek to Lukla (2,860m)." },
          { day: 13, activity: "Flight from Lukla to Kathmandu." },
          { day: 14, activity: "Free day in Kathmandu. Farewell dinner." },
          { day: 15, activity: "Departure from Kathmandu." },
        ],
      },
      {
        id: "BK-2024-7890",
        title: "Amazon Jungle Exploration",
        destination: "Manaus, Brazil",
        image:
          "https://images.unsplash.com/photo-1472168087442-7ca2e57a4a95?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
        startDate: "November 10, 2024",
        endDate: "November 17, 2024",
        duration: "8 days",
        price: 3100.0,
        status: "Completed",
        participants: 2,
        rating: 4,
        review:
          "Amazing adventure in the Amazon! The wildlife was incredible. The humidity was challenging but worth it for the experience.",
        itinerary: [
          {
            day: 1,
            activity: "Arrival in Manaus. Hotel check-in and welcome dinner.",
          },
          {
            day: 2,
            activity: "Transfer to jungle lodge. Afternoon canoe trip.",
          },
          {
            day: 3,
            activity: "Jungle hike. Night safari for nocturnal animals.",
          },
          {
            day: 4,
            activity: "Visit to indigenous village. Cultural experience.",
          },
          { day: 5, activity: "Piranha fishing. Pink dolphin spotting." },
          { day: 6, activity: "Canopy tour. Medicinal plant workshop." },
          { day: 7, activity: "Meeting of the Waters tour. Farewell dinner." },
          { day: 8, activity: "Return to Manaus. Departure." },
        ],
      },
    ],
    cancelled: [
      {
        id: "BK-2024-5678",
        title: "Japan Cherry Blossom Tour",
        destination: "Tokyo & Kyoto, Japan",
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        startDate: "April 1, 2025",
        endDate: "April 10, 2025",
        duration: "10 days",
        price: 4500.0,
        status: "Cancelled",
        cancelDate: "February 15, 2025",
        refundAmount: 4050.0,
        participants: 2,
      },
    ],
  };

  // Filter bookings by search term if one is entered
  const filterBookings = (bookings) => {
    if (!searchTerm) return bookings;

    const lowercaseSearch = searchTerm.toLowerCase();
    return bookings.filter(
      (booking) =>
        booking.title.toLowerCase().includes(lowercaseSearch) ||
        booking.destination.toLowerCase().includes(lowercaseSearch) ||
        booking.id.toLowerCase().includes(lowercaseSearch)
    );
  };

  // Get current tab's bookings
  const currentBookings = filterBookings(bookingsData[activeTab] || []);

  // Close booking details modal
  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  return (
    <>
      {/* Orange header section */}
      <section className="w-full bg-[#E25B32] pt-20 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">My Bookings</h1>
          <p className="text-xl text-white mt-2">
            Track and manage your travel adventures
          </p>
        </div>
      </section>

      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Booking filters and search */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex mb-4 md:mb-0">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-4 py-2 rounded-l-md ${
                    activeTab === "upcoming"
                      ? "bg-[#E25B32] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`px-4 py-2 ${
                    activeTab === "past"
                      ? "bg-[#E25B32] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Past
                </button>
                <button
                  onClick={() => setActiveTab("cancelled")}
                  className={`px-4 py-2 rounded-r-md ${
                    activeTab === "cancelled"
                      ? "bg-[#E25B32] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancelled
                </button>
              </div>

              <div className="w-full md:w-auto flex items-center">
                <div className="relative w-full md:w-64 mr-2">
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-[#E25B32] focus:border-[#E25B32]"
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>

                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
                >
                  <FontAwesomeIcon icon={faFilter} />
                </button>
              </div>
            </div>

            {filterOpen && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]">
                    <option>Any time</option>
                    <option>Next 30 days</option>
                    <option>Next 3 months</option>
                    <option>Next 6 months</option>
                    <option>Custom range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]">
                    <option>All statuses</option>
                    <option>Confirmed</option>
                    <option>Pending Payment</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-[#E25B32] focus:border-[#E25B32]">
                    <option>All destinations</option>
                    <option>Africa</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>North America</option>
                    <option>South America</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Bookings list */}
          {currentBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-500 mb-4 text-6xl">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No {activeTab} bookings found
              </h3>
              <p className="text-gray-500">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming trips. Explore our events to book your next adventure!"
                  : activeTab === "past"
                  ? "You don't have any past trips with us yet."
                  : "You don't have any cancelled bookings."}
              </p>
              {activeTab === "upcoming" && (
                <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#E25B32] hover:bg-[#D14B24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E25B32]">
                  Browse Events
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {currentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-auto md:h-64">
                      <img
                        src={booking.image}
                        alt={booking.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {booking.title}
                            </h3>
                            <p className="flex items-center text-gray-600 mb-4">
                              <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className="mr-2 text-[#E25B32]"
                              />
                              {booking.destination}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "Pending Payment"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "Completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="mr-2 text-[#E25B32]"
                            />
                            <div>
                              <p className="text-xs text-gray-500">Dates</p>
                              <p className="text-sm">
                                {booking.startDate} - {booking.endDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="mr-2 text-[#E25B32]"
                            />
                            <div>
                              <p className="text-xs text-gray-500">Duration</p>
                              <p className="text-sm">{booking.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faUsers}
                              className="mr-2 text-[#E25B32]"
                            />
                            <div>
                              <p className="text-xs text-gray-500">Travelers</p>
                              <p className="text-sm">
                                {booking.participants}{" "}
                                {booking.participants > 1 ? "people" : "person"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {booking.review && (
                          <div className="mb-4">
                            <div className="flex items-center mb-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < booking.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 italic">
                              {booking.review}
                            </p>
                          </div>
                        )}

                        {booking.cancelDate && (
                          <div className="text-sm text-gray-600 mb-4">
                            Cancelled on {booking.cancelDate} • $
                            {booking.refundAmount.toFixed(2)} refunded
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                        <div>
                          <p className="text-xs text-gray-500">Total Amount</p>
                          <p className="text-xl font-bold text-[#E25B32]">
                            US ${booking.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E25B32]"
                          >
                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                            View Details
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#E25B32] hover:bg-[#D14B24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E25B32]">
                            <FontAwesomeIcon
                              icon={faFileDownload}
                              className="mr-2"
                            />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Booking details modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="border-b sticky top-0 bg-white z-10">
              <div className="px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Booking Details
                </h3>
                <button
                  onClick={closeBookingDetails}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    {selectedBooking.title}
                  </h2>
                  <p className="flex items-center text-gray-600">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="mr-2 text-[#E25B32]"
                    />
                    {selectedBooking.destination}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedBooking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : selectedBooking.status === "Pending Payment"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedBooking.status === "Completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Booking Reference
                  </h4>
                  <p className="text-lg font-semibold">{selectedBooking.id}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Travel Dates
                  </h4>
                  <p className="text-lg font-semibold">
                    {selectedBooking.startDate} - {selectedBooking.endDate}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Travelers
                  </h4>
                  <p className="text-lg font-semibold">
                    {selectedBooking.participants}{" "}
                    {selectedBooking.participants > 1 ? "people" : "person"}
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="text-lg font-medium text-gray-900">
                    Itinerary Overview
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {selectedBooking.itinerary.map((day) => (
                      <div key={day.day} className="flex">
                        <div className="w-16 flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#E25B32] text-white font-medium">
                            {day.day}
                          </span>
                        </div>
                        <div className="flex-grow border-b pb-4">
                          <p>{day.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="text-lg font-medium text-gray-900">
                    Payment Information
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <p>
                      Trip Price ({selectedBooking.participants}{" "}
                      {selectedBooking.participants > 1
                        ? "travelers"
                        : "traveler"}
                      )
                    </p>
                    <p>${selectedBooking.price.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Taxes & Fees</p>
                    <p>Included</p>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <p>Total</p>
                    <p>${selectedBooking.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                {selectedBooking.status === "Pending Payment" && (
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#E25B32] hover:bg-[#D14B24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E25B32]">
                    Complete Payment
                  </button>
                )}
                {selectedBooking.status === "Confirmed" && (
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Cancel Booking
                  </button>
                )}
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <FontAwesomeIcon icon={faFileDownload} className="mr-2" />
                  Download Booking Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
