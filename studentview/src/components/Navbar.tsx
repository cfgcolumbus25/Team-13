import { useState, FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, User } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#0094D4] to-[#00bcd4] rounded flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-xl">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-[#003366]">CLEP Finder</h1>
              <p className="text-xs text-gray-600">by Modern States</p>
            </div>
          </motion.div>

          {/* Search bar - desktop */}
          <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search colleges or exams (e.g., Calculus, English)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-300 focus:border-[#0094D4] focus:ring-[#0094D4] rounded transition-all duration-200"
              />
            </div>
          </form>

          {/* Profile icon */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <User className="w-5 h-5 text-gray-600" />
            </Button>
          </motion.div>
        </div>

        {/* Search bar - mobile */}
        <form onSubmit={handleSubmit} className="md:hidden mt-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by college or exam"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-300 focus:border-[#0094D4] focus:ring-[#0094D4] rounded"
            />
          </div>
        </form>
      </div>
    </motion.nav>
  );
}