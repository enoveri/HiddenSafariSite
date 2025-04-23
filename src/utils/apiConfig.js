/**
 * API configuration constants
 */

// Base API URL from environment variables
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3005/api/v1";

// API endpoints
export const ENDPOINTS = {
  HIGHLIGHTED_EVENTS: `${API_BASE_URL}/events/highlighted-events`,
  SNOW_TREKS_EVENTS: `${API_BASE_URL}/events/snow-treks-events`,
  SUMMER_EVENTS: `${API_BASE_URL}/events/summer-events`,
  EPIC_ADVENTURE_EVENTS: `${API_BASE_URL}/events/epic-adventure-events`,
  SPECIAL_EVENTS: `${API_BASE_URL}/events/special-events`,
  TESTIMONIALS: `${API_BASE_URL.replace(
    "/api/v1",
    ""
  )}/api/v1/info/testimonials`,
};

// Get endpoint by category
export const getEndpointByCategory = (category) => {
  const normalizedCategory = category.toLowerCase().replace(/-/g, "_");
  const endpointKey = `${normalizedCategory.toUpperCase()}_EVENTS`;

  return ENDPOINTS[endpointKey] || `${API_BASE_URL}/events/${category}-events`;
};

// API token from environment variable - more secure than hardcoding
export const API_TOKEN = import.meta.env.VITE_API_TOKEN || "";
