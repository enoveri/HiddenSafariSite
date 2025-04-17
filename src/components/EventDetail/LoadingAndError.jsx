import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Loading state component
 */
export const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E25B32] mx-auto mb-4"></div>
      <p className="text-lg">Loading event details...</p>
    </div>
  </div>
);

/**
 * Error state component
 */
export const ErrorState = ({ errorMessage }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to load event</h2>
      <p className="text-gray-600 mb-6">{errorMessage || "Event details not found. Please try again later."}</p>
      <Link
        to="/events"
        className="inline-block bg-[#E25B32] hover:bg-[#d04d27] text-white py-2 px-6 rounded-md transition-colors"
      >
        Back to Events
      </Link>
    </div>
  </div>
);

ErrorState.propTypes = {
  errorMessage: PropTypes.string,
};

export default { LoadingState, ErrorState };
