import React from "react";

function Team() {
  // Sample team data - you can replace with real data or an API call
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Adventure Guide",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Alex has over 10 years of experience leading treks through the most challenging terrains around the world.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Wildlife Expert",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "With a PhD in Wildlife Biology, Sarah brings incredible insights into the natural world on all our adventures.",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Mountaineering Expert",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "David has climbed some of the world's tallest peaks and loves sharing his passion for mountains with our guests.",
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      role: "Cultural Guide",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Fluent in five languages, Maria helps our travelers connect with local communities wherever we go.",
    },
  ];

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Meet Our Team</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced guides and experts are passionate about creating
            unforgettable adventures for you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <img
                className="w-40 h-40 rounded-full object-cover mb-4"
                src={member.image}
                alt={member.name}
              />
              <h3 className="text-xl font-medium text-gray-900">
                {member.name}
              </h3>
              <p className="text-indigo-600 mb-2">{member.role}</p>
              <p className="text-gray-500 text-center">{member.bio}</p>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Team;
