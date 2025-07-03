"use client";

import React from "react";
import { motion } from "framer-motion";
import { Chart } from "@/components/Chart";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { 
  TrendingUp, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  HardDrive,
  Upload,
  Download,
  Share2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FormattedDateTime from "@/components/FormattedDateTime";
import Thumbnail from "@/components/Thumbnail";
import ActionsDropdown from "@/components/ActionsDropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EnhancedDashboard = ({ files, totalSpace }) => {
  const usageSummary = getUsageSummary(totalSpace);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const statsCards = [
    {
      title: "Total Files",
      value: files.total || 0,
      icon: FileText,
      color: "text-blue",
      bgColor: "bg-blue/10",
      borderColor: "border-blue/20"
    },
    {
      title: "Storage Used",
      value: convertFileSize(totalSpace.used),
      icon: HardDrive,
      color: "text-brand",
      bgColor: "bg-brand/10",
      borderColor: "border-brand/20"
    },
    {
      title: "Recent Uploads",
      value: files.documents?.length || 0,
      icon: Upload,
      color: "text-green",
      bgColor: "bg-green/10",
      borderColor: "border-green/20"
    },
    {
      title: "Shared Files",
      value: "12",
      icon: Share2,
      color: "text-orange",
      bgColor: "bg-orange/10",
      borderColor: "border-orange/20"
    }
  ];

  return (
    <motion.div
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="col-span-full mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-100 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-light-200 mt-2">Welcome back! Here's your storage overview</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-brand to-brand-100 text-white px-6 py-3 rounded-full shadow-drop-2"
          >
            <TrendingUp size={20} />
            <span className="font-medium">All systems operational</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="col-span-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.title}
                variants={cardHoverVariants}
                whileHover="hover"
                className={cn(
                  "p-6 rounded-2xl border shadow-drop-1 bg-white",
                  stat.borderColor
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-light-200 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-light-100 mt-1">{stat.value}</p>
                  </div>
                  <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                    <IconComponent className={cn("w-6 h-6", stat.color)} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <section className="space-y-8">
        {/* Storage Chart */}
        <motion.div variants={itemVariants}>
          <Chart used={totalSpace.used} />
        </motion.div>

        {/* File Type Summary */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {usageSummary.map((summary, index) => (
              <motion.div
                key={summary.title}
                variants={cardHoverVariants}
                whileHover="hover"
              >
                <Link
                  href={summary.url}
                  className="block p-6 bg-white rounded-2xl shadow-drop-1 border border-light-300 hover:shadow-drop-3 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="relative">
                        <Image
                          src={summary.icon}
                          width={60}
                          height={60}
                          alt={summary.title}
                          className="summary-type-icon"
                        />
                      </div>
                      <div className="text-right">
                        <h4 className="text-xl font-bold text-light-100">
                          {convertFileSize(summary.size) || "0 MB"}
                        </h4>
                        <p className="text-sm text-light-200">Used</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-light-100 text-lg">{summary.title}</h5>
                      <div className="mt-3 h-2 bg-light-300 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand to-brand-100 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((summary.size / totalSpace.all) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>

                    <FormattedDateTime
                      date={summary.latestDate}
                      className="text-center text-sm text-light-200"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Recent Files */}
      <motion.section variants={itemVariants} className="dashboard-recent-files">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-light-100">Recent Files</h2>
          <Link
            href="/documents"
            className="text-brand hover:text-brand-100 font-medium transition-colors"
          >
            View all →
          </Link>
        </div>

        {files.documents.length > 0 ? (
          <div className="space-y-4">
            {files.documents.slice(0, 5).map((file, index) => (
              <motion.div
                key={file.$id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-light-300 hover:shadow-drop-2 transition-all duration-200"
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                  className="!size-12"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-light-100 truncate">{file.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <FormattedDateTime
                          date={file.$createdAt}
                          className="text-sm text-light-200"
                        />
                        <span className="text-sm text-light-200">
                          {convertFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                    <ActionsDropdown file={file} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-light-300 rounded-full flex items-center justify-center">
              <FileText className="w-12 h-12 text-light-200" />
            </div>
            <p className="text-light-200 text-lg">No files uploaded yet</p>
            <p className="text-light-200 text-sm mt-1">Start by uploading your first file</p>
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  );
};

export default EnhancedDashboard;