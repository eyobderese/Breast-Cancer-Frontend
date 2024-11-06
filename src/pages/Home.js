import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ProgressBar from "../components/ProgressBar";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import WebScrape from "../components/WebScrape";

function Home() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [uploadType, setUploadType] = useState("file"); // New state for upload type
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
    <div className="flex flex-col items-center p-8 space-y-8 min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-orange-800">
      {/* Title Section */}
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold text-white">
          Content Search Engine
        </h1>
        <p className="text-2xl font-semibold text-white">
          "Empowering Your Search Experience"
        </p>
        <p className="text-md text-gray-300 max-w-lg">
          Upload your documents and search for the most relevant content. Our
          intelligent engine finds the answers you need, quickly and
          efficiently.
        </p>
      </div>
      {/* Toggle Buttons */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 font-semibold text-white rounded ${
            uploadType === "file" ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => {
            reset();
            setUploadType("file");
          }}
        >
          File Upload
        </button>
        <button
          className={`px-4 py-2 font-semibold text-white rounded ${
            uploadType === "web" ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => {
            reset();
            setUploadType("web");
          }}
        >
          Web Scrape
        </button>
      </div>
      {/* Conditional Rendering of Upload Components */}
      {uploadType === "file" ? (
        <FileUpload
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
          uploadComplete={uploadComplete}
          setUploadComplete={setUploadComplete}
          file={file}
          setFile={setFile}
        />
      ) : (
        <WebScrape
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
          uploadComplete={uploadComplete}
          setUploadComplete={setUploadComplete}
          file={file}
          setFile={setFile}
        />
      )}
      {/* Progress Bar */}
      {file && (
        <ProgressBar progress={uploadProgress} complete={uploadComplete} />
      )}
      {/* Search Bar Component */}
      <SearchBar
        setResults={setResults}
        query={query}
        setQuery={setQuery}
        kValue={kValue}
        setKValue={setKValue}
      />
      {/* Results List Component */}
      <ResultsList results={results} />
    </div>
  );
}

export default Home;
