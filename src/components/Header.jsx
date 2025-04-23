import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import SignInModal from "./SignInModal";
import {
  faHome,
  faCalendarAlt,
  faUsers,
  faInfoCircle,
  faPhone,
  faBars,
  faTimes,
  faUser,
  faCaretDown,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check if current path is one that should have the orange header
  const isOrangeHeader = [
    "/events",
    "/about",
    "/team",
    "/contact",
    "/terms-and-conditions", // Added Terms and Conditions path
  ].includes(currentPath);

  // Check for existing user session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing stored user data");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsProfileOpen(false);
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
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between">
          {/* Site Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo-no-background.png"
              alt="Hidden Safari Logo"
              className="h-16 md:h-20 lg:h-20"
            />
          </Link>

          <div className="flex items-center">
            {/* Desktop Navigation links */}
            <ul className="hidden lg:flex w-auto text-white text-lg mr-8">
              <li className="mx-2 xl:mx-4">
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
              <li className="mx-2 xl:mx-4">
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
              <li className="mx-2 xl:mx-4">
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
              <li className="mx-2 xl:mx-4">
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
              <li className="mx-2 xl:mx-4">
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

            {/* User Sign In / Profile Button */}
            <div className="relative hidden lg:block">
              {user ? (
                // Authenticated user view
                <button
                  className="flex items-center bg-white/20 hover:bg-white/30 text-white rounded-full py-2 px-4 transition-all"
                  onClick={toggleProfile}
                >
                  <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-[#E25B32] mr-2">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <span className="mr-1">{user.name}</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              ) : (
                // Sign In button for non-authenticated users
                <button
                  className="flex items-center bg-white/20 hover:bg-white/30 text-white rounded-full py-2 px-4 transition-all"
                  onClick={openSignInModal}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Profile Dropdown - only shown when authenticated and dropdown is open */}
              {user && isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Profile
                  </NavLink>
                  <hr className="my-1" />
                  <button
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              {/* Small User Icon for Mobile */}
              <button
                className="mr-4 text-white text-2xl"
                onClick={user ? toggleProfile : openSignInModal}
              >
                <FontAwesomeIcon icon={user ? faUser : faSignInAlt} />
              </button>

              <button
                className="text-white text-2xl focus:outline-none"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
              </button>
            </div>
          </div>
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

              {/* User profile options in mobile menu - only if authenticated */}
              {user && (
                <>
                  <li className="pt-2 border-t border-white/30">
                    <NavLink
                      to="/profile"
                      className="hover:text-yellow-300 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="w-full text-left text-red-300 hover:text-red-200 flex items-center"
                      onClick={handleSignOut}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Sign Out
                    </button>
                  </li>
                </>
              )}

              {/* Sign In button in mobile menu - only if not authenticated */}
              {!user && (
                <li className="pt-2 border-t border-white/30">
                  <button
                    className="hover:text-yellow-300 flex items-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openSignInModal();
                    }}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    Sign In
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={closeSignInModal}
        onSignIn={handleSignIn}
      />
    </header>
  );
};

export default Header;
