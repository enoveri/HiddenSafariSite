import React from "react";
import PropTypes from "prop-types";

/**
 * Amenity item component for displaying included services
 */
const AmenityItem = ({ icon, label }) => {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center mr-4">
        {icon}
      </div>
      <span>{label}</span>
    </div>
  );
};

AmenityItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default AmenityItem;
