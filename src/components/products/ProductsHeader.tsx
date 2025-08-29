import SearchBar from "@/components/ui/SearchBar";
import SortControls from "@/components/ui/SortControls";

export default function ProductsHeader() {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="w-full max-w-md">
          <SearchBar />
        </div>
        <SortControls />
      </div>
    </header>
  );
}
