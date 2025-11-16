'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const MediaQueryContext = createContext();

export function MediaQueryProvider({ children }) {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isDesktop: false,
    isSmAndUp: false,
    isMdAndUp: false,
  });

  useEffect(() => {
    // Define media queries matching Tailwind breakpoints
    const queries = {
      isMobile: window.matchMedia('(max-width: 639px)'), // Below sm breakpoint
      isDesktop: window.matchMedia('(min-width: 1024px)'), // lg breakpoint and above
      isSmAndUp: window.matchMedia('(min-width: 640px)'), // sm breakpoint and above
      isMdAndUp: window.matchMedia('(min-width: 850px)'), // md breakpoint and above
    };

    // Update breakpoints state
    const updateBreakpoints = () => {
      setBreakpoints({
        isMobile: queries.isMobile.matches,
        isDesktop: queries.isDesktop.matches,
        isSmAndUp: queries.isSmAndUp.matches,
        isMdAndUp: queries.isMdAndUp.matches,
      });
    };

    // Initial check
    updateBreakpoints();

    // Add listeners for changes
    Object.values(queries).forEach(mq => {
      if (mq.addEventListener) {
        mq.addEventListener('change', updateBreakpoints);
      } else {
        // Fallback for older browsers
        mq.addListener(updateBreakpoints);
      }
    });

    // Cleanup listeners
    return () => {
      Object.values(queries).forEach(mq => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', updateBreakpoints);
        } else {
          mq.removeListener(updateBreakpoints);
        }
      });
    };
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => breakpoints,
    [breakpoints.isMobile, breakpoints.isDesktop, breakpoints.isSmAndUp , breakpoints.isMdAndUp]
  );

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
}

// Main hook to get all breakpoints
export function useBreakpoint() {
  const context = useContext(MediaQueryContext);
  if (!context) {
    throw new Error('useBreakpoint must be used within MediaQueryProvider');
  }
  return context;
}

// Individual hooks for better performance (only re-renders when specific value changes)
export function useIsMobile() {
  const { isMobile } = useBreakpoint();
  return isMobile;
}

export function useIsDesktop() {
  const { isDesktop } = useBreakpoint();
  return isDesktop;
}

export function useIsSmAndUp() {
  const { isSmAndUp } = useBreakpoint();
  return isSmAndUp;
}

export function useIsMdAndUp() {
  const { isMdAndUp } = useBreakpoint();
  return isMdAndUp;
}