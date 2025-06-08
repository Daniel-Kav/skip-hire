import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard, CheckCircle, Filter, ArrowRight, X, AlertTriangle, ArrowLeft, Loader2, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchSkipsByLocation, type Skip } from '@/services/skipService';
import { SkipCard } from '@/components/SkipCard';
import ProgressBar from '@/components/ProgressBar';
import SkipFilters from '@/components/SkipFilters';
import SkipModal from '@/components/SkipModal';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';

const ProgressStep = ({ step, title, isActive, isCompleted }: {
  step: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}) => (
  <div className="flex items-center space-x-2">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isCompleted ? 'bg-yellow-500 text-black' :
        isActive ? 'bg-blue-500 text-white' :
          'bg-gray-700 text-gray-400'
      }`}>
      {isCompleted ? <CheckCircle className="w-4 h-4" /> : step}
    </div>
    <span className={`text-sm font-medium hidden sm:block ${isActive ? 'text-blue-400' : isCompleted ? 'text-yellow-500' : 'text-gray-500'
      }`}>
      {title}
    </span>
  </div>
);

const Index = () => {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [postcode, setPostcode] = useState('NR32');
  const [area, setArea] = useState('Lowestoft');

  const { data: skipData = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['skips', postcode, area],
    queryFn: () => fetchSkipsByLocation(postcode, area),
    enabled: false, // Disable automatic fetching
  });

  useEffect(() => {
    if (postcode && area) {
      refetch();
    }
  }, [postcode, area, refetch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const [showFilters, setShowFilters] = useState(false);
  const [filterSizes, setFilterSizes] = useState<number[]>([]);
  const [filterPriceMin, setFilterPriceMin] = useState<string>('');
  const [filterPriceMax, setFilterPriceMax] = useState<string>('');
  const [filterRoadLegal, setFilterRoadLegal] = useState(false);
  const [filterHeavyWaste, setFilterHeavyWaste] = useState(false);
  const [sortOption, setSortOption] = useState<string>('price_asc');

  const steps = [
    { step: 1, title: 'Postcode', isActive: false, isCompleted: true },
    { step: 2, title: 'Waste Type', isActive: false, isCompleted: true },
    { step: 3, title: 'Select Skip', isActive: true, isCompleted: false },
    { step: 4, title: 'Permit Check', isActive: false, isCompleted: false },
    { step: 5, title: 'Choose Date', isActive: false, isCompleted: false },
    { step: 6, title: 'Payment', isActive: false, isCompleted: false },
  ];

  const selectedSkipData = skipData.find((skip: Skip) => skip.id === selectedSkipId) || null;

  const filteredSkips = useMemo(() => {
    if (isLoading || isError) return [];
    return skipData.filter((skip: Skip) => {
      const skipPrice = skip.price_before_vat * (1 + skip.vat / 100);
      const minPrice = parseFloat(filterPriceMin);
      const maxPrice = parseFloat(filterPriceMax);

      if (filterSizes.length > 0 && !filterSizes.includes(skip.size)) {
        return false;
      }
      if (!isNaN(minPrice) && filterPriceMin !== '' && skipPrice < minPrice) {
        return false;
      }
      if (!isNaN(maxPrice) && filterPriceMax !== '' && skipPrice > maxPrice) {
        return false;
      }
      if (filterRoadLegal && !skip.allowed_on_road) {
        return false;
      }
      if (filterHeavyWaste && !skip.allows_heavy_waste) {
        return false;
      }
      return true;
    });
  }, [skipData, filterSizes, filterPriceMin, filterPriceMax, filterRoadLegal, filterHeavyWaste, isLoading, isError]);

  const sortedAndFilteredSkips = useMemo(() => {
    const skipsToProcess = [...filteredSkips]; // Create a new array from memoized filteredSkips
    switch (sortOption) {
      case 'price_asc':
        skipsToProcess.sort((a: Skip, b: Skip) => (a.price_before_vat * (1 + a.vat / 100)) - (b.price_before_vat * (1 + b.vat / 100)));
        break;
      case 'price_desc':
        skipsToProcess.sort((a: Skip, b: Skip) => (b.price_before_vat * (1 + b.vat / 100)) - (a.price_before_vat * (1 + a.vat / 100)));
        break;
      case 'size_asc':
        skipsToProcess.sort((a: Skip, b: Skip) => a.size - b.size);
        break;
      case 'size_desc':
        skipsToProcess.sort((a: Skip, b: Skip) => b.size - a.size);
        break;
      default:
        break;
    }
    return skipsToProcess;
  }, [filteredSkips, sortOption]);

  const handleClearFilters = () => {
    setFilterSizes([]);
    setFilterPriceMin('');
    setFilterPriceMax('');
    setFilterRoadLegal(false);
    setFilterHeavyWaste(false);
    // Optionally, reset sort option to default if desired
    // setSortOption('price_asc'); 
  };

  const handleSelectSkip = (skipId: number) => {
    setSelectedSkipId(skipId); {
      // Handle next step
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header with Progress Bar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto px-4 py-8">

            {isError && (
              <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
                Failed to load skip data. Please try again.
              </div>
            )}

            {!isLoading && !isError && skipData.length === 0 && (
              <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-200 px-4 py-3 rounded mb-6">
                No skips available for the selected location. Please try a different postcode or area.
              </div>
            )}
            <div className="flex items-center justify-between py-4">
              <h1 className="text-2xl font-bold text-white tracking-tight">Skip Hire</h1>
              <Button
                variant="outline"
                className="md:hidden bg-gray-800 border-gray-700 text-white hover:bg-gray-700 ml-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
            {/* Progress Bar */}
            <ProgressBar
              steps={[
                { icon: MapPin, label: 'Postcode' },
                { icon: Trash2, label: 'Waste Type' },
                { icon: Truck, label: 'Select Skip' },
                { icon: Shield, label: 'Permit Check' },
                { icon: Calendar, label: 'Choose Date' },
                { icon: CreditCard, label: 'Payment' },
              ]}
              activeStep={2}
            />
          </div>
        </div>
      </header>

      {/* Disclaimer Strip */}
      <Disclaimer />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filters */}
          <div className={`lg:hidden ${showFilters ? 'block' : 'hidden'}`}>
            <SkipFilters
              filterSizes={filterSizes}
              setFilterSizes={setFilterSizes}
              filterPriceMin={filterPriceMin}
              setFilterPriceMin={setFilterPriceMin}
              filterPriceMax={filterPriceMax}
              setFilterPriceMax={setFilterPriceMax}
              filterRoadLegal={filterRoadLegal}
              setFilterRoadLegal={setFilterRoadLegal}
              filterHeavyWaste={filterHeavyWaste}
              setFilterHeavyWaste={setFilterHeavyWaste}
              onClearFilters={handleClearFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              isMobile={true}
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-medium text-white mb-4">Filters</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Skip Size</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[4, 6, 8, 10, 12, 14, 16, 20, 40].map((size) => (
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
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Skip List */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-bold text-white mb-4 sm:mb-0">Available Skips</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-3 py-1.5"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="size_asc">Size: Small to Large</option>
                  <option value="size_desc">Size: Large to Small</option>
                </select>
                <Button
                  variant="outline"
                  className="lg:hidden bg-gray-800 border-gray-700 text-white hover:bg-gray-700 ml-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoading ? (
                <div className="col-span-3 flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : sortedAndFilteredSkips.map((skip: Skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedSkipId === skip.id}
                  onSelect={() => setSelectedSkipId(skip.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Selected Skip Info - Modern Modal */}
      {selectedSkipId && selectedSkipData && (
        <SkipModal
          skip={selectedSkipData}
          onClose={() => setSelectedSkipId(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;