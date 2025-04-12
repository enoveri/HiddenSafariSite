import React from "react";

function About() {
  return (
    <>
      {/* Orange header section */}
      <section className="w-full bg-[#E25B32] pt-20 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
          <p className="text-xl text-white mt-2">
            Who we are & where do we stand
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <main className="flex flex-col items-center py-10 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vision Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#E25B32] mb-4">
              Vision
            </h2>
            <p className="text-gray-700">
              Keeping the core values and the ethics in center, HiddenSafari –
              the NGO will be a benchmark in training the youth for a better
              situation. The NGO will work for enhancement of all good qualities
              in the modern youth with a brighter way
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#E25B32] mb-4">
              Mission
            </h2>
            <p className="text-gray-700">
              The motive of the NGO is to moderate the young thinking for a
              happy and developed world. The youth become responsible and
              understand their own need for the society and country is the heart
              value of the mission...
            </p>
          </section>

          {/* Objectives Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#E25B32] mb-4">
              Objectives
            </h2>
            <p className="text-gray-700">
              The idea of establishing NGO came up during the various activities
              with other NGOs as a part of collaboration with NSS/NCC in college
              activities. It was a very clear view behind the organization that
              it will be for young people and specially for the ones who need to
              be trained for their better future.
            </p>
          </section>

          {/* You can add more content sections as needed */}
        </div>
      </main>
    </>
  );
}

export default About;
