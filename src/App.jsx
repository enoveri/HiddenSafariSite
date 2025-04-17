import React from "react";
import { Routes, Route } from "react-router-dom";
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
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-black overflow-hidden w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

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
