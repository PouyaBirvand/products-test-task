"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      // Reset to first page when search...
      params.delete("page");

      startTransition(() => {
        router.push(`/products?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== (searchParams.get("q") || "")) {
        updateSearch(searchValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, updateSearch, searchParams]);

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search products
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-describedby="search-status"
      />
      {isPending && (
        <div className="absolute right-3 top-3">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div id="search-status" className="sr-only" aria-live="polite">
        {isPending ? "Searching..." : "Search complete"}
      </div>
    </div>
  );
}
