import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/uploadService";
import { AiOutlineFile } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

function FileUpload({
  uploadProgress,
  setUploadProgress,
  uploadComplete,
  setUploadComplete,
  file,
  setFile,
}) {
  // State for managing the file, progress, and completion status

  // Function to handle file upload with progress tracking
  const handleFileUpload = async (selectedFile) => {
    try {
      // Create fake progress
      const fakeProgressInterval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(fakeProgressInterval);
            return prevProgress;
          }
          return prevProgress + 10;
        });
      }, 500);

      await uploadFile(selectedFile);

      clearInterval(fakeProgressInterval);
      setUploadComplete(true);
      setUploadProgress(100);
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed. Please try again.");
    }
  };

  // Handler for dropped files
  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile && selectedFile.type === "application/pdf") {
        console.log("File selected:", selectedFile);
        setFile(selectedFile);
        setUploadProgress(0);
        setUploadComplete(false);
        handleFileUpload(selectedFile);
      } else {
        alert("Please upload a valid PDF file.");
      }
    },
    [] // No dependencies needed as we directly set state
  );

  // Setting up `useDropzone` with configuration options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`w-full h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors p-10 m-10 ${
          isDragActive
            ? "border-purple-500 bg-purple-900/20"
            : "border-gray-500 bg-gray-800/30"
        }`}
      >
        <input {...getInputProps()} />

        {file && uploadComplete ? (
          <FaCheck className="text-gray-400 text-6xl mb-4" />
        ) : (
          <AiOutlineFile className="text-purple-400 text-6xl mb-4" />
        )}

        {file && uploadComplete ? (
          <p className="text-white font-semibold">Uploaded File: {file.name}</p>
        ) : (
          <>
            <p className="text-white">
              <span className="text-purple-400 font-semibold cursor-pointer">
                Click here
              </span>{" "}
              to upload your PDF or drag and drop.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Supported Format: PDF (10MB max)
            </p>
          </>
        )}

        {/* Display upload progress if file is being uploaded */}
        {file && !uploadComplete && (
          <p className="text-gray-300 text-sm mt-2">
            Uploading... {uploadProgress}%
          </p>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
