"use client";

import { ArrowDown, ArrowLeftRight, ArrowUp } from "lucide-react";
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
    params.delete("page"); // Reset to first page...

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const getSortIcon = (field: string) => {
    if (currentSort !== field) return <ArrowLeftRight strokeWidth="1" />;
    return currentDir === "asc" ? <ArrowUp strokeWidth="1" /> : <ArrowDown strokeWidth="1" />;
  };

  const getAriaSort = (field: string) => {
    if (currentSort !== field) return "none";
    return currentDir === "asc" ? "ascending" : "descending";
  };

  return (
    <div className="flex gap-4 items-center">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      <button
        onClick={() => updateSort("name")}
        className="flex items-center gap-1 px-3 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-colors"
        aria-sort={getAriaSort("name")}
        disabled={isPending}
      >
        Name {getSortIcon("name")}
      </button>
      <button
        onClick={() => updateSort("price")}
        className="flex items-center gap-1 px-3 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-colors"
        aria-sort={getAriaSort("price")}
        disabled={isPending}
      >
        Price {getSortIcon("price")}
      </button>
      {isPending && (
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      )}
    </div>
  );
}
