interface ProductsStatusProps {
  totalProducts: number;
  searchQuery: string;
  isValidParams: boolean;
}

export default function ProductsStatus({
  totalProducts,
  searchQuery,
  isValidParams,
}: ProductsStatusProps) {
  return (
    <div className="mb-4">
      {isValidParams ? (
        <p className="text-sm text-gray-600" aria-live="polite">
          {searchQuery ? (
            <>
              {totalProducts} results found for "{searchQuery}"
            </>
          ) : (
            <>Displaying {totalProducts} products</>
          )}
        </p>
      ) : (
        <p className="text-sm text-red-600" role="alert">
          Invalid search parameters. Displaying default view.
        </p>
      )}
    </div>
  );
}
