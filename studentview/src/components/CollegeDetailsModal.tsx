import { College } from "../App";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, GraduationCap, Building2, Calendar, X } from "lucide-react";

interface CollegeDetailsModalProps {
  college: College;
  onClose: () => void;
}

export function CollegeDetailsModal({ college, onClose }: CollegeDetailsModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#0D1726] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#a4d233]" />
            {college.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Detailed information about the college and its CLEP exam policies.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* College Info */}
          <div className="flex flex-wrap gap-3 items-center text-sm">
            <span className="flex items-center gap-1 text-gray-600">
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

          {/* Total Credits */}
          <div className="bg-[#f0f8e6] border border-[#a4d233] rounded p-6 text-center">
            <div className="text-4xl text-[#a4d233] mb-2">{college.totalCredits}</div>
            <div className="text-[#0D1726]">Total CLEP Credits Available</div>
          </div>

          {/* Exams */}
          <div>
            <div className="flex items-center gap-2 text-[#0D1726] mb-4">
              <GraduationCap className="w-5 h-5 text-[#a4d233]" />
              <h3 className="text-xl">Accepted CLEP Exams ({college.exams.length})</h3>
            </div>
            
            <div className="space-y-3">
              {college.exams.map((exam, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-[#0D1726] font-medium">{exam.name}</h4>
                    <Badge className="bg-[#a4d233] text-white">{exam.creditsAwarded} credits</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Course Equivalency:</span> {exam.courseEquivalency}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Minimum Score Required:</span> {exam.minScore}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-200">
            <Calendar className="w-4 h-4" />
            Last updated: {new Date(college.lastUpdated).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>

          {/* Close Button */}
          <Button 
            onClick={onClose}
            className="w-full bg-[#a4d233] hover:bg-[#8fb829] text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}