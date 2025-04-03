import { useState, useEffect, useRef } from "react";

const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0); // State to store the scroll velocity
  const lastScrollY = useRef(0); // Ref to track the last scroll position
  const lastTimestamp = useRef(Date.now()); // Ref to track the last timestamp

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop; // Current scroll position
      const currentTimestamp = Date.now(); // Current time

      const deltaY = currentScrollY - lastScrollY.current; // Change in scroll position
      const deltaTime = (currentTimestamp - lastTimestamp.current) / 1000; // px/s

      if (deltaTime > 0) {
        const newVelocity = Math.abs(deltaY / deltaTime); // Calculate velocity in px/s
        setVelocity(newVelocity);
      }

      lastScrollY.current = currentScrollY; // Updating the last scroll position
      lastTimestamp.current = currentTimestamp; // Updating the last timestamp
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return velocity;
};

export default useScrollVelocity;
