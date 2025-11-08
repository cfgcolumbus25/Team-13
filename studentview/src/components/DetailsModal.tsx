import { College } from "../App";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, MapPin, GraduationCap, FileText, Calendar } from "lucide-react";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";

interface DetailsModalProps {
  college: College;
  onClose: () => void;
}

export function DetailsModal({ college, onClose }: DetailsModalProps) {
  const totalCredits = college.exams.reduce((sum, exam) => sum + exam.creditsAwarded, 0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-2xl text-[#003366] mb-2">
                  {college.name}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap gap-3 items-center">
                  <span className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {college.state}
                  </span>
                  <Badge variant="outline" className="border-gray-300 text-gray-700 capitalize">
                    {college.type}
                  </Badge>
                </DialogDescription>
              </div>
              <motion.div 
                className="text-right bg-[#E6F7FF] rounded-lg p-3 border border-gray-200"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="text-3xl text-[#0094D4]">{totalCredits}</div>
                <div className="text-sm text-gray-700">Total Credits</div>
              </motion.div>
            </div>
          </DialogHeader>

          <Separator className="bg-gray-200 my-4" />

          {/* CLEP Policy */}
          <motion.div 
            className="space-y-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-[#003366]">
              <FileText className="w-5 h-5 text-[#0094D4]" />
              <h4>CLEP Credit Policy</h4>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {college.policyDescription}
            </p>
          </motion.div>

          <Separator className="bg-gray-200 my-4" />

          {/* Accepted Exams */}
          <motion.div 
            className="space-y-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-[#003366]">
              <GraduationCap className="w-5 h-5 text-[#0094D4]" />
              <h4>Accepted CLEP Exams ({college.exams.length})</h4>
            </div>
            
            <div className="grid gap-3">
              {college.exams.map((exam, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.05) }}
                  className="bg-[#E6F7FF] rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h5 className="text-[#003366] mb-1">{exam.name}</h5>
                      <p className="text-sm text-gray-600">
                        {exam.courseEquivalency}
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-[#0094D4] to-[#00bcd4] text-white shadow-sm shrink-0">
                      {exam.creditsAwarded} {exam.creditsAwarded === 1 ? 'credit' : 'credits'}
                    </Badge>
                  </div>
                  {exam.minScore && (
                    <p className="text-xs text-gray-500">
                      Minimum score: {exam.minScore}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Separator className="bg-gray-200 my-4" />

          {/* Footer */}
          <motion.div 
            className="flex items-center justify-between pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              Last updated: {new Date(college.lastUpdated).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <Button 
              onClick={() => window.open(college.website, '_blank')}
              className="bg-gradient-to-r from-[#0094D4] to-[#00bcd4] hover:from-[#0080b8] hover:to-[#00a8c0] text-white shadow-sm hover:shadow-md transition-all duration-200 rounded"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit College Website
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}