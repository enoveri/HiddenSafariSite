// src/components/HeroSection.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faUsers,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[558px] bg-[url('https://i.pinimg.com/736x/7c/3d/eb/7c3debabe5fa0b4bd486c549328fd483.jpg')] bg-cover bg-center">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center pl-8">
        {/* Title split into two lines */}
        <div className="flex h-full">
          <div className="flex w-1/2 flex-col justify-end">
            <h1 className="justify-self-center text-5xl md:text-[55px] font-poppins font-medium text-white leading-tight">
              Experience <br />
              Nature
            </h1>
            <div className="">
              <p className="h-2/3 text-3xl font-poppins text-white w-3/4 tracking-wide">
                India's Largest Trekking Organization
              </p>

              {/* Stats with icons */}
              <div className="mt-8 py-8 flex space-x-8 justify-between">
                {/* Participants */}
                <div className="flex items-center text-white">
                  <FontAwesomeIcon
                    icon={faMountain}
                    className="text-2xl mb-1"
                  />
                  <span className="text-lg font-poppins font-medium ml-2">
                    2,11,500+
                  </span>
                  <span className="text-sm ml-1">Participants</span>
                </div>

                {/* Volunteers */}
                <div className="flex items-center text-white">
                  <FontAwesomeIcon icon={faUsers} className="text-2xl mb-1" />
                  <span className="text-lg font-poppins font-medium ml-2">
                    2750+
                  </span>
                  <span className="text-sm ml-1">Volunteers</span>
                </div>

                {/* Events */}
                <div className="flex items-center text-white">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-2xl mb-1"
                  />
                  <span className="text-lg font-poppins font-medium ml-2">
                    68+
                  </span>
                  <span className="text-sm ml-1">Events</span>
                </div>

                {/* Years */}
                <div className="flex items-center text-white">
                  <FontAwesomeIcon icon={faClock} className="text-2xl mb-1" />
                  <span className="text-lg font-poppins font-medium ml-2">
                    11
                  </span>
                  <span className="text-sm ml-1">Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
