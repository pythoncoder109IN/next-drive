"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { useDebounce } from 'use-debounce';
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";

const EnhancedSearch = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setOpen(false);
        setResults([]);
        setIsLoading(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }
      
      setIsLoading(true);
      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
      setIsLoading(false);
    };
    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file) => {
    setOpen(false);
    setResults([]);
    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`
    );
  };

  const clearSearch = () => {
    setQuery("");
    setOpen(false);
    setResults([]);
  };

  return (
    <div className="search relative">
      <motion.div
        className="search-input-wrapper bg-white border border-light-300 hover:border-brand/50 focus-within:border-brand transition-all duration-200"
        whileFocus={{ scale: 1.02 }}
      >
        <SearchIcon className="text-light-200" size={20} />
        <Input
          value={query}
          placeholder="Search files..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={clearSearch}
              className="p-1 rounded-full hover:bg-light-300 transition-colors"
            >
              <X size={16} className="text-light-200" />
            </motion.button>
          )}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full"
          />
        )}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="search-result border border-light-300 shadow-drop-3"
          >
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.slice(0, 5).map((file, index) => (
                  <motion.div
                    key={file.$id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleClickItem(file)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-light-300 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Thumbnail
                        type={file.type}
                        extension={file.extension}
                        url={file.url}
                        className="size-8 min-w-8"
                      />
                      <div>
                        <p className="font-medium text-light-100 line-clamp-1">
                          {file.name}
                        </p>
                        <p className="text-xs text-light-200">
                          {file.type.charAt(0).toUpperCase() + file.type.slice(1)}
                        </p>
                      </div>
                    </div>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="text-xs text-light-200"
                    />
                  </motion.div>
                ))}
                {results.length > 5 && (
                  <div className="text-center py-2 text-sm text-light-200 border-t border-light-300">
                    +{results.length - 5} more results
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <SearchIcon className="mx-auto mb-2 text-light-200" size={32} />
                <p className="text-light-200">No files found</p>
                <p className="text-xs text-light-200 mt-1">Try a different search term</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedSearch;