import { useState } from "react";
import { College, FilterState, AVAILABLE_CLEP_EXAMS } from "../App";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Search, MapPin, Award, GraduationCap, Building2, ChevronDown } from "lucide-react";

interface CollegeResultsProps {
  colleges: College[];
  searchQuery: string;
  filters: FilterState;
  onSearchChange: (query: string) => void;
  onFiltersChange: (filters: FilterState) => void;
  onViewDetails: (college: College) => void;
}

export function CollegeResults({ colleges, filters, onFiltersChange, onViewDetails }: CollegeResultsProps) {
  const [showFilters, setShowFilters] = useState(false);

  // Check if an exam is selected
  const isExamSelected = (examName: string) => {
    return filters.selectedExams.some(selectedExam => 
      examName.toLowerCase().includes(selectedExam.toLowerCase())
    );
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6 lg:p-12">
        {/* Header Card */}
        <Card className="bg-white p-8 mb-8 shadow-sm border-gray-200">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#a4d233] flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-[#0D1726] text-2xl mb-2">
            College CLEP Search
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Find colleges that accept your CLEP exam credits
          </p>

          {/* Info Banner */}
          <div className="bg-[#fcf8e3] border border-[#d4c77a] rounded p-4 mb-6">
            <p className="text-sm text-[#8a6d3b]">
              Select CLEP exams from the dropdown below. Use additional filters to refine your results by score and location.
            </p>
          </div>

          {/* Exam Selector */}
          <div className="mb-6">
            <Label htmlFor="exams" className="text-[#0D1726] mb-2 block">
              Select CLEP Exams
            </Label>
            <Popover>
              <PopoverTrigger className="w-full">
                <div className="w-full h-12 flex items-center justify-between border border-gray-300 rounded px-4 hover:border-[#a4d233] focus:border-[#a4d233] focus:ring-2 focus:ring-[#a4d233] bg-white cursor-pointer">
                  <div className="flex flex-wrap gap-1 flex-1 overflow-hidden">
                    {filters.selectedExams.length === 0 ? (
                      <span className="text-gray-500">Select CLEP exams...</span>
                    ) : (
                      <>
                        {filters.selectedExams.slice(0, 2).map((exam, index) => (
                          <Badge key={index} className="bg-[#a4d233] text-white">
                            {exam}
                          </Badge>
                        ))}
                        {filters.selectedExams.length > 2 && (
                          <Badge className="bg-gray-500 text-white">
                            +{filters.selectedExams.length - 2} more
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 ml-2 flex-shrink-0" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0" align="start">
                <ScrollArea className="h-64">
                  <div className="p-4 space-y-3">
                    {AVAILABLE_CLEP_EXAMS.map((exam) => (
                      <div key={exam} className="flex items-center space-x-2">
                        <Checkbox
                          id={exam}
                          checked={filters.selectedExams.includes(exam)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              onFiltersChange({ 
                                ...filters, 
                                selectedExams: [...filters.selectedExams, exam],
                                examScores: { ...filters.examScores, [exam]: 50 } // Default score
                              });
                            } else {
                              const newExamScores = { ...filters.examScores };
                              delete newExamScores[exam];
                              onFiltersChange({ 
                                ...filters, 
                                selectedExams: filters.selectedExams.filter(e => e !== exam),
                                examScores: newExamScores
                              });
                            }
                          }}
                        />
                        <Label 
                          htmlFor={exam} 
                          className="text-sm text-gray-700 cursor-pointer flex-1"
                        >
                          {exam}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>

          {/* Selected Exams with Score Inputs */}
          {filters.selectedExams.length > 0 && (
            <div className="mb-6 space-y-3">
              <Label className="text-[#0D1726]">Your Exam Scores</Label>
              {filters.selectedExams.map((exam) => (
                <div key={exam} className="flex items-center gap-3">
                  <Badge className="bg-[#a4d233] text-white min-w-[180px] flex-shrink-0 py-2">
                    {exam}
                  </Badge>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="number"
                      min="0"
                      max="80"
                      value={filters.examScores[exam] || 50}
                      onChange={(e) => {
                        const score = Math.max(0, Math.min(80, parseInt(e.target.value) || 0));
                        onFiltersChange({
                          ...filters,
                          examScores: { ...filters.examScores, [exam]: score }
                        });
                      }}
                      className="w-20 border-gray-300 focus:border-[#a4d233] focus:ring-[#a4d233]"
                    />
                    <span className="text-sm text-gray-600">/ 80</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Filters Toggle */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full mb-4 border-[#a4d233] text-[#a4d233] hover:bg-[#a4d233] hover:text-white"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {/* Filters Section */}
          {showFilters && (
            <div className="space-y-6 pt-4 border-t border-gray-200">
              {/* Zip Code */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#a4d233]" />
                  <Label htmlFor="zipCode" className="text-[#0D1726]">Your Zip Code</Label>
                </div>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="e.g., 10001"
                  value={filters.zipCode}
                  onChange={(e) => onFiltersChange({ ...filters, zipCode: e.target.value })}
                  maxLength={5}
                  className={`border-gray-300 focus:border-[#a4d233] focus:ring-[#a4d233] ${
                    filters.zipCode ? 'border-[#a4d233] text-[#a4d233]' : ''
                  }`}
                />
              </div>

              {/* Distance Filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#a4d233]" />
                  <Label className="text-[#0D1726]">Distance (miles)</Label>
                </div>
                <Slider
                  min={0}
                  max={500}
                  step={25}
                  value={[filters.distance]}
                  onValueChange={(value) => onFiltersChange({ ...filters, distance: value[0] })}
                  disabled={!filters.zipCode}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">0 mi</span>
                  <span className={filters.distance > 0 && filters.zipCode ? "text-[#a4d233]" : "text-gray-500"}>
                    {filters.distance === 0 ? "Any Distance" : `${filters.distance} miles`}
                  </span>
                  <span className="text-gray-500">500 mi</span>
                </div>
              </div>

              {/* Clear Filters */}
              {(filters.zipCode || filters.distance > 0 || filters.selectedExams.length > 0) && (
                <Button
                  onClick={() => {
                    onFiltersChange({ examScores: {}, zipCode: "", distance: 0, selectedExams: [] });
                  }}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          )}

          {/* Search Button */}
          <Button className="w-full h-12 bg-[#a4d233] hover:bg-[#8fb829] text-white mt-6">
            Search for Colleges
          </Button>

          {/* Help Text */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Need help? <a href="#" className="text-[#a4d233] hover:underline">Contact Support</a>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <h3 className="text-[#0D1726] text-xl">
            {colleges.length} {colleges.length === 1 ? 'College' : 'Colleges'} Found
          </h3>
          {filters.selectedExams.length > 0 && (
            <p className="text-gray-600 text-sm mt-1">
              Showing results for: {filters.selectedExams.map((exam, i) => (
                <span key={i} className="text-[#a4d233]">
                  {exam}{i < filters.selectedExams.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>

        {/* College Cards */}
        <div className="space-y-4">
          {colleges.map((college) => (
            <Card key={college.id} className="bg-white p-6 shadow-sm border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-[#0D1726]" />
                    <h4 className="text-[#0D1726] text-xl">{college.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {college.state}
                    </span>
                    <span className="text-gray-300">•</span>
                    <Badge variant="outline" className="border-gray-300 text-gray-700 capitalize">
                      {college.type}
                    </Badge>
                    {college.distance && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-[#a4d233]">{college.distance.toFixed(0)} miles away</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl text-[#a4d233]">{college.totalCredits}</div>
                  <div className="text-xs text-gray-500">Total Credits</div>
                </div>
              </div>

              {/* Exams */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-gray-700 mb-3">
                  <GraduationCap className="w-4 h-4 text-[#a4d233]" />
                  <span className="text-sm">Accepted CLEP Exams ({college.exams.length})</span>
                </div>
                
                <div className="grid gap-2">
                  {college.exams.map((exam, index) => (
                    <div 
                      key={index}
                      className={`rounded p-3 border transition-colors ${
                        isExamSelected(exam.name) 
                          ? 'border-[#a4d233] bg-[#f0f8e6]' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={isExamSelected(exam.name) ? 'text-[#2c3e50] font-medium' : 'text-[#2c3e50]'}>
                          {exam.name}
                        </span>
                        <Badge className="bg-[#a4d233] text-white">{exam.creditsAwarded} credits</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {exam.courseEquivalency}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Min. score: {exam.minScore}
                      </div>
                    </div>
                  ))}</div>
              </div>

              {/* View Details Button */}
              <Button 
                onClick={() => onViewDetails(college)}
                className="w-full bg-[#a4d233] hover:bg-[#8fb829] text-white"
              >
                View Full Details
              </Button>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {colleges.length === 0 && (
          <Card className="bg-white p-12 text-center shadow-sm border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-[#0D1726] text-xl mb-2">No Colleges Found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more results.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}