import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faUtensils,
  faCampground,
  faPersonHiking,
  faBriefcaseMedical,
} from "@fortawesome/free-solid-svg-icons";

const HighlightedEventCard = ({ event }) => {
  return (
    <div className="relative w-[238px] h-[313px] rounded-lg shadow-md overflow-hidden">
      {/* Full-card background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.bannerImages1})` }}
      />
      {/* Calligraphic title positioned near the bottom */}
      <h3
        className="
          absolute 
          left-1/2 
          bottom-[50px] 
          -translate-x-1/2 
          text-white 
          text-[30px] 
          leading-[45px] 
          font-[Style_Script] 
          text-center
        "
      >
        {event.heading}
      </h3>
      {/* Icon row at the bottom */}
      <div
        className="
          absolute 
          left-1/2 
          bottom-[10px] 
          -translate-x-1/2 
          flex 
          items-center 
          justify-between 
          text-white 
          w-[192px] 
          h-[25px]
        "
      >
        <FontAwesomeIcon icon={faBus} />
        <FontAwesomeIcon icon={faUtensils} />
        <FontAwesomeIcon icon={faCampground} />
        <FontAwesomeIcon icon={faPersonHiking} />
        <FontAwesomeIcon icon={faBriefcaseMedical} />
      </div>
    </div>
  );
};

export default HighlightedEventCard;
