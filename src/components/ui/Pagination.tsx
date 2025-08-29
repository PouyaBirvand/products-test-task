"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTransition } from "react";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => navigate(currentPage - 1)}
        disabled={currentPage <= 1 || isPending}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-label="Go to previous page"
      >
        <ChevronLeft />
      </button>

      <span className="px-4 py-2 text-sm text-gray-700" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => navigate(currentPage + 1)}
        disabled={currentPage >= totalPages || isPending}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-label="Go to next page"
      >
        <ChevronRight />
      </button>

      {isPending && (
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      )}
    </div>
  );
}
