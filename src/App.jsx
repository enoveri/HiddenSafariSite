import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EventDetail from "./pages/EventDetail";
import SnowTreks from "./pages/SnowTreks";
import SummerEvents from "./pages/SummerEvents";
import EpicAdventure from "./pages/EpicAdventure";
import Profile from "./pages/auth/Profile";
import TermsAndConditions from "./pages/TermsAndConditions";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="font-sans text-black overflow-hidden w-full">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        {/* Auth pages */}
        <Route path="/profile" element={<Profile />} />

        {/* Dynamic event detail routes */}
        <Route path="/:category/:eventId" element={<EventDetail />} />

        {/* Category pages */}
        <Route path="/snow-treks" element={<SnowTreks />} />
        <Route path="/summer-events" element={<SummerEvents />} />
        <Route path="/epic-adventure" element={<EpicAdventure />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
