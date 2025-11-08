import { FilterState } from "../App";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Shield, BarChart3, Users, Search, MapPin, Award } from "lucide-react";

interface SearchPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function SearchPanel({ searchQuery, onSearchChange, filters, onFiltersChange }: SearchPanelProps) {
  return (
    <div className="w-full lg:w-[500px] bg-[#0D1726] text-white flex flex-col">
      <div className="p-8 lg:p-12 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl mb-4">
            Welcome to the<br />CLEP Finder Portal
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Search colleges that accept CLEP exams, filter by your score and location, and discover how many credits you can earn toward your degree.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6 mb-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#a4d233] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-[#0D1726]" />
            </div>
            <div>
              <h3 className="text-xl mb-1">Smart Search</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Search by college name or multiple CLEP exam names with instant results and filtering.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#a4d233] flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-[#0D1726]" />
            </div>
            <div>
              <h3 className="text-xl mb-1">Credit Calculator</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                See exactly how many credits each college awards for your CLEP exam scores.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#a4d233] flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-[#0D1726]" />
            </div>
            <div>
              <h3 className="text-xl mb-1">Location Based</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Filter colleges by distance from your zip code to find nearby options.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-600">
          <p className="text-sm text-gray-400">
            Powered by Modern States
          </p>
        </div>
      </div>
    </div>
  );
}