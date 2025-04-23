import api from "../axios";
import {
  ENDPOINTS,
  getEndpointByCategory,
  API_BASE_URL,
  API_TOKEN,
} from "../../utils/apiConfig";

/**
 * Service for handling all event-related API calls
 */
const eventService = {
  /**
   * Fetch highlighted events
   * @returns {Promise} Promise object with response data
   */
  getHighlightedEvents: async () => {
    try {
      const response = await api.get(ENDPOINTS.HIGHLIGHTED_EVENTS);
      return response.data;
    } catch (error) {
      console.error("Error fetching highlighted events:", error);
      throw error;
    }
  },

  /**
   * Fetch snow trek events
   * @returns {Promise} Promise object with response data
   */
  getSnowTrekEvents: async () => {
    try {
      const response = await api.get(ENDPOINTS.SNOW_TREKS_EVENTS);
      return response.data;
    } catch (error) {
      console.error("Error fetching snow trek events:", error);
      throw error;
    }
  },

  /**
   * Fetch summer events
   * @returns {Promise} Promise object with response data
   */
  getSummerEvents: async () => {
    try {
      const response = await api.get(ENDPOINTS.SUMMER_EVENTS);
      return response.data;
    } catch (error) {
      console.error("Error fetching summer events:", error);
      throw error;
    }
  },

  /**
   * Fetch epic adventure events
   * @returns {Promise} Promise object with response data
   */
  getEpicAdventureEvents: async () => {
    try {
      const response = await api.get(ENDPOINTS.EPIC_ADVENTURE_EVENTS);
      return response.data;
    } catch (error) {
      console.error("Error fetching epic adventure events:", error);
      throw error;
    }
  },

  /**
   * Fetch special events
   * @returns {Promise} Promise object with response data
   */
  getSpecialEvents: async () => {
    try {
      const response = await api.get(ENDPOINTS.SPECIAL_EVENTS);
      return response.data;
    } catch (error) {
      console.error("Error fetching special events:", error);
      throw error;
    }
  },

  /**
   * Fetch event details by ID
   * @param {string} eventId - ID of the event
   * @returns {Promise} Promise object with response data
   */
  getEventById: async (eventId) => {
    try {
      const response = await api.get(`${API_BASE_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Search events by query parameters
   * @param {Object} searchParams - Search parameters
   * @returns {Promise} Promise object with response data
   */
  searchEvents: async (searchParams) => {
    try {
      const response = await api.get(`${API_BASE_URL}/events/search`, {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      console.error("Error searching events:", error);
      throw error;
    }
  },

  /**
   * Get events by category
   * @param {string} category - Category name
   * @returns {Promise} Promise object with response data
   */
  getEventsByCategory: async (category) => {
    try {
      const endpoint = getEndpointByCategory(category);
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${category} events:`, error);
      throw error;
    }
  },

  /**
   * Fetch events by category (alternative implementation using fetch API)
   * @param {string} category - The event category
   * @returns {Promise<Array>} - Array of events
   */
  fetchEventsByCategory: async (category) => {
    try {
      const apiEndpoint = getEndpointByCategory(category);

      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  /**
   * Find a specific event by ID within a category
   * @param {string} category - The event category
   * @param {string} eventId - The event ID to find
   * @returns {Promise<Object>} - The found event object
   */
  getEventDetails: async (category, eventId) => {
    try {
      const events = await eventService.fetchEventsByCategory(category);
      const event = events.find((event) => event.id.toString() === eventId);

      if (!event) {
        throw new Error(
          `Event with ID ${eventId} not found in category ${category}`
        );
      }

      return event;
    } catch (error) {
      console.error("Error getting event details:", error);
      throw error;
    }
  },
};

export default eventService;
