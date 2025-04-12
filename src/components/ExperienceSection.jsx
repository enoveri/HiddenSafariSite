// src/components/ExperienceSection.jsx
import React, { useState, useEffect } from "react";

const ExperienceSection = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // You can replace this static data with an API call later if needed.
    setVideos([
      { id: 1, imageUrl: "/path/to/beautiful-woman-with-backpack-smiling.jpg" },
      { id: 2, imageUrl: "/path/to/mother-with-cute-son-winter-oark.jpg" },
      {
        id: 3,
        imageUrl:
          "/path/to/woman-with-man-photographing-while-traveling-vehicle.jpg",
      },
      {
        id: 4,
        imageUrl: "/path/to/indian-men-resting-by-bonfire-with-their-camel.jpg",
      },
    ]);
  }, []);

  return (
    <section className="py-12 px-8 bg-[#ECD1D1]" id="experience-yourself">
      <h2 className="text-3xl font-poppins font-medium text-maroon mb-4">
        Experience yourself
      </h2>
      <p className="mb-8 text-lg text-darkBrown">
        Exclusive footage from our camps
      </p>
      <div className="flex space-x-4 overflow-x-scroll">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative min-w-[547px] h-[368px] rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={video.imageUrl}
              alt={`Video ${video.id}`}
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 w-16 h-16 flex items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
