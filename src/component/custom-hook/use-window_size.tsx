import { useState, useEffect } from 'react';
import useIsomorphicLayoutEffect from '../gsap-helper/isomorphic-effect';

export const useWindowSize = () => {
  

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};