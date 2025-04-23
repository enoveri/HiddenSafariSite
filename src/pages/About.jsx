import React, { useState, useEffect } from "react";
import { api } from "../api";

function About() {
  const [aboutData, setAboutData] = useState({
    title: "About Us",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/info/about-us");

        if (response.data) {
          setAboutData(response.data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching about us data:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Function to parse content into sections
  const renderContentSections = () => {
    if (!aboutData.content) return null;

    // Split content by section headers (Vision, Mission, Objectives)
    const sections = aboutData.content
      .split(/\n\n(?=Vision|Mission|Objectives)/)
      .filter(Boolean);

    return sections.map((section, index) => {
      const [title, ...contentParts] = section.split("\n\n");
      const content = contentParts.join("\n\n");

      return (
        <section key={index} className="mb-12">
          <h2 className="text-2xl font-semibold text-[#E25B32] mb-4">
            {title}
          </h2>
          <p className="text-gray-700">{content}</p>
        </section>
      );
    });
  };

  return (
    <>
      {/* Orange header section */}
      <section className="w-full bg-[#E25B32] pt-20 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">{aboutData.title}</h1>
          <p className="text-xl text-white mt-2">
            Who we are & where do we stand
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <main className="flex flex-col items-center py-10 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E25B32]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            renderContentSections()
          )}
        </div>
      </main>
    </>
  );
}

export default About;
