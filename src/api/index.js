import api from "./axios";
import ENDPOINTS from "./endpoints";
import { authService, eventService, testimonialService } from "./services";

/**
 * API Module
 * Central export point for all API functionality
 */
export { api, ENDPOINTS, authService, eventService, testimonialService };
