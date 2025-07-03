"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import Thumbnail from "./Thumbnail";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";

const EnhancedFileUploader = ({ ownerId, accountId, className }) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setFiles(acceptedFiles);
      
      const uploadPromises = acceptedFiles.map(async (file, index) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
          return toast({
            description: (
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red" size={20} />
                <div>
                  <p className="font-medium text-white">File too large</p>
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold">{file.name}</span> exceeds 50MB limit
                  </p>
                </div>
              </div>
            ),
            className: "error-toast",
          });
        }

        // Simulate upload progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const currentProgress = prev[file.name] || 0;
            if (currentProgress >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return { ...prev, [file.name]: currentProgress + 10 };
          });
        }, 200);

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            clearInterval(progressInterval);
            setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
            
            if (uploadedFile) {
              setTimeout(() => {
                setFiles((prevFiles) =>
                  prevFiles.filter((f) => f.name !== file.name)
                );
                setUploadProgress(prev => {
                  const newProgress = { ...prev };
                  delete newProgress[file.name];
                  return newProgress;
                });
              }, 1000);

              toast({
                description: (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green" size={20} />
                    <div>
                      <p className="font-medium">Upload successful</p>
                      <p className="text-sm opacity-80">{file.name} has been uploaded</p>
                    </div>
                  </div>
                ),
              });
            }
          }
        );
      });
      
      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    multiple: true,
    accept: {
      'image/*': [],
      'video/*': [],
      'audio/*': [],
      'application/*': [],
      'text/*': []
    }
  });

  const handleRemoveFiles = (e, fileName) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  return (
    <>
      <motion.div
        {...getRootProps()}
        className="cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <Button 
          type="button" 
          className={cn(
            "uploader-button bg-gradient-to-r from-brand to-brand-100 hover:from-brand-100 hover:to-brand border-0 shadow-drop-2",
            isDragActive && "scale-105 shadow-drop-3",
            className
          )}
        >
          <motion.div
            animate={isDragActive ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Upload size={20} />
          </motion.div>
          <span className="font-medium">
            {isDragActive ? "Drop files here" : "Upload"}
          </span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="uploader-preview-list bg-white border border-light-300 shadow-drop-3"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-light-100 flex items-center gap-2">
                <Upload size={18} />
                Uploading Files
              </h4>
              <span className="text-sm text-light-200">{files.length} files</span>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {files.map((file, index) => {
                const { type, extension } = getFileType(file.name);
                const progress = uploadProgress[file.name] || 0;
                const isComplete = progress === 100;

                return (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="uploader-preview-item bg-light-400 border border-light-300 rounded-xl"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Thumbnail
                        type={type}
                        extension={extension}
                        url={convertFileToUrl(file)}
                        className="!size-10"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-light-100 truncate text-sm">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-light-300 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className={cn(
                                "h-full rounded-full transition-colors",
                                isComplete ? "bg-green" : "bg-brand"
                              )}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <span className="text-xs text-light-200 min-w-fit">
                            {progress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleRemoveFiles(e, file.name)}
                      className="p-1 rounded-full hover:bg-red/10 transition-colors"
                    >
                      {isComplete ? (
                        <CheckCircle size={16} className="text-green" />
                      ) : (
                        <X size={16} className="text-light-200 hover:text-red" />
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedFileUploader;