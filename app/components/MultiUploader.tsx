"use client";
import { useCallback, useState } from "react";
import { useUploadThing } from '@/app/utils/uploadthing'
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

export function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex items-center justify-center h-48 border-2 border-gray-300 border-dashed rounded-md flex-col">
        Drop files here!
        {files.length > 0 && (
          <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => startUpload(files)}
          >
            Upload {files.length} files
          </button>
        )}
      </div>
    </div>
  );
}