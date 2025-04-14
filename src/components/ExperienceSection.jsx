// src/components/ExperienceSection.jsx
import React, { useState, useEffect } from "react";

const ExperienceSection = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // You can replace this static data with an API call later if needed.
    setVideos([
      {
        id: 1,
        imageUrl:
          "https://img.freepik.com/free-photo/beautiful-woman-with-backpack-smiling_176420-4203.jpg",
      },
      {
        id: 2,
        imageUrl:
          "https://img.freepik.com/free-photo/mother-with-cute-son-winter-oark_1157-19263.jpg",
      },
      {
        id: 3,
        imageUrl:
          "https://img.freepik.com/free-photo/woman-with-man-photographing-while-traveling-vehicle_107420-9769.jpg",
      },
      {
        id: 4,
        imageUrl:
          "https://img.freepik.com/free-photo/indian-men-resting-by-bonfire-with-their-camel_53876-47057.jpg",
      },
    ]);
  }, []);

  return (
    <section
      className="w-full items-center py-12 px-8 bg-[#ECD1D1]"
      id="experience-yourself"
    >
      <div className="mx-8 ">
        <h2 className="text-3xl font-poppins font-medium text-maroon mb-4">
          Experience yourself
        </h2>
        <p className="mb-8 text-lg text-darkBrown">
          Exclusive footage from our camps
        </p>
      </div>

      <div className="flex space-x-4 justify-between gap-x-4 overflow-x-scroll hide-scrollbar">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative min-w-[547px] h-[368px] rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={video.imageUrl}
              alt={`Video ${video.id}`}
              className="w-full h-full object-cover gap-3"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-transparent">
              <div className="bg-red-600 w-16 h-16 flex items-center justify-center rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
