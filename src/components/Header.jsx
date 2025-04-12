import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {
  faHome,
  faCalendarAlt,
  faUsers,
  faInfoCircle,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Check if current path is one that should have the orange header
  const isOrangeHeader = ['/events', '/about', '/team', '/contact'].includes(currentPath);

  return (
    <header className={clsx("relative w-full", {
      "bg-[#E25B32]": isOrangeHeader,
      "bg-transparent": !isOrangeHeader
    })}>
      {/* Navbar container */}
      <nav className={clsx("w-full", {
        "relative": isOrangeHeader,
        "absolute top-0 left-0 z-10": !isOrangeHeader
      })}>
        <div className="w-full mx-auto px-8 py-6 flex items-center justify-between">
          {/* Site name */}
          <div className="text-white text-[34px] leading-[41px] font-normal">
            HiddenSafari
          </div>

          {/* Navigation links */}
          <ul className="flex w-1/2 text-white text-lg justify-between">
            <li>
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
            <li>
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
            <li>
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
            <li>
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
            <li>
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
      </nav>
    </header>
  );
};

export default Header;
