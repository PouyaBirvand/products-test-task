"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: Set<number>;
  toggleFavorite: (productId: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(new Set(data.favorites)))
      .catch(() => setError("Error loading favorites"));
  }, []);

  const toggleFavorite = async (productId: number) => {
    const isFavorite = favorites.has(productId);
    const newIsFavorite = !isFavorite;

    const newFavorites = new Set(favorites);
    if (newIsFavorite) {
      newFavorites.add(productId);
    } else {
      newFavorites.delete(productId);
    }
    setFavorites(newFavorites);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, isFavorite: newIsFavorite }),
      });

      if (!response.ok) throw new Error("Failed to update favorite");

      const data = await response.json();
      setFavorites(new Set(data.favorites));
    } catch {
      setFavorites(favorites);
      setError("Error updating favorite. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isLoading, error }}>
      {error && (
        <div role="alert" className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded">
          {error}
        </div>
      )}
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
