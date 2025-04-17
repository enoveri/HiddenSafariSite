// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#CCB2B2] border-t border-black py-3">
      {/* Constrain the content's max width and center it */}
      <div className="mx-auto max-w-6xl px-8 flex flex-col">
        {/* Brand Title */}
        <h2 className="text-3xl font-normal text-center mb-2">HiddenSafari</h2>

        {/* Navigation Links */}
        <nav className="flex justify-center space-x-10 text-base mb-3">
          <Link to="/team" className="hover:underline">
            Teams
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/events" className="hover:underline">
            Events
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact US
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms and Condition
          </Link>
        </nav>

        {/* Bottom row: Email input + Social Icons */}
        <div className="w-full flex items-center justify-between">
          {/* Email Form */}
          <form className="relative flex items-center border-1 rounded-3xl border-b-gray-700">
            <input
              type="email"
              placeholder="Enter your Email"
              className=" px-3 py-1 w-36 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 border-0 outline-none"
            />
            <button
              type="submit"
              className="items-center p-3 h-full  rounded-3xl bg-gray-700"
              aria-label="Submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-x-2">
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="bg-white p-1 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#0A66C2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="bg-white p-1 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#1877F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="#"
              aria-label="Twitter"
              className="bg-white p-1 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="bg-white p-1 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#FF0000]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
