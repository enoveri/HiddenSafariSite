import api from "../axios";
import ENDPOINTS from "../endpoints";

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
      const response = await api.get(ENDPOINTS.EVENTS.HIGHLIGHTED);
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
      const response = await api.get(ENDPOINTS.EVENTS.SNOW_TREKS);
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
      const response = await api.get(ENDPOINTS.EVENTS.SUMMER_EVENTS);
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
      const response = await api.get(ENDPOINTS.EVENTS.EPIC_ADVENTURE);
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
      const response = await api.get(ENDPOINTS.EVENTS.SPECIAL_EVENTS);
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
      const response = await api.get(ENDPOINTS.EVENTS.DETAILS(eventId));
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
      const response = await api.get(ENDPOINTS.EVENTS.SEARCH, {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      console.error("Error searching events:", error);
      throw error;
    }
  },
};

export default eventService;
