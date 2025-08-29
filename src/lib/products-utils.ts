import { PRODUCTS, Product } from "@/data/products";
import { SearchParams } from "@/lib/validation";

const ITEMS_PER_PAGE = 5;

export function filterProducts(products: Product[], query: string): Product[] {
  if (!query) return products;

  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );
}

export function sortProducts(products: Product[], sort: string, direction: string): Product[] {
  return [...products].sort((a, b) => {
    let aValue: string | number = a[sort as keyof Product];
    let bValue: string | number = b[sort as keyof Product];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (direction === "desc") {
      return aValue < bValue ? 1 : -1;
    }
    return aValue > bValue ? 1 : -1;
  });
}

export function paginateProducts(
  products: Product[],
  page: number
): {
  paginatedProducts: Product[];
  totalPages: number;
  currentPage: number;
} {
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const validPage = Math.min(Math.max(1, page), totalPages || 1);

  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return {
    paginatedProducts,
    totalPages,
    currentPage: validPage,
  };
}

export function processProducts(searchParams: SearchParams) {
  const { q, sort, dir, page } = searchParams;

  let products = filterProducts(PRODUCTS, q);
  products = sortProducts(products, sort, dir);

  const result = paginateProducts(products, page);

  return {
    products: result.paginatedProducts,
    totalProducts: products.length,
    totalPages: result.totalPages,
    currentPage: result.currentPage,
  };
}
