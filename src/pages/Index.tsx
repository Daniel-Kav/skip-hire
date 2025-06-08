import React, { useState, useMemo } from 'react';
import { CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, MapPin, Trash2, Truck, Shield, Calendar, CreditCard, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { skipData } from '@/data/skipData';
const ProgressStep = ({ step, title, isActive, isCompleted }: {
  step: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}) => (
  <div className="flex items-center space-x-2">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
      isCompleted ? 'bg-yellow-500 text-black' : 
      isActive ? 'bg-blue-500 text-white' : 
      'bg-gray-700 text-gray-400'
    }`}>
      {isCompleted ? <CheckCircle className="w-4 h-4" /> : step}
    </div>
    <span className={`text-sm font-medium hidden sm:block ${
      isActive ? 'text-blue-400' : isCompleted ? 'text-yellow-500' : 'text-gray-500'
    }`}>
      {title}
    </span>
  </div>
);

const SkipCard = ({ skip, isSelected, onSelect }: {
  skip: typeof skipData[0];
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  
  return (
    <Card className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg bg-gray-800 border-gray-700 ${
      isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
    }`} onClick={onSelect}>
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={`/images/${skip.size}-yarder-skip.jpg`}
            alt={`${skip.size} yard skip`}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => {
              // Fallback to a default image if the specific size image is not found
              const target = e.target as HTMLImageElement;
              target.src = '/images/8-yarder-skip.jpg'; // Default image
            }}
          />
          <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
            {skip.size} Yards
          </Badge>
          {!skip.allowed_on_road && (
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded text-xs">
              <AlertTriangle className="w-3 h-3" />
              <span>Not Road Legal</span>
            </div>
          )}
          {isSelected && (
            <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 z-10">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{skip.size} Yard Skip</h3>
            <p className="text-sm text-gray-400">{skip.hire_period_days} day hire period</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Price (exc. VAT)</span>
              <span className="text-sm font-medium text-white">£{skip.price_before_vat}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">VAT ({skip.vat}%)</span>
              <span className="text-sm font-medium text-white">£{(skip.price_before_vat * skip.vat / 100).toFixed(0)}</span>
            </div>
            <div className="border-t border-gray-700 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-xl font-bold text-blue-400">£{totalPrice.toFixed(0)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skip.allowed_on_road && (
              <Badge variant="secondary" className="text-xs bg-yellow-500 text-black">
                Road Legal
              </Badge>
            )}
            {skip.allows_heavy_waste && (
              <Badge variant="secondary" className="text-xs bg-blue-600 text-white">
                Heavy Waste OK
              </Badge>
            )}
          </div>
          
          <Button 
            className={`w-full mt-4 ${
              isSelected 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'
            }`}
            variant={isSelected ? "default" : "outline"}
          >
            {isSelected ? 'Selected' : 'Select This Skip'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
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

  const selectedSkipData = selectedSkip ? skipData.find(s => s.id === selectedSkip) : null;

  const filteredSkips = useMemo(() => {
    return skipData.filter(skip => {
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
  }, [skipData, filterSizes, filterPriceMin, filterPriceMax, filterRoadLegal, filterHeavyWaste]);

  const sortedAndFilteredSkips = useMemo(() => {
    const skipsToProcess = [...filteredSkips]; // Create a new array from memoized filteredSkips
    switch (sortOption) {
      case 'price_asc':
        skipsToProcess.sort((a, b) => (a.price_before_vat * (1 + a.vat / 100)) - (b.price_before_vat * (1 + b.vat / 100)));
        break;
      case 'price_desc':
        skipsToProcess.sort((a, b) => (b.price_before_vat * (1 + b.vat / 100)) - (a.price_before_vat * (1 + a.vat / 100)));
        break;
      case 'size_asc':
        skipsToProcess.sort((a, b) => a.size - b.size);
        break;
      case 'size_desc':
        skipsToProcess.sort((a, b) => b.size - a.size);
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

  // Old sortSkips and filterSkips functions are no longer needed


  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header with Progress Bar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <nav className="flex items-center justify-between space-x-0 overflow-x-auto pb-2">
            {[
              { icon: MapPin, label: 'Postcode' },
              { icon: Trash2, label: 'Waste Type' },
              { icon: Truck, label: 'Select Skip' },
              { icon: Shield, label: 'Permit Check' },
              { icon: Calendar, label: 'Choose Date' },
              { icon: CreditCard, label: 'Payment' },
            ].map((step, idx) => {
              // Set progress: completed < 2, active === 2, rest upcoming
              const isCompleted = idx < 2;
              const isActive = idx === 2;
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center">
                  <div className={`flex items-center space-x-2 ${isActive ? 'text-blue-500' : isCompleted ? 'text-blue-700' : 'text-gray-500'}`}> 
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : isCompleted ? 'text-blue-700' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${isActive ? 'text-blue-500' : isCompleted ? 'text-blue-700' : 'text-gray-500'}`}>{step.label}</span>
                  </div>
                  {idx !== 5 && (
                    <div className={`mx-2 w-8 h-0.5 ${isCompleted ? 'bg-blue-700' : isActive ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filters */}
          <div className={`lg:hidden ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Filters</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Skip Size</h4>
                  <div className="grid grid-cols-2 gap-2">
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
              {sortedAndFilteredSkips.map((skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedSkip === skip.id}
                  onSelect={() => setSelectedSkip(skip.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Selected Skip Info */}
      {selectedSkip && selectedSkipData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Selected Skip</h3>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-blue-400"
                    onClick={() => setSelectedSkip(null)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-400">Size:</div>
                      <div className="font-semibold text-white text-lg">
                        {selectedSkipData.size} Yard Skip
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="text-sm text-gray-400">Duration:</div>
                      <div className="font-semibold text-white text-lg">
                        {selectedSkipData.hire_period_days} days
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-right">
                    <div className="text-2xl font-bold text-blue-400">
                      £{(selectedSkipData.price_before_vat * (1 + selectedSkipData.vat / 100)).toFixed(0)}
                    </div>
                    <div className="text-sm text-gray-400">
                      Total (inc. VAT)
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    onClick={() => setSelectedSkip(null)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                    onClick={() => {/* Handle continue */}}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Disclaimer Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="border-t border-gray-700 pt-2 sm:pt-0">
            <p className="text-xs text-gray-500 leading-relaxed">
              Images and information shown throughout this website may not reflect the exact shape or size specification.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Images and information shown throughout this website may not reflect the exact shape or size specification.
              Colours may vary. Options and/or accessories may be featured at additional cost.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;