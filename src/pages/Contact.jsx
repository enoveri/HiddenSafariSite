import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function Contact() {
  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our adventures? We're here to help you plan
            your perfect trip.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Choose a topic</option>
                  <option value="booking">Booking Information</option>
                  <option value="custom">Custom Trip Planning</option>
                  <option value="existing">Existing Reservation</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="bg-gray-50 p-8 rounded-lg shadow mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-blue-600 w-5 h-5"
                    />
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>123 Adventure Way</p>
                    <p>Mountain View, CA 94043</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-blue-600 w-5 h-5"
                  />
                  <span className="ml-3 text-gray-600">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-blue-600 w-5 h-5"
                  />
                  <span className="ml-3 text-gray-600">
                    info@hiddensafari.com
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-blue-600 w-5 h-5"
                    />
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <iframe
                title="Office Location"
                className="w-full h-64 rounded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101268.17426191355!2d-122.09729193280334!3d37.39300357139309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain+View%2C+CA!5e0!3m2!1sen!2sus!4v1566341398648!5m2!1sen!2sus"
                frameBorder="0"
                allowFullScreen=""
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
