import api from "../axios";
import ENDPOINTS from "../endpoints";

/**
 * Service for handling all testimonial-related API calls
 */
const testimonialService = {
  /**
   * Get all testimonials
   * @returns {Promise} Promise object with response data
   */
  getTestimonials: async () => {
    try {
      const response = await api.get(ENDPOINTS.TESTIMONIALS.LIST);
      return response.data;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      throw error;
    }
  },

  /**
   * Submit a new testimonial
   * @param {Object} testimonialData - Testimonial data to submit
   * @returns {Promise} Promise object with response data
   */
  submitTestimonial: async (testimonialData) => {
    try {
      const response = await api.post(
        ENDPOINTS.TESTIMONIALS.SUBMIT,
        testimonialData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      throw error;
    }
  },
};

export default testimonialService;
