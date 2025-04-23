import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {
  faHome,
  faCalendarAlt,
  faUsers,
  faInfoCircle,
  faPhone,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if current path is one that should have the orange header
  const isOrangeHeader = ["/events", "/about", "/team", "/contact"].includes(
    currentPath
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={clsx("relative w-full", {
        "bg-[#E25B32]": isOrangeHeader,
        "bg-transparent": !isOrangeHeader,
      })}
    >
      {/* Navbar container */}
      <nav
        className={clsx("w-full", {
          relative: isOrangeHeader,
          "absolute top-0 left-0 z-10": !isOrangeHeader,
        })}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
          {/* Site name */}
          <div className="text-white text-2xl sm:text-[34px] leading-normal sm:leading-[41px] font-normal">
            HiddenSafari
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>

          {/* Desktop Navigation links */}
          <ul className="hidden lg:flex w-auto lg:w-1/2 text-white text-lg justify-between">
            <li className="mx-2 xl:mx-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 flex items-center"
                    : "hover:text-yellow-300 flex items-center"
                }
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </NavLink>
            </li>
            <li className="mx-2 xl:mx-0">
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 flex items-center"
                    : "hover:text-yellow-300 flex items-center"
                }
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Events
              </NavLink>
            </li>
            <li className="mx-2 xl:mx-0">
              <NavLink
                to="/team"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 flex items-center"
                    : "hover:text-yellow-300 flex items-center"
                }
              >
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Team
              </NavLink>
            </li>
            <li className="mx-2 xl:mx-0">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 flex items-center"
                    : "hover:text-yellow-300 flex items-center"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About
              </NavLink>
            </li>
            <li className="mx-2 xl:mx-0">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 flex items-center"
                    : "hover:text-yellow-300 flex items-center"
                }
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#E25B32] shadow-lg z-20 py-4">
            <ul className="flex flex-col text-white text-lg space-y-4 px-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 flex items-center"
                      : "hover:text-yellow-300 flex items-center"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 flex items-center"
                      : "hover:text-yellow-300 flex items-center"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 flex items-center"
                      : "hover:text-yellow-300 flex items-center"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 flex items-center"
                      : "hover:text-yellow-300 flex items-center"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 flex items-center"
                      : "hover:text-yellow-300 flex items-center"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
