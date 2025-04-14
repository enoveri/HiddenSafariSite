/**
 * Central file for all API endpoints
 * This helps maintain consistency and makes it easier to update endpoints
 */

const ENDPOINTS = {
  EVENTS: {
    HIGHLIGHTED: "/events/highlighted-events",
    SNOW_TREKS: "/events/snow-treks-events",
    SUMMER_EVENTS: "/events/summer-events",
    EPIC_ADVENTURE: "/events/epic-adventure-events",
    SPECIAL_EVENTS: "/events/special-events",
    SEARCH: "/events/search",
    DETAILS: (id) => `/events/${id}`,
  },
  USER: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
  },
  TESTIMONIALS: {
    LIST: "/testimonials",
    SUBMIT: "/testimonials",
  },
};

export default ENDPOINTS;
