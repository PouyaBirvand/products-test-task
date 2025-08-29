"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { Star } from "lucide-react";


interface FavoriteButtonProps {
  productId: number;
  productName: string;
}

export default function FavoriteButton({ productId, productName }: FavoriteButtonProps) {
  const { favorites, toggleFavorite, isLoading } = useFavorites();
  const isFavorite = favorites.has(productId);

  return (
    <button
      onClick={() => toggleFavorite(productId)}
      disabled={isLoading}
      className="p-2 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
      aria-label={
        isFavorite ? `Remove ${productName} from favorites` : `Add ${productName} to favorites`
      }
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <span className="text-xl">{isFavorite ? <Star fill="yellow" /> : <Star />}</span>
    </button>
  );
}
