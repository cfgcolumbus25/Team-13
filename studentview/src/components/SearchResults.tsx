import { College } from "../App";
import { CollegeCard } from "./CollegeCard";
import { SearchX, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Skeleton } from "./ui/skeleton";

interface SearchResultsProps {
  colleges: College[];
  searchQuery: string;
  onViewDetails: (college: College) => void;
  isLoading?: boolean;
}

export function SearchResults({ colleges, searchQuery, onViewDetails, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>

        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <SearchX className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-[#003366] mb-2">No results found</h3>
        <p className="text-gray-600 text-center max-w-md">
          Try adjusting your search or filters to find colleges that accept CLEP exams.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between pb-4 border-b border-gray-200"
      >
        <div>
          <h3 className="text-[#003366]">
            {searchQuery ? `Results for "${searchQuery}"` : "All Colleges"}
          </h3>
          <p className="text-gray-600 mt-1">
            {colleges.length} {colleges.length === 1 ? "college" : "colleges"} found
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {colleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              layout
            >
              <CollegeCard 
                college={college} 
                onViewDetails={() => onViewDetails(college)}
                searchQuery={searchQuery}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}