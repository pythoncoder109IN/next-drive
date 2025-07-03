"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionsDropdown from "./ActionsDropdown";

const EnhancedCard = ({ file }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="file-card bg-white border border-light-300 hover:shadow-drop-3 transition-all duration-300"
    >
      <Link href={file.url} target="_blank" className="block">
        <div className="flex justify-between items-start mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Thumbnail
              type={file.type}
              extension={file.extension}
              url={file.url}
              className="!size-20 bg-gradient-to-br from-brand/10 to-brand-100/10 border border-brand/20"
              imageClassName="!size-11"
            />
          </motion.div>
          <div className="flex flex-col items-end gap-2">
            <ActionsDropdown file={file} />
            <span className="text-sm font-medium text-light-200 bg-light-300 px-2 py-1 rounded-full">
              {convertFileSize(file.size)}
            </span>
          </div>
        </div>

        <div className="file-card-details space-y-2">
          <h3 className="font-semibold text-light-100 line-clamp-1 hover:text-brand transition-colors">
            {file.name}
          </h3>
          <FormattedDateTime
            date={file.$createdAt}
            className="text-sm text-light-200"
          />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-brand/20 to-brand-100/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-brand">
                {file.owner.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-light-200 line-clamp-1">
              By: {file.owner.fullName}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EnhancedCard;