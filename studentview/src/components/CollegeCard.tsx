import { College } from "../App";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, GraduationCap, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import React from "react"

interface CollegeCardProps {
  college: College;
  onViewDetails: () => void;
  searchQuery?: string;
}

export function CollegeCard({ college, onViewDetails, searchQuery = "" }: CollegeCardProps) {
  // Parse search query - split by commas and trim whitespace
  const searchTerms = searchQuery 
    ? searchQuery.split(',').map(term => term.trim().toLowerCase()).filter(term => term.length > 0)
    : [];
  
  // Calculate credits based on search query
  const matchingExams = searchTerms.length > 0
    ? college.exams.filter(exam => 
        searchTerms.some(term => exam.name.toLowerCase().includes(term))
      )
    : college.exams;
  
  const displayCredits = matchingExams.reduce((sum, exam) => sum + exam.creditsAwarded, 0);
  const isFiltered = searchTerms.length > 0;

  const isExamMatch = (examName: string) => {
    return searchTerms.some(term => examName.toLowerCase().includes(term));
  };

  return (
    <Card className="border-gray-200 hover:shadow-lg hover:border-[#0094D4]/30 transition-all duration-200 bg-white group">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-[#003366] mb-2 group-hover:text-[#0094D4] transition-colors duration-200">{college.name}</h4>
            <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {college.state}
              </span>
              <span className="text-gray-300">•</span>
              <Badge variant="outline" className="border-gray-300 text-gray-700 capitalize">
                {college.type}
              </Badge>
            </div>
          </div>
          <motion.div 
            className="text-right"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl text-[#0094D4]">{displayCredits}</div>
            <div className="text-xs text-gray-500">Total Credits</div>
          </motion.div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <GraduationCap className="w-4 h-4 text-[#0094D4]" />
            <span className="text-sm">Accepted CLEP Exams ({college.exams.length})</span>
          </div>
          
          <div className="grid gap-2">
            {college.exams.map((exam, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className={`bg-[#E6F7FF] rounded p-3 border transition-all duration-200 hover:shadow-sm ${
                  isExamMatch(exam.name) 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-[#0094D4]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={isExamMatch(exam.name) ? 'text-green-700 font-medium' : 'text-[#003366]'}>
                    {exam.name}
                  </span>
                  <Badge className="bg-gradient-to-r from-[#0094D4] to-[#00bcd4] text-white shadow-sm">{exam.creditsAwarded} credits</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {exam.courseEquivalency}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Min. score: {exam.minScore}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          Last updated: {new Date(college.lastUpdated).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </div>
        <Button 
          onClick={onViewDetails}
          className="bg-gradient-to-r from-[#0094D4] to-[#00bcd4] hover:from-[#0080b8] hover:to-[#00a8c0] text-white shadow-sm hover:shadow-md transition-all duration-200 rounded"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}