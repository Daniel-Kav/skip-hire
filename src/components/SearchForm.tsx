import { Search } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  postcode: string;
  setPostcode: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  postcode,
  setPostcode,
  area,
  setArea,
  onSubmit,
  isLoading,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="postcode" className="block text-sm font-medium text-gray-300 mb-1">
          Postcode
        </label>
        <Input
          id="postcode"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode"
          className="w-full bg-gray-700 border-gray-600 text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">
          Area
        </label>
        <Input
          id="area"
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Enter area"
          className="w-full bg-gray-700 border-gray-600 text-white"
          required
        />
      </div>
    </div>
    <Button 
      type="submit" 
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Searching...
        </>
      ) : (
        <>
          <Search className="w-4 h-4 mr-2" />
          Find Skips
        </>
      )}
    </Button>
  </form>
);

export default SearchForm;
