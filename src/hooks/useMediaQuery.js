
import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the state of a media query.
 * @param {string} query - The media query string to watch.
 * @returns {boolean} - `true` if the media query matches, otherwise `false`.
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};
