import React from "react";
import HeroSection from "../components/HeroSection";
import HighlightedEvents from "../components/HighlightedEvents";
import CarouselSection from "../components/CarouselSection";
import ExperienceSection from "../components/ExperienceSection";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <main className="flex flex-col items-center py-10">
        {/* Highlighted Events Carousel */}
        <HighlightedEvents />

        {/* Other Event Categories */}
        <CarouselSection
          category="snow-treks"
          title="Snow Treks"
          subTitle="Experience the magic of winter landscapes with our guided snow treks"
          apiEndpoint="http://54.210.95.246:3005/api/v1/events/snow-treks-events"
        />
        <CarouselSection
          category="summer-events"
          title="Summer Events"
          subTitle="Join our exciting range of summer activities"
          apiEndpoint="http://54.210.95.246:3005/api/v1/events/summer-events"
        />
        <CarouselSection
          category="epic-adventure"
          title="Epic Adventure"
          subTitle="Push your limits with our most thrilling outdoor challenges."
          apiEndpoint="http://54.210.95.246:3005/api/v1/events/epic-adventure-events"
        />
        <CarouselSection
          category="special-events"
          title="Special Events"
          subTitle="Unique, limited-time gatherings that celebrate remarkable occasions"
          apiEndpoint="http://54.210.95.246:3005/api/v1/events/special-events"
        />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Testimonials */}
        <Testimonials />
      </main>
    </>
  );
}

export default Home;
