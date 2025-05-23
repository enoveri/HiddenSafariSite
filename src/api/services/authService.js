import api from "../axios";
import { API_BASE_URL } from "../../utils/apiConfig";

// Define auth endpoints
const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  PROFILE: `${API_BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
};

/**
 * Service for handling all authentication-related API calls
 */
const authService = {
  /**
   * Log in a user
   * @param {Object} credentials - User login credentials (email/username and password)
   * @returns {Promise} Promise object with response data
   */
  login: async (credentials) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      // Store auth token if needed
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Promise object with response data
   */
  register: async (userData) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  /**
   * Log out the current user
   */
  logout: () => {
    localStorage.removeItem("authToken");
    // You can add API call to invalidate token on server if needed
  },

  /**
   * Get current user profile
   * @returns {Promise} Promise object with response data
   */
  getUserProfile: async () => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.PROFILE);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} Promise object with response data
   */
  updateUserProfile: async (profileData) => {
    try {
      const response = await api.put(
        AUTH_ENDPOINTS.UPDATE_PROFILE,
        profileData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Whether user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};

export default authService;
