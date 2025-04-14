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
    <div className="relative w-[300px] h-[380px] rounded-lg shadow-lg overflow-hidden">
      {/* Full-card background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.bannerImages1})` }}
      >
        {/* Add a dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Calligraphic title positioned near the bottom */}
      <h3
        className="
          absolute 
          left-1/2 
          bottom-[70px] 
          -translate-x-1/2 
          text-white 
          text-[38px] 
          leading-[45px] 
          font-[Style_Script] 
          text-center
          w-full
          px-4
          text-shadow-md
        "
      >
        {event.heading}
      </h3>

      {/* Icon row at the bottom */}
      <div
        className="
          absolute 
          left-1/2 
          bottom-[20px] 
          -translate-x-1/2 
          flex 
          items-center 
          justify-between 
          text-white 
          w-[225px] 
          h-[30px]
        "
      >
        <FontAwesomeIcon icon={faBus} className="text-xl" />
        <FontAwesomeIcon icon={faUtensils} className="text-xl" />
        <FontAwesomeIcon icon={faCampground} className="text-xl" />
        <FontAwesomeIcon icon={faPersonHiking} className="text-xl" />
        <FontAwesomeIcon icon={faBriefcaseMedical} className="text-xl" />
      </div>
    </div>
  );
};

export default HighlightedEventCard;
