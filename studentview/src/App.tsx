import { useState } from "react";
import { SearchPanel } from "./components/SearchPanel";
import { CollegeResults } from "./components/CollegeResults";
import { CollegeDetailsModal } from "./components/CollegeDetailsModal";
import React from "react"


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
  "English Literature",
  "Financial Accounting",
  "French Language",
  "German Language",
  "History of the United States I",
  "History of the United States II",
  "Introduction to Educational Psychology",
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
  "Social Sciences and History",
  "Spanish Language",
  "Western Civilization I",
  "Western Civilization II"
];

// Mock data
const mockColleges: College[] = [
  {
    id: "1",
    name: "Wright State University",
    state: "Ohio",
    type: "public",
    coordinates: { lat: 39.7804, lng: -84.0633 },
    exams: [
      { name: "Calculus", creditsAwarded: 4, courseEquivalency: "MTH 2300", minScore: 50 },
      { name: "Biology", creditsAwarded: 6, courseEquivalency: "BIO 1050 & 1060", minScore: 55 },
      { name: "American Government", creditsAwarded: 3, courseEquivalency: "PLS 2120", minScore: 50 },
      { name: "College Algebra", creditsAwarded: 3, courseEquivalency: "MTH 1280", minScore: 50 },
      { name: "Information Systems", creditsAwarded: 3, courseEquivalency: "MIS 2000", minScore: 50 }
    ],
    lastUpdated: "2025-07-22",
    totalCredits: 0
  },
  {
    id: "2",
    name: "Ohio State University",
    state: "Ohio",
    type: "public",
    coordinates: { lat: 40.0142, lng: -83.0309 },
    exams: [
      { name: "College Composition", creditsAwarded: 6, courseEquivalency: "ENGL 1110", minScore: 50 },
      { name: "Calculus", creditsAwarded: 8, courseEquivalency: "MATH 1151 & 1172", minScore: 60 },
      { name: "Chemistry", creditsAwarded: 6, courseEquivalency: "CHEM 1210 & 1220", minScore: 55 },
      { name: "Biology", creditsAwarded: 8, courseEquivalency: "BIO 1113 & 1114", minScore: 55 },
      { name: "Introductory Psychology", creditsAwarded: 3, courseEquivalency: "PSYCH 1100", minScore: 50 }
    ],
    lastUpdated: "2025-06-10",
    totalCredits: 0
  },
  {
    id: "3",
    name: "Michigan State University",
    state: "Michigan",
    type: "public",
    coordinates: { lat: 42.7251, lng: -84.4793 },
    exams: [
      { name: "Principles of Microeconomics", creditsAwarded: 3, courseEquivalency: "EC 201", minScore: 50 },
      { name: "Principles of Macroeconomics", creditsAwarded: 3, courseEquivalency: "EC 202", minScore: 50 },
      { name: "Chemistry", creditsAwarded: 4, courseEquivalency: "CEM 141", minScore: 55 },
      { name: "Calculus", creditsAwarded: 4, courseEquivalency: "MTH 132", minScore: 50 },
      { name: "Humanities", creditsAwarded: 3, courseEquivalency: "IAH 201", minScore: 50 }
    ],
    lastUpdated: "2024-11-18",
    totalCredits: 0
  },
  {
    id: "4",
    name: "University of Dayton",
    state: "Ohio",
    type: "private",
    coordinates: { lat: 39.7392, lng: -84.1797 },
    exams: [
      { name: "College Algebra", creditsAwarded: 3, courseEquivalency: "MTH 114", minScore: 50 },
      { name: "Introductory Psychology", creditsAwarded: 3, courseEquivalency: "PSY 101", minScore: 50 },
      { name: "Western Civilization I", creditsAwarded: 3, courseEquivalency: "HST 101", minScore: 50 },
      { name: "Human Growth and Development", creditsAwarded: 3, courseEquivalency: "PSY 251", minScore: 55 }
    ],
    lastUpdated: "2025-03-04",
    totalCredits: 0
  },
  {
    id: "5",
    name: "Salisbury University",
    state: "Maryland",
    type: "public",
    coordinates: { lat: 38.3457, lng: -75.6056 },
    exams: [
      { name: "Principles of Management", creditsAwarded: 3, courseEquivalency: "MGMT 320", minScore: 50 },
      { name: "Principles of Marketing", creditsAwarded: 3, courseEquivalency: "MKTG 330", minScore: 50 },
      { name: "Information Systems", creditsAwarded: 3, courseEquivalency: "INFO 211", minScore: 50 },
      { name: "Financial Accounting", creditsAwarded: 3, courseEquivalency: "ACCT 201", minScore: 55 }
    ],
    lastUpdated: "2025-09-15",
    totalCredits: 0
  },
  {
    id: "6",
    name: "Delaware State University",
    state: "Delaware",
    type: "public",
    coordinates: { lat: 39.185, lng: -75.5413 },
    exams: [
      { name: "College Mathematics", creditsAwarded: 6, courseEquivalency: "MATH 101 & 102", minScore: 50 },
      { name: "Financial Accounting", creditsAwarded: 3, courseEquivalency: "ACCT 201", minScore: 55 },
      { name: "American Government", creditsAwarded: 3, courseEquivalency: "POSC 150", minScore: 50 }
    ],
    lastUpdated: "2024-08-28",
    totalCredits: 0
  },
  {
    id: "7",
    name: "New Jersey Institute of Technology",
    state: "New Jersey",
    type: "public",
    coordinates: { lat: 40.742, lng: -74.179 },
    exams: [
      { name: "Information Systems", creditsAwarded: 3, courseEquivalency: "IS 219", minScore: 50 },
      { name: "College Algebra", creditsAwarded: 3, courseEquivalency: "MATH 107", minScore: 50 },
      { name: "Humanities", creditsAwarded: 3, courseEquivalency: "HUM 101", minScore: 50 },
      { name: "Precalculus", creditsAwarded: 4, courseEquivalency: "MATH 108", minScore: 50 }
    ],
    lastUpdated: "2025-02-19",
    totalCredits: 0
  },
  {
    id: "8",
    name: "Tufts University",
    state: "Massachusetts",
    type: "private",
    coordinates: { lat: 42.4069, lng: -71.1199 },
    exams: [
      { name: "Human Growth and Development", creditsAwarded: 3, courseEquivalency: "PSY 13", minScore: 55 },
      { name: "Analyzing and Interpreting Literature", creditsAwarded: 6, courseEquivalency: "ENG 11 & 12", minScore: 50 },
      { name: "French Language", creditsAwarded: 6, courseEquivalency: "FREN 1 & 2", minScore: 50 }
    ],
    lastUpdated: "2024-12-02",
    totalCredits: 0
  },
  {
    id: "9",
    name: "University of Delaware",
    state: "Delaware",
    type: "public",
    coordinates: { lat: 39.678, lng: -75.7523 },
    exams: [
      { name: "Principles of Microeconomics", creditsAwarded: 3, courseEquivalency: "ECON 101", minScore: 50 },
      { name: "Principles of Macroeconomics", creditsAwarded: 3, courseEquivalency: "ECON 103", minScore: 50 },
      { name: "Natural Sciences", creditsAwarded: 6, courseEquivalency: "SCEN 101 & 102", minScore: 50 }
    ],
    lastUpdated: "2024-07-14",
    totalCredits: 0
  },
  {
    id: "10",
    name: "Syracuse University",
    state: "New York",
    type: "private",
    coordinates: { lat: 43.0392, lng: -76.1351 },
    exams: [
      { name: "Western Civilization II", creditsAwarded: 3, courseEquivalency: "HST 102", minScore: 50 },
      { name: "Humanities", creditsAwarded: 3, courseEquivalency: "HUM 120", minScore: 55 },
      { name: "Introductory Sociology", creditsAwarded: 3, courseEquivalency: "SOC 101", minScore: 50 }
    ],
    lastUpdated: "2025-04-30",
    totalCredits: 0
  },
  {
    id: "11",
    name: "Ohio Northern University",
    state: "Ohio",
    type: "private",
    coordinates: { lat: 40.7667, lng: -83.8279 },
    exams: [
      { name: "Precalculus", creditsAwarded: 4, courseEquivalency: "MATH 1451", minScore: 50 },
      { name: "English Literature", creditsAwarded: 3, courseEquivalency: "ENGL 2001", minScore: 50 },
      { name: "Information Systems", creditsAwarded: 3, courseEquivalency: "MIS 1501", minScore: 50 }
    ],
    lastUpdated: "2025-05-18",
    totalCredits: 0
  },
  {
    id: "12",
    name: "Vanderbilt University",
    state: "Tennessee",
    type: "private",
    coordinates: { lat: 36.1447, lng: -86.8027 },
    exams: [
      { name: "Calculus", creditsAwarded: 4, courseEquivalency: "MATH 1300", minScore: 60 },
      { name: "French Language", creditsAwarded: 6, courseEquivalency: "FREN 1101 & 1102", minScore: 50 },
      { name: "Introductory Psychology", creditsAwarded: 3, courseEquivalency: "PSY 1200", minScore: 50 }
    ],
    lastUpdated: "2024-10-07",
    totalCredits: 0
  },
  {
    id: "13",
    name: "Brandeis University",
    state: "Massachusetts",
    type: "private",
    coordinates: { lat: 42.3651, lng: -71.2581 },
    exams: [
      { name: "Humanities", creditsAwarded: 3, courseEquivalency: "HUM 10a", minScore: 55 },
      { name: "German Language", creditsAwarded: 6, courseEquivalency: "GER 1 & 2", minScore: 50 },
      { name: "Analyzing and Interpreting Literature", creditsAwarded: 6, courseEquivalency: "ENG 10a & 10b", minScore: 50 }
    ],
    lastUpdated: "2025-01-26",
    totalCredits: 0
  },
  {
    id: "14",
    name: "University of Michigan",
    state: "Michigan",
    type: "public",
    coordinates: { lat: 42.278, lng: -83.7382 },
    exams: [
      { name: "Biology", creditsAwarded: 8, courseEquivalency: "BIOLOGY 171 & 172", minScore: 55 },
      { name: "Chemistry", creditsAwarded: 4, courseEquivalency: "CHEM 130", minScore: 55 },
      { name: "College Composition", creditsAwarded: 6, courseEquivalency: "WRITING 100", minScore: 50 }
    ],
    lastUpdated: "2025-08-03",
    totalCredits: 0
  },
  {
    id: "15",
    name: "Towson University",
    state: "Maryland",
    type: "public",
    coordinates: { lat: 39.3936, lng: -76.6096 },
    exams: [
      { name: "Principles of Marketing", creditsAwarded: 3, courseEquivalency: "MKTG 341", minScore: 50 },
      { name: "Principles of Management", creditsAwarded: 3, courseEquivalency: "MNGT 361", minScore: 50 },
      { name: "Introductory Business Law", creditsAwarded: 3, courseEquivalency: "LEGL 225", minScore: 50 }
    ],
    lastUpdated: "2024-09-22",
    totalCredits: 0
  },
  {
    id: "16",
    name: "SUNY Buffalo",
    state: "New York",
    type: "public",
    coordinates: { lat: 43.001, lng: -78.787 },
    exams: [
      { name: "Precalculus", creditsAwarded: 4, courseEquivalency: "MTH 121", minScore: 50 },
      { name: "Western Civilization I", creditsAwarded: 3, courseEquivalency: "HIS 101", minScore: 50 },
      { name: "Information Systems", creditsAwarded: 3, courseEquivalency: "MGS 351", minScore: 50 }
    ],
    lastUpdated: "2025-10-11",
    totalCredits: 0
  },
  {
    id: "17",
    name: "University Of Central Florida",
    state: "Florida",
    type: "public",
    coordinates: { lat: 28.6024, lng: -81.2001 },
    exams: [
      { name: "College Algebra", creditsAwarded: 3, courseEquivalency: "MAC 1105", minScore: 50 },
      { name: "Natural Sciences", creditsAwarded: 6, courseEquivalency: "ISC 1001 & 1002", minScore: 50 },
      { name: "Social Sciences and History", creditsAwarded: 6, courseEquivalency: "SYG 2000 & AMH 2010", minScore: 50 }
    ],
    lastUpdated: "2024-06-05",
    totalCredits: 0
  },
  {
    id: "18",
    name: "New York University",
    state: "New York",
    type: "private",
    coordinates: { lat: 40.7295, lng: -73.9965 },
    exams: [
      { name: "College Composition", creditsAwarded: 6, courseEquivalency: "EXPOS-UA 1", minScore: 50 },
      { name: "French Language", creditsAwarded: 6, courseEquivalency: "FRNCH-UA 1 & 2", minScore: 50 },
      { name: "Principles of Microeconomics", creditsAwarded: 3, courseEquivalency: "ECON-UA 2", minScore: 50 }
    ],
    lastUpdated: "2025-01-03",
    totalCredits: 0
  },
  {
    id: "19",
    name: "DePaul University",
    state: "Illinois",
    type: "private",
    coordinates: { lat: 41.924, lng: -87.6543 },
    exams: [
      { name: "Introductory Sociology", creditsAwarded: 4, courseEquivalency: "SOC 101", minScore: 50 },
      { name: "American Government", creditsAwarded: 4, courseEquivalency: "PSC 120", minScore: 50 },
      { name: "College Mathematics", creditsAwarded: 4, courseEquivalency: "MAT 120", minScore: 50 }
    ],
    lastUpdated: "2024-04-27",
    totalCredits: 0
  },
  {
    id: "20",
    name: "Drexel University",
    state: "Pennsylvania",
    type: "private",
    coordinates: { lat: 39.9574, lng: -75.188 },
    exams: [
      { name: "Information Systems", creditsAwarded: 3, courseEquivalency: "INFO 110", minScore: 50 },
      { name: "Principles of Marketing", creditsAwarded: 3, courseEquivalency: "MKTG 201", minScore: 50 },
      { name: "Calculus", creditsAwarded: 4, courseEquivalency: "MATH 121", minScore: 50 }
    ],
    lastUpdated: "2024-02-12",
    totalCredits: 0
  },
  {
    id: "21",
    name: "Temple University",
    state: "Pennsylvania",
    type: "public",
    coordinates: { lat: 39.9812, lng: -75.1555 },
    exams: [
      { name: "History of the United States I", creditsAwarded: 3, courseEquivalency: "HIST 1101", minScore: 50 },
      { name: "History of the United States II", creditsAwarded: 3, courseEquivalency: "HIST 1102", minScore: 50 },
      { name: "Introductory Business Law", creditsAwarded: 3, courseEquivalency: "LEGAL ST 1101", minScore: 50 }
    ],
    lastUpdated: "2025-09-01",
    totalCredits: 0
  },
  {
    id: "22",
    name: "Denison University",
    state: "Ohio",
    type: "private",
    coordinates: { lat: 40.0748, lng: -82.5197 },
    exams: [
      { name: "English Literature", creditsAwarded: 4, courseEquivalency: "ENGL 199", minScore: 50 },
      { name: "German Language", creditsAwarded: 6, courseEquivalency: "GERM 111 & 112", minScore: 50 },
      { name: "Social Sciences and History", creditsAwarded: 6, courseEquivalency: "GE SOSC/HIST 100", minScore: 50 }
    ],
    lastUpdated: "2025-03-29",
    totalCredits: 0
  }
];

// Simple zip code to coordinates lookup (mock data for demonstration)
const zipToCoords: Record<string, { lat: number; lng: number }> = {
  "10001": { lat: 40.7506, lng: -73.9971 }, // NYC
  "90001": { lat: 33.9731, lng: -118.2479 }, // LA
  "60601": { lat: 41.8857, lng: -87.6181 }, // Chicago
  "77001": { lat: 29.7589, lng: -95.3677 }, // Houston
  "85001": { lat: 33.4484, lng: -112.0740 }, // Phoenix
  "43210": { lat: 40.0030, lng: -83.0158 }, // Columbus, OH (OSU area)
  "43017": { lat: 40.0992, lng: -83.1141 }, // Dublin, OH
  "43064": { lat: 40.0989, lng: -83.2688 }, // Plain City, OH
  "43015": { lat: 40.2987, lng: -83.0677 }, // Delaware, OH
  "43035": { lat: 40.1984, lng: -83.0107 }  // Lewis Center, OH


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