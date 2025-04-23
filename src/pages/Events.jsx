import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSnowflake,
  faSun,
  faMountain,
  faStar,
  faCalendarDay,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";

// Utility function to generate random price between min and max range
const generateRandomPrice = (min = 2000, max = 10000) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([
    { id: "all", name: "All Events", icon: faStar },
  ]);

  // Store categorized events for local filtering
  const [categorizedEvents, setCategorizedEvents] = useState({});
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Map of category names to icons
  const categoryIcons = {
    SnowTreks: faSnowflake,
    SummerEvents: faSun,
    MonsoonEvents: faCalendarDay,
    EpicAdventures: faMountain,
    SpecialEvents: faStar,
    default: faMapMarkedAlt,
  };

  // Load all events data once
  useEffect(() => {
    if (initialDataLoaded) return;

    const fetchAllEvents = async () => {
      setIsLoading(true);
      try {
        const endpoint = `${API_BASE_URL}/events/all-events`;
        const response = await axios.get(endpoint);

        if (response.data && typeof response.data === "object") {
          // Process categories and events
          const dynamicCategories = [];
          const allCategorizedEvents = {};
          let allEvents = [];

          // Extract events from each category
          Object.keys(response.data).forEach((categoryKey) => {
            if (categoryKey === "HighlightedEvents") return;

            const categoryEvents = response.data[categoryKey];
            if (Array.isArray(categoryEvents)) {
              // Store events by category
              allCategorizedEvents[categoryKey] = categoryEvents;

              // Format category name for display (e.g., "SnowTreks" -> "Snow Treks")
              let categoryName = categoryKey.replace(/([A-Z])/g, " $1").trim();
              const categoryId = categoryKey.toLowerCase().replace(/\s/g, "-");

              // Format events
              const formattedEvents = categoryEvents.map((event) => ({
                id: event.id,
                title: event.heading || "Unnamed Event",
                image:
                  event.bannerImages1 ||
                  event.bannerImages2 ||
                  event.bannerImages3 ||
                  "https://via.placeholder.com/400x200?text=No+Image",
                price: generateRandomPrice(),
                duration: `${event.numberOfDays || 0} Days`,
                category: categoryKey,
                categoryId: categoryId,
              }));

              // Collect all events
              allEvents = [...allEvents, ...formattedEvents];

              // Add to categories list
              if (!dynamicCategories.some((cat) => cat.id === categoryId)) {
                dynamicCategories.push({
                  id: categoryId,
                  name: categoryName,
                  icon: categoryIcons[categoryKey] || categoryIcons["default"],
                  originalKey: categoryKey,
                });
              }
            }
          });

          // Update states
          setCategories([
            { id: "all", name: "All Events", icon: faStar },
            ...dynamicCategories,
          ]);

          setCategorizedEvents(allCategorizedEvents);

          // Randomize all events for initial display
          allEvents.sort(() => Math.random() - 0.5);
          setAllEvents(allEvents);
          setDisplayedEvents(allEvents.slice(0, visibleCount));
          setInitialDataLoaded(true);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllEvents();
  }, [initialDataLoaded, visibleCount]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setDisplayedEvents(allEvents.slice(0, visibleCount));
      return;
    }

    // Filter events based on search query
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredEvents = allEvents.filter(
      (event) =>
        (event.title && event.title.toLowerCase().includes(lowercaseQuery)) ||
        (event.price && event.price.toString().includes(lowercaseQuery)) ||
        (event.duration &&
          event.duration.toLowerCase().includes(lowercaseQuery))
    );

    setDisplayedEvents(filteredEvents);
    setVisibleCount(
      Math.max(
        6,
        filteredEvents.length < visibleCount
          ? filteredEvents.length
          : visibleCount
      )
    );
  };

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + 3;
    setVisibleCount(newVisibleCount);

    // Only update displayed events if there's an active search
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filteredEvents = allEvents.filter(
        (event) =>
          (event.title && event.title.toLowerCase().includes(lowercaseQuery)) ||
          (event.price && event.price.toString().includes(lowercaseQuery)) ||
          (event.duration &&
            event.duration.toLowerCase().includes(lowercaseQuery))
      );
      setDisplayedEvents(filteredEvents.slice(0, newVisibleCount));
    } else {
      setDisplayedEvents(allEvents.slice(0, newVisibleCount));
    }
  };

  const handleCategoryChange = (category) => {
    if (!initialDataLoaded) return;

    setActiveCategory(category);
    setVisibleCount(6);
    setSearchQuery("");

    // Filter events based on the selected category using local data
    let filteredEvents = [];

    if (category === "all") {
      // For "all" category, combine all events
      filteredEvents = Object.keys(categorizedEvents)
        .flatMap((categoryKey) =>
          categorizedEvents[categoryKey].map((event) => ({
            id: event.id,
            title: event.heading || "Unnamed Event",
            image:
              event.bannerImages1 ||
              event.bannerImages2 ||
              event.bannerImages3 ||
              "https://via.placeholder.com/400x200?text=No+Image",
            price: generateRandomPrice(),
            duration: `${event.numberOfDays || 0} Days`,
            category: categoryKey,
          }))
        )
        .sort(() => Math.random() - 0.5);
    } else {
      // For a specific category
      const selectedCategory = categories.find((cat) => cat.id === category);
      if (selectedCategory?.originalKey) {
        const categoryEvents =
          categorizedEvents[selectedCategory.originalKey] || [];
        filteredEvents = categoryEvents.map((event) => ({
          id: event.id,
          title: event.heading || "Unnamed Event",
          image:
            event.bannerImages1 ||
            event.bannerImages2 ||
            event.bannerImages3 ||
            "https://via.placeholder.com/400x200?text=No+Image",
          price: generateRandomPrice(),
          duration: `${event.numberOfDays || 0} Days`,
          category: selectedCategory.originalKey,
        }));
      }
    }

    setAllEvents(filteredEvents);
    setDisplayedEvents(filteredEvents.slice(0, 6));
  };

  const EventCard = ({ event }) => (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
        }}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-700">
            {event.price ? `From $ ${event.price}` : "Price upon request"}
          </p>
          <p className="text-gray-600 text-sm">
            {event.duration || "Flexible"}
          </p>
        </div>
      </div>
    </div>
  );

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
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full max-w-md"
            >
              <input
                type="text"
                placeholder="Search Here"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 px-4 rounded-full text-gray-700 bg-white focus:outline-none"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-6 rounded-r-full bg-[#D85732] text-white flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main content with sidebar */}
      <main className="flex flex-col md:flex-row bg-white">
        {/* Category Sidebar - visible on desktop, hidden on mobile */}
        <aside className="hidden md:block w-64 bg-gray-50 min-h-screen p-6 border-r border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Categories</h2>
          <nav>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors ${
                      activeCategory === category.id
                        ? "bg-[#E25B32] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={category.icon} className="w-5 h-5" />
                    <span>{category.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile categories dropdown (visible only on mobile) */}
        <div className="md:hidden w-full bg-gray-50 p-4 border-b border-gray-200">
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Events content */}
        <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E25B32]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
              </div>
            ) : displayedEvents.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No events found for this category.
                </p>
              </div>
            ) : (
              <>
                {/* Event cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {displayedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {/* Load More button - only show if there are more events to load */}
                {visibleCount < allEvents.length && (
                  <div className="flex justify-center mb-12">
                    <button
                      onClick={handleLoadMore}
                      className="bg-[#E25B32] hover:bg-[#D85732] text-white font-medium py-2 px-6 rounded-full transition duration-300"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Events;
