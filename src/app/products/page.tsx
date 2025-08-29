import { Suspense } from "react";

import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsList from "@/components/products/ProductsList";
import ProductsStatus from "@/components/products/ProductsStatus";
import { processProducts } from "@/lib/products-utils";
import { parseSearchParams } from "@/lib/validation";

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full max-w-md h-10 bg-gray-200 rounded"></div>
          <div className="flex gap-4">
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const parsedParams = parseSearchParams(resolvedParams);
  const { products, totalProducts, totalPages, currentPage } = parsedParams.success
    ? processProducts(parsedParams.data)
    : processProducts({ q: "", sort: "name", dir: "asc", page: 1 });

  return (
    <main className="container mx-auto px-4 py-8 max-w-screen-xl">
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductsHeader />
        <ProductsStatus
          totalProducts={totalProducts}
          searchQuery={parsedParams.success ? parsedParams.data.q : ""}
          isValidParams={parsedParams.success}
        />
        <ProductsList products={products} totalPages={totalPages} currentPage={currentPage} />
      </Suspense>
    </main>
  );
}
