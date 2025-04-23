import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faMapMarkerAlt,
  faPencilAlt,
  faCamera,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const navigate = useNavigate();

  // Initial state from localStorage
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    phone: "+1 (555) 123-4567",
    address: "123 Travel Lane, Adventure City, CA 94123",
    bio: "Passionate traveler with a love for hiking and exploring natural wonders. Have visited over 25 countries and counting!",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        // Update userData with information from authentication
        setUserData((prevData) => ({
          ...prevData,
          name: parsedUser.name || prevData.name,
          username: parsedUser.username || prevData.username,
        }));

        // Also update form data
        setFormData((prevData) => ({
          ...prevData,
          name: parsedUser.name || prevData.name,
          username: parsedUser.username || prevData.username,
        }));
      } catch (e) {
        console.error("Error parsing stored user data");
      }
    } else {
      // Redirect to home page if no user is logged in
      navigate("/");
    }
  }, [navigate]);

  // Recently visited/booked events - would be fetched from API
  const recentActivity = [
    {
      id: 1,
      title: "Mount Everest Base Camp Trek",
      date: "March 15, 2025",
      status: "Completed",
      image:
        "https://images.unsplash.com/photo-1486911278844-a81c5267e227?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "African Safari Adventure",
      date: "Upcoming: May 10, 2025",
      status: "Confirmed",
      image:
        "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "Northern Lights Expedition",
      date: "January 5, 2025",
      status: "Completed",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);

    // Update localStorage with new user data
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...parsedUser,
            name: formData.name,
            username: formData.username,
          })
        );
      } catch (e) {
        console.error("Error updating user data");
      }
    }

    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Orange header section */}
      <section className="w-full bg-[#E25B32] pt-20 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">
            {userData.name}'s Profile
          </h1>
          <p className="text-xl text-white mt-2">
            Manage your account and view your travel history
          </p>
        </div>
      </section>

      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Profile information */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#E25B32] to-[#F97B5C] px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">
                    Personal Information
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
                      aria-label="Edit profile"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <img
                          src={userData.profileImage}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                        />
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 bg-[#E25B32] text-white rounded-full p-2 shadow-md"
                          aria-label="Change profile picture"
                        >
                          <FontAwesomeIcon icon={faCamera} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-gray-400"
                            />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="focus:ring-[#E25B32] focus:border-[#E25B32] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-gray-400"
                            />
                          </div>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="focus:ring-[#E25B32] focus:border-[#E25B32] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon
                              icon={faPhone}
                              className="text-gray-400"
                            />
                          </div>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="focus:ring-[#E25B32] focus:border-[#E25B32] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className="text-gray-400"
                            />
                          </div>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="focus:ring-[#E25B32] focus:border-[#E25B32] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700"
                        >
                          About Me
                        </label>
                        <textarea
                          name="bio"
                          id="bio"
                          rows="4"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="focus:ring-[#E25B32] focus:border-[#E25B32] mt-1 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                        />
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E25B32]"
                        >
                          <FontAwesomeIcon icon={faTimes} className="mr-2" />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#E25B32] hover:bg-[#D14B24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E25B32]"
                        >
                          <FontAwesomeIcon icon={faSave} className="mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-6">
                      <img
                        src={userData.profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 mb-4"
                      />
                      <h3 className="text-xl font-bold">{userData.name}</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-[#E25B32] mt-1 mr-3"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Username</p>
                          <p>{userData.username}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-[#E25B32] mt-1 mr-3"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p>{userData.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-[#E25B32] mt-1 mr-3"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p>{userData.address}</p>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t">
                        <p className="text-sm text-gray-500 mb-2">About Me</p>
                        <p>{userData.bio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right column - Recent activity */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#E25B32] to-[#F97B5C] px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">
                    Recent Activity
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center p-2 border-b last:border-b-0"
                    >
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            activity.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="bg-gradient-to-r from-[#E25B32] to-[#F97B5C] px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">
                    Account Settings
                  </h2>
                </div>
                <div className="p-4">
                  <button className="w-full text-left p-3 border-b hover:bg-gray-50 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-lock text-xs"></i>
                    </span>
                    Change Password
                  </button>
                  <button className="w-full text-left p-3 border-b hover:bg-gray-50 flex items-center">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-bell text-xs"></i>
                    </span>
                    Notification Preferences
                  </button>
                  <button
                    className="w-full text-left p-3 hover:bg-gray-50 flex items-center"
                    onClick={handleSignOut}
                  >
                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-sign-out-alt text-xs"></i>
                    </span>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
