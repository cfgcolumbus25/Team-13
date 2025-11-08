import { useState, FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero banner with image overlay */}
      <div className="relative h-[500px] md:h-[600px]">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1722248540590-ba8b7af1d7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY29sbGVnZSUyMGxpYnJhcnl8ZW58MXx8fHwxNzYyNTUzNDkxfDA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/95 via-[#003366]/85 to-[#0094D4]/75"></div>
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            className="max-w-3xl text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Find Your College Credit Path
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover which colleges accept your CLEP exams and how many credits you can earn toward your degree.
            </motion.p>

            {/* Search input */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="relative max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex gap-3 bg-white rounded-lg shadow-xl p-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by college or exam name (e.g., Calculus, English)..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-gray-800"
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-[#0094D4] to-[#00bcd4] hover:from-[#0080b8] hover:to-[#00a8c0] px-8 h-14 shadow-md hover:shadow-lg transition-all duration-200 rounded-md"
                >
                  Search
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-[#E6F7FF] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "2,900+", label: "Colleges in Database", delay: 0 },
              { value: "34", label: "CLEP Exams", delay: 0.1 },
              { value: "$1,000+", label: "Average Savings", delay: 0.2 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stat.delay }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl text-[#0094D4] mb-2"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    delay: stat.delay + 0.2 
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}