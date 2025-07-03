import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import React from "react";

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
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total:{" "}
            <span className="h5">{isNaN(totalSize) ? `${convertFileSize(totalSize())} ` : '0 MB'}</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded.</p>
      )}
    </div>
  );
};

export default Page;
