import { useEffect, useRef } from 'react';

/**
 * Hook for running a function on an interval
 * Handles cleanup automatically
 * Useful for polling APIs, auto-refresh, etc.
 */
export function useInterval(
  callback: () => void,
  delay: number | null // null to pause
) {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}