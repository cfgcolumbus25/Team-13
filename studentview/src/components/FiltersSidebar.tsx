import { FilterState } from "../App";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { MapPin, Award } from "lucide-react";

interface FiltersSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FiltersSidebar({ filters, onFiltersChange }: FiltersSidebarProps) {
  return (
    <Card className="border-gray-200 sticky top-24">
      <CardHeader>
        <h4 className="text-[#003366]">Filters</h4>
        <p className="text-sm text-gray-600">Refine your search results</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#0094D4]" />
            <Label>Your CLEP Score</Label>
          </div>
          <div className="space-y-2">
            <Slider
              min={0}
              max={80}
              step={5}
              value={[filters.score]}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, score: value[0] })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Min: 0</span>
              <span className={filters.score > 0 ? "text-green-600 font-medium" : "text-gray-500"}>
                {filters.score === 0 ? "All Scores" : `Score: ${filters.score}`}
              </span>
              <span className="text-gray-500">Max: 80</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {filters.score === 0 
              ? "Showing all colleges"
              : `Showing colleges that accept a score of ${filters.score} or lower`
            }
          </p>
        </div>

        {/* Zip Code Input */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0094D4]" />
            <Label htmlFor="zipCode">Your Zip Code</Label>
          </div>
          <Input
            id="zipCode"
            type="text"
            placeholder="e.g., 10001"
            value={filters.zipCode}
            onChange={(e) =>
              onFiltersChange({ ...filters, zipCode: e.target.value })
            }
            maxLength={5}
            className={`border-gray-300 focus:border-[#0094D4] focus:ring-[#0094D4] ${
              filters.zipCode ? 'border-green-500 text-green-600 font-medium' : ''
            }`}
          />
          <p className="text-xs text-gray-500">
            {filters.zipCode 
              ? "Enter a distance below to filter" 
              : "Enter your zip code to enable distance filtering"
            }
          </p>
        </div>

        {/* Distance Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0094D4]" />
            <Label>Distance (miles)</Label>
          </div>
          <div className="space-y-2">
            <Slider
              min={0}
              max={500}
              step={25}
              value={[filters.distance]}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, distance: value[0] })
              }
              className="w-full"
              disabled={!filters.zipCode}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">0 mi</span>
              <span className={filters.distance > 0 && filters.zipCode ? "text-green-600 font-medium" : "text-gray-500"}>
                {filters.distance === 0 ? "Any Distance" : `${filters.distance} miles`}
              </span>
              <span className="text-gray-500">500 mi</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {!filters.zipCode 
              ? "Enter zip code above to enable" 
              : filters.distance === 0
                ? "Showing all colleges sorted by distance"
                : `Showing colleges within ${filters.distance} miles`
            }
          </p>
        </div>

        {/* Clear Filters */}
        {(filters.score > 0 || filters.zipCode || filters.distance > 0) && (
          <button
            onClick={() => onFiltersChange({ score: 0, zipCode: "", distance: 0 })}
            className="w-full text-sm text-[#0094D4] hover:text-[#0080b8] transition-colors py-2 border border-[#0094D4] rounded hover:bg-[#E6F7FF]"
          >
            Clear All Filters
          </button>
        )}
      </CardContent>
    </Card>
  );
}
