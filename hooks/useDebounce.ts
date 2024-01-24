/**
 * This hook is used to debounce a value (string) and return the debounced value
 *
 * Why do we need this?
 *
 * When we are searching for songs, we don't want to make a request to the server on every key stroke. Instead, we want to wait until the user has stopped typing for a certain amount of time. This is called debouncing.
 *
 * This hook will returns the debounced value after a delay time (default 666ms)
 *
 * @param: value: T
 * @param: delay?: number
 * @returns: T
 */

import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 666);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
