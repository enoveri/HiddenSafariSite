import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPlay,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const ExperienceSection = () => {
  const [videos, setVideos] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [mutedVideos, setMutedVideos] = useState({});
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef({});

  // Load video data
  useEffect(() => {
    const list = [
      {
        id: 1,
        title: "Adventurous Journey in Albania",
        duration: "0:26",
        videoUrl: "https://www.pexels.com/download/video/31639076",
        thumbnailUrl:
          "https://images.pexels.com/videos/31639076/adventurous-journey-albania-big-rocks-colorful-rocks-31639076.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {
        id: 2,
        title: "Canyon Backpacking",
        duration: "0:31",
        videoUrl: "https://www.pexels.com/download/video/31686644",
        thumbnailUrl:
          "https://images.pexels.com/videos/31686644/adventure-backpacking-canyon-cliffs-31686644.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {
        id: 3,
        title: "Mountain Hike",
        duration: "0:29",
        videoUrl: "https://www.pexels.com/download/video/31686611",
        thumbnailUrl:
          "https://images.pexels.com/videos/31686611/adventure-backpacking-canyon-cliffs-31686611.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {
        id: 4,
        title: "Desert Climb",
        duration: "0:38",
        videoUrl: "https://www.pexels.com/download/video/31686610",
        thumbnailUrl:
          "https://images.pexels.com/videos/31686610/adventure-backpacking-canyon-cliffs-31686610.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    ];
    setVideos(list);
  }, []);

  // Mute default
  useEffect(() => {
    const init = {};
    videos.forEach((v) => (init[v.id] = true));
    setMutedVideos(init);
  }, [videos]);

  // Scroll nav
  useEffect(() => {
    const sc = scrollContainerRef.current;
    if (!sc) return;
    const update = () => {
      setCanScrollLeft(sc.scrollLeft > 0);
      setCanScrollRight(sc.scrollLeft < sc.scrollWidth - sc.clientWidth - 10);
    };
    update();
    sc.addEventListener("scroll", update);
    return () => sc.removeEventListener("scroll", update);
  }, [videos]);

  // Autoplay & pause off-screen (no auto-centering)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          const id = +vid.dataset.id;
          if (entry.isIntersecting) {
            vid.loop = true;
            vid.muted = mutedVideos[id];
            vid.play();
            setActiveVideoId(id);
          } else {
            vid.pause();
            if (activeVideoId === id) setActiveVideoId(null);
          }
        });
      },
      { root: container, threshold: 0.75 }
    );
    videos.forEach((v) => {
      const el = videoRefs.current[v.id];
      if (el) {
        el.dataset.id = v.id;
        obs.observe(el);
      }
    });
    return () => {
      videos.forEach((v) => {
        const el = videoRefs.current[v.id];
        if (el) obs.unobserve(el);
      });
      obs.disconnect();
    };
  }, [videos, mutedVideos, activeVideoId]);

  // Touch scroll
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initScroll, setInitScroll] = useState(0);
  const handleTouchStart = (e) => {
    const sc = scrollContainerRef.current;
    if (!sc) return;
    setDragging(true);
    setStartX(e.touches[0].pageX - sc.offsetLeft);
    setInitScroll(sc.scrollLeft);
  };
  const handleTouchMove = (e) => {
    const sc = scrollContainerRef.current;
    if (!dragging || !sc) return;
    e.preventDefault();
    sc.scrollLeft =
      initScroll - (e.touches[0].pageX - sc.offsetLeft - startX) * 1.5;
  };
  const handleTouchEnd = () => setDragging(false);

  // Toggle mute
  const toggleMute = (id) => {
    setMutedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
    const vid = videoRefs.current[id];
    if (vid) vid.muted = !mutedVideos[id];
  };

  // Play/pause (no auto-centering on click)
  const handleVideoToggle = (id) => {
    const vid = videoRefs.current[id];
    if (!vid) return;
    if (activeVideoId === id) {
      vid.paused ? vid.play() : vid.pause() || setActiveVideoId(null);
    } else {
      activeVideoId && videoRefs.current[activeVideoId]?.pause();
      vid.play();
      setActiveVideoId(id);
    }
  };

  return (
    <section
      className="w-full py-8 sm:py-12 px-4 sm:px-8 bg-[#ECD1D1]"
      id="experience-yourself"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-poppins font-medium text-[#7d4744] mb-2">
            Experience yourself
          </h2>
          <p className="text-lg text-[#5a4a42]">
            Exclusive footage from our camps
          </p>
        </div>
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() =>
                scrollContainerRef.current.scrollBy({
                  left: -400,
                  behavior: "smooth",
                })
              }
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition focus:ring-2 focus:ring-[#7d4744] -ml-5"
              aria-label="Scroll left"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-[#7d4744]"
              />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto hide-scrollbar scroll-smooth pb-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((v) => (
              <div
                key={v.id}
                className={`relative flex-none w-[300px] sm:w-[400px] lg:w-[547px] h-[250px] sm:h-[300px] lg:h-[368px] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ${
                  activeVideoId === v.id ? "scale-110 z-10" : "scale-100"
                }`}
              >
                <video
                  ref={(el) => (videoRefs.current[v.id] = el)}
                  src={v.videoUrl}
                  poster={v.thumbnailUrl}
                  preload="metadata"
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  loop
                  data-id={v.id}
                />
                <button
                  onClick={() => toggleMute(v.id)}
                  className="absolute top-2 right-2 z-10 bg-black/50 p-2 rounded-full"
                  aria-label={mutedVideos[v.id] ? "Unmute" : "Mute"}
                >
                  <FontAwesomeIcon
                    icon={mutedVideos[v.id] ? faVolumeMute : faVolumeUp}
                    className="text-white"
                  />
                </button>
                <button
                  onClick={() => handleVideoToggle(v.id)}
                  className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/20 transition-colors duration-300"
                >
                  <div
                    className={`bg-red-600 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 ${
                      activeVideoId === v.id ? "hidden" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faPlay} className="text-white" />
                  </div>
                </button>
              </div>
            ))}
          </div>
          {canScrollRight && (
            <button
              onClick={() =>
                scrollContainerRef.current.scrollBy({
                  left: 400,
                  behavior: "smooth",
                })
              }
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition focus:ring-2 focus:ring-[#7d4744] -mr-5"
              aria-label="Scroll right"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[#7d4744]"
              />
            </button>
          )}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
