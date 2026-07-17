import { useState, useEffect } from 'react';

export default function useScrollSpy(sectionIds, offset = 100) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const onScroll = () => {
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - offset) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds, offset]);

  return active;
}
