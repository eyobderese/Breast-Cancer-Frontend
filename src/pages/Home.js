import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ProgressBar from "../components/ProgressBar";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import ResultDisplay from "../components/ResultDisplay";

function Home() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const [kValue, setKValue] = useState(1);

  function reset() {
    setUploadProgress(0);
    setUploadComplete(false);
    setFile(null);
    setResults([]);
    setKValue(1);
    setQuery("");
  }

  return (
    <div className="flex flex-col items-center p-8 space-y-8 min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-green-800">
      {/* Title Section */}
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold text-white">
          Cancer Detection System
        </h1>
        <p className="text-2xl font-semibold text-white">
          "Detecting Cancer, Saving Lives"
        </p>
        <p className="text-md text-gray-300 max-w-lg">
          Upload images to classify them as cancerous or non-cancerous.
          Our AI-powered system provides fast and reliable results to assist in
          early detection and treatment.
        </p>
      </div>
      {/* File Upload Section */}
      <FileUpload
        uploadProgress={uploadProgress}
        setUploadProgress={setUploadProgress}
        uploadComplete={uploadComplete}
        setUploadComplete={setUploadComplete}
        file={file}
        setFile={setFile}
        setResults={setResults}
      />
      {/* Progress Bar */}
      {file && (
        <ProgressBar progress={uploadProgress} complete={uploadComplete} />
      )}
      {/* Results Display */}
      {results && <ResultDisplay result={results} />}
    </div>
  );
}

export default Home;
