'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'haven_luxury_realty_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to read favorites from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save favorites to localStorage', e);
      }
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    favoriteCount: favorites.length,
    isLoaded,
  };
}
