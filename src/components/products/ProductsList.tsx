import ProductCard from "./ProductCard";
import Pagination from "@/components/ui/Pagination";
import { Product } from "@/data/products";

interface ProductsListProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export default function ProductsList({ products, totalPages, currentPage }: ProductsListProps) {
  return (
    <>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
          <p className="text-gray-400 text-sm mt-2">
            Please change your search term. Pagination will not be displayed due to the lack of
            results.
          </p>
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label="Products"
          >
            {products.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </>
  );
}
