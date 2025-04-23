import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://54.210.95.246:3005/api/v1/team"
        );
        console.log("Team API response:", response.data);

        // Make sure we're setting the array of team members, not the whole response
        if (Array.isArray(response.data)) {
          setTeamMembers(response.data);
        } else if (response.data && Array.isArray(response.data.team)) {
          setTeamMembers(response.data.team);
        } else if (response.data && Array.isArray(response.data.data)) {
          setTeamMembers(response.data.data);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setTeamMembers([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to load team members. Please try again later.");
        setTeamMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Our Team</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the Heros behind our success
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center ">
                <img
                  className="w-40 h-40 rounded-full object-cover mb-4"
                  src={member.profileImage}
                  alt={member.name}
                />
                <h3 className="text-xl font-medium text-gray-900">
                  {member.name}
                </h3>
                <p className="text-indigo-600 mb-2">{member.designation}</p>
               
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Team;
