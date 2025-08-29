import FavoriteButton from "@/components/ui/FavoriteButton";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <FavoriteButton productId={product.id} productName={product.name} />
      </div>
      <p className="text-2xl font-bold text-blue-600 mb-2">${product.price}</p>
      <p className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded inline-block">
        {product.category}
      </p>
    </div>
  );
}
