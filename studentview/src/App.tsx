import { useState } from "react";
import { SearchPanel } from "./components/SearchPanel";
import { CollegeResults } from "./components/CollegeResults";
import { CollegeDetailsModal } from "./components/CollegeDetailsModal";

export interface Exam {
  name: string;
  creditsAwarded: number;
  courseEquivalency: string;
  minScore: number;
}

export interface College {
  id: string;
  name: string;
  state: string;
  type: string;
  exams: Exam[];
  lastUpdated: string;
  totalCredits: number;
  distance?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FilterState {
  examScores: Record<string, number>;
  zipCode: string;
  distance: number;
  selectedExams: string[];
}

// Available CLEP Exams
export const AVAILABLE_CLEP_EXAMS = [
  "American Government",
  "American Literature",
  "Analyzing and Interpreting Literature",
  "Biology",
  "Calculus",
  "Chemistry",
  "College Algebra",
  "College Composition",
  "College Mathematics",
  "English Composition",
  "English Literature",
  "Financial Accounting",
  "French Language",
  "German Language",
  "History of the United States I",
  "History of the United States II",
  "Human Growth and Development",
  "Humanities",
  "Information Systems",
  "Introductory Business Law",
  "Introductory Psychology",
  "Introductory Sociology",
  "Natural Sciences",
  "Precalculus",
  "Principles of Macroeconomics",
  "Principles of Microeconomics",
  "Principles of Management",
  "Principles of Marketing",
  "Psychology",
  "Social Sciences and History",
  "Spanish Language",
  "Western Civilization I",
  "Western Civilization II"
];

// Mock data
const mockColleges: College[] = [
  {
    id: "1",
    name: "University of California, Berkeley",
    state: "California",
    type: "public",
    coordinates: { lat: 37.8719, lng: -122.2585 },
    exams: [
      { name: "Calculus", creditsAwarded: 8, courseEquivalency: "MATH 1A & 1B", minScore: 50 },
      { name: "English Composition", creditsAwarded: 6, courseEquivalency: "ENGLISH 1A", minScore: 50 },
      { name: "Biology", creditsAwarded: 5, courseEquivalency: "BIO 1A", minScore: 55 },
      { name: "Psychology", creditsAwarded: 3, courseEquivalency: "PSYCH 1", minScore: 50 },
    ],
    lastUpdated: "2024-01-15",
    totalCredits: 0
  },
  {
    id: "2",
    name: "Stanford University",
    state: "California",
    type: "private",
    coordinates: { lat: 37.4275, lng: -122.1697 },
    exams: [
      { name: "Calculus", creditsAwarded: 10, courseEquivalency: "MATH 19 & 20", minScore: 65 },
      { name: "Chemistry", creditsAwarded: 8, courseEquivalency: "CHEM 31A & 31B", minScore: 60 },
      { name: "History", creditsAwarded: 5, courseEquivalency: "HIST 1", minScore: 55 },
    ],
    lastUpdated: "2024-02-10",
    totalCredits: 0
  },
  {
    id: "3",
    name: "Arizona State University",
    state: "Arizona",
    type: "public",
    coordinates: { lat: 33.4242, lng: -111.9281 },
    exams: [
      { name: "English Composition", creditsAwarded: 6, courseEquivalency: "ENG 101 & 102", minScore: 50 },
      { name: "Biology", creditsAwarded: 4, courseEquivalency: "BIO 181", minScore: 50 },
      { name: "American History", creditsAwarded: 6, courseEquivalency: "HST 109 & 110", minScore: 50 },
      { name: "Psychology", creditsAwarded: 3, courseEquivalency: "PSY 101", minScore: 50 },
      { name: "Spanish", creditsAwarded: 8, courseEquivalency: "SPN 101-202", minScore: 50 },
    ],
    lastUpdated: "2024-01-20",
    totalCredits: 0
  },
];

// Simple zip code to coordinates lookup (mock data for demonstration)
const zipToCoords: Record<string, { lat: number; lng: number }> = {
  "10001": { lat: 40.7506, lng: -73.9971 }, // NYC
  "90001": { lat: 33.9731, lng: -118.2479 }, // LA
  "60601": { lat: 41.8857, lng: -87.6181 }, // Chicago
  "77001": { lat: 29.7589, lng: -95.3677 }, // Houston
  "85001": { lat: 33.4484, lng: -112.0740 }, // Phoenix
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({ examScores: {}, zipCode: "", distance: 0, selectedExams: [] });
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Filter and sort colleges
  let filteredColleges = mockColleges.filter(college => {
    // Exam filter - match any of the selected exams
    const matchesExam = filters.selectedExams.length === 0 || 
      filters.selectedExams.some(selectedExam => 
        college.exams.some(exam => exam.name.toLowerCase().includes(selectedExam.toLowerCase()))
      );
    
    // Score filter - only show colleges where user's score meets at least one exam's minimum requirement
    const matchesScore = Object.keys(filters.examScores).length === 0 || 
      college.exams.some(exam => filters.examScores[exam.name] >= exam.minScore);

    return matchesExam && matchesScore;
  });

  // Calculate total credits for each college
  filteredColleges = filteredColleges.map(college => ({
    ...college,
    totalCredits: college.exams.reduce((sum, exam) => sum + exam.creditsAwarded, 0)
  }));

  // Apply distance filtering and sorting if zip code is provided
  if (filters.zipCode && zipToCoords[filters.zipCode]) {
    const userCoords = zipToCoords[filters.zipCode];
    filteredColleges = filteredColleges
      .map(college => ({
        ...college,
        distance: calculateDistance(
          userCoords.lat,
          userCoords.lng,
          college.coordinates.lat,
          college.coordinates.lng
        )
      }))
      .filter(college => {
        // If distance filter is set (> 0), only show colleges within that distance
        if (filters.distance > 0) {
          return college.distance <= filters.distance;
        }
        return true;
      })
      .sort((a, b) => {
        // First sort by total credits (highest first)
        const creditDiff = b.totalCredits - a.totalCredits;
        if (creditDiff !== 0) return creditDiff;
        // Then by distance (closest first) as tiebreaker
        return a.distance - b.distance;
      });
  } else {
    // Sort by total credits only (highest first)
    filteredColleges = filteredColleges.sort((a, b) => b.totalCredits - a.totalCredits);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Dark Navy */}
      <SearchPanel 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Right Panel - Light Gray */}
      <CollegeResults 
        colleges={filteredColleges}
        searchQuery={searchQuery}
        filters={filters}
        onSearchChange={setSearchQuery}
        onFiltersChange={setFilters}
        onViewDetails={setSelectedCollege}
      />

      {/* College Details Modal */}
      {selectedCollege && (
        <CollegeDetailsModal 
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
        />
      )}
    </div>
  );
}