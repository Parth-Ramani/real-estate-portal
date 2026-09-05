'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any value with a customizable delay.
 * Useful for search inputs to prevent excessive recalculations or filtering while typing.
 */
export function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
