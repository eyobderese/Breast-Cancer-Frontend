import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/uploadService";
import { AiOutlineFile } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

function FileUpload({ file, setFile, setUploadProgress, setUploadComplete }) {
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
        alert("Please upload a PDF file.");
      }
    },
    [setFile, setUploadProgress, setUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxFiles: 1,
  });

  const handleFileUpload = (selectedFile) => {
    if (!selectedFile) return;

    uploadFile(selectedFile, (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUploadProgress(percentCompleted);
    })
      .then(() => {
        setUploadComplete(true);
      })
      .catch((error) => {
        console.error("Upload error:", error);
      });
  };

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
        {file && setUploadComplete ? (
          <FaCheck className="text-gray-400 text-6xl mb-4" />
        ) : (
          <AiOutlineFile className="text-purple-400 text-6xl mb-4" />
        )}
        {file && setUploadComplete ? (
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
      </div>
    </div>
  );
}

export default FileUpload;
