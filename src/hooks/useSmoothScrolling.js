import { useEffect, useRef } from 'react';

export const useSmoothScrolling = () => {
  const containerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const startScrolling = (direction) => {
    scrollIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += direction * 10; // Adjust the scroll amount as needed
      }
    }, 50); // Adjust the interval as needed
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      stopScrolling(); // Clear the interval when the component unmounts
    };
  }, []);

  return { containerRef, startScrolling, stopScrolling };
};


