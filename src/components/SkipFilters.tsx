import React from "react";
import { Button } from "@/components/ui/button";

interface SkipFiltersProps {
  filterSizes: number[];
  setFilterSizes: React.Dispatch<React.SetStateAction<number[]>>;
  filterPriceMin: string;
  setFilterPriceMin: React.Dispatch<React.SetStateAction<string>>;
  filterPriceMax: string;
  setFilterPriceMax: React.Dispatch<React.SetStateAction<string>>;
  filterRoadLegal: boolean;
  setFilterRoadLegal: React.Dispatch<React.SetStateAction<boolean>>;
  filterHeavyWaste: boolean;
  setFilterHeavyWaste: React.Dispatch<React.SetStateAction<boolean>>;
  onClearFilters: () => void;
  showFilters?: boolean;
  setShowFilters?: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
}

const skipSizes = [4, 6, 8, 10, 12, 14, 16, 20, 40];

const SkipFilters: React.FC<SkipFiltersProps> = ({
  filterSizes,
  setFilterSizes,
  filterPriceMin,
  setFilterPriceMin,
  filterPriceMax,
  setFilterPriceMax,
  filterRoadLegal,
  setFilterRoadLegal,
  filterHeavyWaste,
  setFilterHeavyWaste,
  onClearFilters,
  showFilters,
  setShowFilters,
  isMobile = false,
}) => {
  // Mobile variant
  if (isMobile) {
    return (
      <div className={`lg:hidden ${showFilters ? 'block' : 'hidden'}`}>
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Filters</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Skip Size</h4>
              <div className="grid grid-cols-2 gap-2">
                {skipSizes.map((size) => (
                  <label key={size} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                      checked={filterSizes.includes(size)}
                      onChange={() => {
                        setFilterSizes(prevSizes =>
                          prevSizes.includes(size)
                            ? prevSizes.filter(s => s !== size)
                            : [...prevSizes, size]
                        );
                      }}
                    />
                    <span className="text-sm text-white">{size} yd</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Price Range</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 rounded-md border-gray-600 bg-gray-700 text-white px-3 py-2 text-sm"
                  value={filterPriceMin}
                  onChange={(e) => setFilterPriceMin(e.target.value)}
                />
                <span className="text-gray-400">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 rounded-md border-gray-600 bg-gray-700 text-white px-3 py-2 text-sm"
                  value={filterPriceMax}
                  onChange={(e) => setFilterPriceMax(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-6 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              onClick={onClearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
        <h3 className="text-lg font-medium text-white mb-4">Filters</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Skip Size</h4>
            <div className="grid grid-cols-1 gap-2">
              {skipSizes.map((size) => (
                <label key={size} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                    checked={filterSizes.includes(size)}
                    onChange={() => {
                      setFilterSizes(prevSizes =>
                        prevSizes.includes(size)
                          ? prevSizes.filter(s => s !== size)
                          : [...prevSizes, size]
                      );
                    }}
                  />
                  <span className="text-sm text-white">{size} yd</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Price Range</h4>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 rounded-md border-gray-600 bg-gray-700 text-white px-3 py-2 text-sm"
                value={filterPriceMin}
                onChange={(e) => setFilterPriceMin(e.target.value)}
              />
              <span className="text-gray-400">to</span>
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 rounded-md border-gray-600 bg-gray-700 text-white px-3 py-2 text-sm"
                value={filterPriceMax}
                onChange={(e) => setFilterPriceMax(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Availability</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  // In Stock filter not implemented
                  disabled
                />
                <span className="text-sm text-white">In Stock</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  checked={filterRoadLegal}
                  onChange={(e) => setFilterRoadLegal(e.target.checked)}
                />
                <span className="text-sm text-white">Road Legal</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  checked={filterHeavyWaste}
                  onChange={(e) => setFilterHeavyWaste(e.target.checked)}
                />
                <span className="text-sm text-white">Heavy Waste Allowed</span>
              </label>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-6 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkipFilters;
