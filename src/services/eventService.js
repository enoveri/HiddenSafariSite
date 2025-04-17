import { getEndpointByCategory, API_TOKEN } from "../utils/apiConfig";

/**
 * Service for handling event-related API requests
 */
export const eventService = {
  /**
   * Fetch events by category
   * @param {string} category - The event category
   * @returns {Promise<Array>} - Array of events
   */
  async fetchEventsByCategory(category) {
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
  async getEventDetails(category, eventId) {
    try {
      const events = await this.fetchEventsByCategory(category);
      const event = events.find((event) => event.id.toString() === eventId);
      
      if (!event) {
        throw new Error(`Event with ID ${eventId} not found in category ${category}`);
      }
      
      return event;
    } catch (error) {
      console.error("Error getting event details:", error);
      throw error;
    }
  }
};
