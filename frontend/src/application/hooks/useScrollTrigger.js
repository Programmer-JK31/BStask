import { useState, useRef, useEffect, useCallback } from "react";

const useScrollTrigger = (service) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const observerRef = useRef(null); // Stores the IntersectionObserver instance
  const targetRef = useRef(null); // Reference to the DOM element

  const fetchMoreData = useCallback(async (cursor, scrollVelocity) => {
    try {
      return await service.loadMore(cursor, scrollVelocity);
    } finally {
      setShouldFetch(false);
    }
  }, [service]);

  useEffect(() => {
    // Create observer only after DOM element exists
    if (!targetRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetch(true);
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [shouldFetch, fetchMoreData, targetRef];
};

export default useScrollTrigger;