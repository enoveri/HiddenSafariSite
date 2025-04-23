import React, { lazy, Suspense } from "react";
import HeroSection from "../components/HeroSection";
import { ENDPOINTS } from "../utils/apiConfig";

// Lazy load components for better initial loading performance
const HighlightedEvents = lazy(() => import("../components/HighlightedEvents"));
const CarouselSection = lazy(() => import("../components/CarouselSection"));
const ExperienceSection = lazy(() => import("../components/ExperienceSection"));
const Testimonials = lazy(() => import("../components/Testimonials"));

// Reusable loading component
const SectionLoader = () => (
  <div className="w-full py-16 flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E25B32]"></div>
  </div>
);

function Home() {
  // Centralized category data to avoid repetition (DRY)
  const categoryData = [
    {
      id: "snow-treks",
      title: "Snow Treks",
      subTitle:
        "Experience the magic of winter landscapes with our guided snow treks",
      endpoint: ENDPOINTS.SNOW_TREKS_EVENTS,
    },
    {
      id: "summer-events",
      title: "Summer Events",
      subTitle: "Join our exciting range of summer activities",
      endpoint: ENDPOINTS.SUMMER_EVENTS,
    },
    {
      id: "epic-adventure",
      title: "Epic Adventure",
      subTitle: "Push your limits with our most thrilling outdoor challenges",
      endpoint: ENDPOINTS.EPIC_ADVENTURE_EVENTS,
    },
    {
      id: "special-events",
      title: "Special Events",
      subTitle:
        "Unique, limited-time gatherings that celebrate remarkable occasions",
      endpoint: ENDPOINTS.SPECIAL_EVENTS,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <main className="flex flex-col items-center py-6 md:py-10 px-4 sm:px-6 lg:px-8 max-w-full mx-auto">
        {/* Highlighted Events Carousel - with Suspense fallback */}
        <Suspense fallback={<SectionLoader />}>
          <HighlightedEvents />
        </Suspense>

        {/* Other Event Categories - Map through categories for DRY code */}
        {categoryData.map((category) => (
          <Suspense key={category.id} fallback={<SectionLoader />}>
            <CarouselSection
              category={category.id}
              title={category.title}
              subTitle={category.subTitle}
              apiEndpoint={category.endpoint}
            />
          </Suspense>
        ))}

        {/* Experience Section */}
        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>

        {/* Testimonials */}
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
      </main>
    </>
  );
}

export default Home;
