import { useEffect, useState } from "react";

export function useScrollIndicator() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const updateScrollIndicator = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPercent(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollIndicator);
    return () => window.removeEventListener('scroll', updateScrollIndicator);
  }, []);

  return scrollPercent;
}
