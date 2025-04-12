// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#CCB2B2] border-t border-black py-6 px-8 text-black">
      {/* Constrain the content’s max width and center it */}
      <div className="mx-auto max-w-5xl flex flex-col items-center space-y-4">
        {/* Brand Title */}
        <h2 className="text-3xl font-normal mb-2">HiddenSafari</h2>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center space-x-6 text-base">
          <a href="#teams" className="hover:underline">
            Teams
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#events" className="hover:underline">
            Events
          </a>
          <a href="#contact" className="hover:underline">
            Contact US
          </a>
          <a href="#terms" className="hover:underline">
            Terms and Condition
          </a>
        </nav>

        {/* Bottom row: Email input + Social Icons */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4">
          {/* Email Form */}
          <form className="relative flex items-center mb-4 sm:mb-0">
            <input
              type="email"
              placeholder="Enter your Email"
              className="border border-gray-600 rounded-lg px-3 py-2 w-56 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="
                absolute
                right-2
                hover:bg-orange-300
                p-1.5
                rounded
                text-gray-700
              "
              aria-label="Search"
            >
              {/* Magnifying Glass Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 2a8 8 0 015.291 13.938l4.385 4.385-1.414 1.414-4.385-4.385A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
              </svg>
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.984 3.5c0 1.381-1.122 2.5-2.505 2.5C1.122 6 0 4.881 0 3.5S1.122 1 2.479 1s2.505 1.119 2.505 2.5zM.18 23h4.609v-14H.18v14zM8.902 9c-.023-.011-.045-.025-.068-.035V9h.068zm-.068 0v14h4.609V15.25c0-1.557.292-3.063 2.254-3.063 1.93 0 1.95 1.773 1.95 3.163V23h4.61v-8.066C22.257 10.729 21.008 9 17.947 9c-2.208 0-3.285 1.19-3.833 2.016h.028V9H8.834z" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.676 0H1.325C.594 0 0 .593 0 1.326v21.348C0 23.405.594 24 1.325 24h11.496v-9.294H9.847V11.02h2.974V8.412c0-2.94 1.797-4.539 4.425-4.539 1.26 0 2.339.094 2.65.135v3.073H18.09c-1.444 0-1.723.686-1.723 1.696v2.232h3.443l-.449 3.686h-2.994V24h5.867c.73 0 1.325-.595 1.325-1.326V1.326C24 .593 23.405 0 22.676 0" />
              </svg>
            </a>
            {/* Threads (Square T) */}
            <a href="#" aria-label="Threads">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-black"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path d="M0 0h384v512H0V0zm192 96c-17.67 0-32 14.33-32 32v64h-32v32h32v96h32v-96h32v-32h-32v-64c0-8.84 7.16-16 16-16h16V96h-32z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 576 512"
              >
                <path d="M549.655 124.083C560.448 129.03 568 139.355 568 151.053v209.892c0 11.698-7.552 22.022-18.345 26.97-31.096 14.308-263.552 14.308-263.552 14.308s-232.456 0-263.552-14.308C7.552 382.967 0 372.642 0 360.945V151.053c0-11.698 7.552-22.023 18.343-26.97 31.097-14.308 263.551-14.308 263.551-14.308s232.456 0 263.552 14.308zM231.142 337.757l145.998-81.757-145.998-81.757v163.514z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
