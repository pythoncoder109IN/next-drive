import EnhancedCard from "@/components/EnhancedCard";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

const Page = async ({ searchParams, params }) => {
  const type = (await params)?.type || "";
  const searchText = (await searchParams)?.query || "";
  const sort = (await searchParams)?.sort || "";

  const types = getFileTypesParams(type);

  const files = await getFiles({ types, searchText, sort });
  const usage = await getTotalSpaceUsed();

  const totalSize = () => {
    if (type === 'images') {
      return usage.image.size;
    } else if (type === 'documents') {
      return usage.document.size;
    } else if (type === 'media') {
      return usage.video.size;
    } else if (type === 'audios') {
      return usage.audio.size;
    } else {
      return usage.other.size;
    }
  };

  return (
    <div className="page-container">
      <section className="w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-100 bg-clip-text text-transparent capitalize">
            {type}
          </h1>
          <p className="text-light-200 mt-2">Manage your {type} files</p>
        </div>
        
        <div className="total-size-section bg-white rounded-2xl p-6 shadow-drop-1 border border-light-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand/20 to-brand-100/20 rounded-xl flex items-center justify-center">
                <span className="text-brand font-bold text-lg">
                  {files.total}
                </span>
              </div>
              <div>
                <p className="font-semibold text-light-100">
                  Total: {isNaN(totalSize()) ? '0 MB' : convertFileSize(totalSize())}
                </p>
                <p className="text-sm text-light-200">{files.total} files</p>
              </div>
            </div>
            
            <div className="sort-container">
              <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
              <Sort />
            </div>
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file, index) => (
            <EnhancedCard key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-light-300 to-light-400 rounded-full flex items-center justify-center">
            <span className="text-4xl text-light-200">📁</span>
          </div>
          <h3 className="text-xl font-semibold text-light-100 mb-2">No {type} found</h3>
          <p className="text-light-200">Upload your first {type.slice(0, -1)} to get started</p>
        </div>
      )}
    </div>
  );
};

export default Page;