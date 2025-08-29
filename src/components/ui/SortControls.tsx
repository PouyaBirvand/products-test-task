"use client";

import { useTransition } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = searchParams.get("sort") || "name";
  const currentDir = searchParams.get("dir") || "asc";

  const updateSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const newDir = currentSort === field && currentDir === "asc" ? "desc" : "asc";

    params.set("sort", field);
    params.set("dir", newDir);
    params.delete("page");

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const getSortIcon = (field: string) => {
    if (currentSort !== field) return "↕️";
    return currentDir === "asc" ? "↑" : "↓";
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      <button
        onClick={() => updateSort("name")}
        className={`flex items-center gap-1 rounded border px-3 py-1 text-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 ${currentSort === "name" ? "border-blue-500 bg-blue-100" : ""}`}
        aria-label={`Sort by name, ${currentDir === "asc" && currentSort === "name" ? "ascending" : currentSort === "name" ? "descending" : "no order"}`}
        disabled={isPending}
      >
        Name {getSortIcon("name")}
      </button>
      <button
        onClick={() => updateSort("price")}
        className={`flex items-center gap-1 rounded border px-3 py-1 text-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 ${currentSort === "price" ? "border-blue-500 bg-blue-100" : ""}`}
        aria-label={`Sort by price, ${currentDir === "asc" && currentSort === "price" ? "ascending" : currentSort === "price" ? "descending" : "no order"}`}
        disabled={isPending}
      >
        Price {getSortIcon("price")}
      </button>
      {isPending && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      )}
    </div>
  );
}
