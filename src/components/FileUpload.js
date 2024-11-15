import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/uploadService";
import { AiOutlineFileImage } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

function FileUpload({
  uploadProgress,
  setUploadProgress,
  uploadComplete,
  setUploadComplete,
  file,
  setFile,
  setResults,
}) {
  // Function to handle file upload with progress tracking
  const handleFileUpload = async (selectedFile) => {
    try {
      // Simulate upload progress
      const fakeProgressInterval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(fakeProgressInterval);
            return prevProgress;
          }
          return prevProgress + 10;
        });
      }, 500);

      const response = await uploadFile(selectedFile);
      console.log("Upload response:", response.data);
      setResults(response.data);

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
      if (selectedFile && selectedFile.type === "image/png") {
        console.log("File selected:", selectedFile);
        setFile(selectedFile);
        setUploadProgress(0);
        setUploadComplete(false);
        handleFileUpload(selectedFile);
      } else {
        alert("Please upload a valid PNG image.");
      }
    },
    [] // No dependencies needed as we directly set state
  );

  // Setting up `useDropzone` with configuration options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"] },
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`w-full h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors p-10 m-10 ${
          isDragActive
            ? "border-green-500 bg-green-900/20"
            : "border-gray-500 bg-gray-800/30"
        }`}
      >
        <input {...getInputProps()} />

        {file && uploadComplete ? (
          <FaCheck className="text-gray-400 text-6xl mb-4" />
        ) : (
          <AiOutlineFileImage className="text-green-400 text-6xl mb-4" />
        )}

        {file && uploadComplete ? (
          <p className="text-white font-semibold">Uploaded File: {file.name}</p>
        ) : (
          <>
            <p className="text-white">
              <span className="text-green-400 font-semibold cursor-pointer">
                Click here
              </span>{" "}
              to upload your PNG image or drag and drop.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Supported Format: PNG (10MB max)
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
