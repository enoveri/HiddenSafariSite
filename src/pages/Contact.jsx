import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../utils/apiConfig";

const Contact = () => {
  const [contactData, setContactData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/contact`);
        if (response.data) {
          setContactData(response.data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError("Failed to load office locations. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Office Card Component based on the provided image
  const OfficeCard = ({ office }) => (
    <div className="bg-[#FFF7F7] rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium text-black mb-4">{office.name}</h3>

      <p className="text-gray-800 text-sm mb-4 leading-relaxed">
        {office.address}
      </p>

      <p className="text-gray-800 text-sm mb-6">
        Office Timings: {office.timings}
      </p>

      {office.phoneNumbers?.map((phone, index) => (
        <div
          key={index}
          className="flex items-center text-[#E67E22] mb-2 text-sm"
        >
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          <a href={`tel:${phone}`} className="hover:underline">
            {phone}
          </a>
        </div>
      ))}

      <div className="text-right mt-6">
        <a
          href={
            office.mapUrl ||
            `https://maps.google.com/?q=${encodeURIComponent(office.address)}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E67E22] hover:underline inline-flex items-center text-sm"
        >
          View On Map{" "}
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="ml-1 text-xs"
          />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Orange header section */}
      <section className="w-full bg-[#E25B32] pt-20 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-xl text-white mt-2">
            Reach out to us for any inquiries or assistance
          </p>
        </div>
      </section>

      {/* Contact Form and Office Locations */}
      <main className="flex flex-col items-center py-10 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Office Locations Grid - Updated to match the image layout */}
          <h2 className="text-2xl font-semibold text-[#E25B32] mb-8">
            Office Locations
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#E25B32]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {contactData.map((office, index) => (
                <OfficeCard key={index} office={office} />
              ))}
            </div>
          )}

          {/* Contact Form Section */}
          <div className="mx-auto max-w-lg">
            <h2 className="text-2xl font-semibold text-[#E25B32] mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E25B32] focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E25B32] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E25B32] focus:border-transparent"
                  placeholder="Message subject"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E25B32] focus:border-transparent"
                  rows="5"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#E25B32] hover:bg-[#D85732] text-white py-3 px-6 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
