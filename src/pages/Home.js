import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ProgressBar from "../components/ProgressBar";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";

function Home() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [results, setResults] = useState([
    "Search results will appear here. Use the search bar to find relevant content. Upload a PDF document to get started. ",
    "Search results will appear here. Use the search bar to find relevant content. Upload a PDF document to get started. ",
    "Search results will appear here. Use the search bar to find relevant content. Upload a PDF document to get started. ",
  ]);

  return (
    <div className="flex flex-col items-center p-8 space-y-8 min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-orange-800">
      {/* Title Section */}
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold text-white">
          PDF Search Engine
        </h1>
        <p className="text-2xl font-semibold text-white">
          "Empowering Your Search Experience"
        </p>
        <p className="text-md text-gray-300 max-w-lg">
          Upload your PDF document and search for the most relevant content. Our
          intelligent engine finds the answers you need, quickly and
          efficiently.
        </p>
      </div>

      {/* File Upload Component */}
      <FileUpload
        file={file}
        setFile={setFile}
        setUploadProgress={setUploadProgress}
        setUploadComplete={setUploadComplete}
      />

      {/* Progress Bar */}
      {file && (
        <ProgressBar progress={uploadProgress} complete={uploadComplete} />
      )}

      {/* Search Bar Component */}
      <SearchBar setResults={setResults} />

      {/* Results List Component */}
      <ResultsList results={results} />
    </div>
  );
}

export default Home;
