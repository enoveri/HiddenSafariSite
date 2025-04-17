/**
 * API configuration constants
 */

// Base API URL
export const API_BASE_URL = "http://54.210.95.246:3005/api/v1";

// API endpoints
export const ENDPOINTS = {
  HIGHLIGHTED_EVENTS: `${API_BASE_URL}/events/highlighted-events`,
  SNOW_TREKS_EVENTS: `${API_BASE_URL}/events/snow-treks-events`,
  SUMMER_EVENTS: `${API_BASE_URL}/events/summer-events`,
  EPIC_ADVENTURE_EVENTS: `${API_BASE_URL}/events/epic-adventure-events`,
  SPECIAL_EVENTS: `${API_BASE_URL}/events/special-events`,
};

// Get endpoint by category
export const getEndpointByCategory = (category) => {
  const normalizedCategory = category.toLowerCase().replace(/-/g, "_");
  const endpointKey = `${normalizedCategory.toUpperCase()}_EVENTS`;
  
  return ENDPOINTS[endpointKey] || `${API_BASE_URL}/events/${category}-events`;
};

// API token - In a real application, this should be stored securely
export const API_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMzc2NzgsImV4cCI6MTcyOTMyMTY3OCwiaXNzIjoidXJuOmlzc3VlciJ9.ktWmxeC4NqHv1_W0qKt0avlCaDPBNivvDStv6BwHu9K5Geq9TegxH-S1cPfiRhcGdH30YUg1iDShFNOW7mBSwoKsVMMzWJfaqlN0aG1ELh3m9EL-GepR6gxQ5YkZQ9WfBGeoRDNHyYtq02ajgbRLrueuovCf5Nz9iu-ig0onh9XnZJ7J1kEQF3C6gjB0jLqJ8UcWY72S_O0_6tfq8lFuAXQjYbonMCAsx_hG-wJkmE8hlfcgN6BlcemZq-cTghJVNswBmzSoqgTEW1UnBYVoVOyptFQfVFOjdpRUaAlE4R0JHoRfFLR9vsxxvO5Y_x3Z8Eqfcq7O2CPGGPG_5yxt7w";
