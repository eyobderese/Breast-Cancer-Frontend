import React, { useState } from "react";
import { searchQuery } from "../services/searchService";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SearchBar({ setResults, query, setQuery, kValue, setKValue }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    searchQuery(query, kValue)
      .then((response) => {
        console.log(response.data.result);
        setResults(response.data.result);
      })
      .catch((error) => {
        console.error("Search error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-8 rounded-lg w-full max-w-lg mx-auto mt-10 space-y-6">
      {/* Instructional Text */}
      <p className="text-white font-medium text-center">
        Enter your search query below and specify the number of top similar
        results.
      </p>

      {/* Search Input Field */}
      <div className="relative flex items-center w-full">
        <HiOutlineSearch className="absolute left-3 text-gray-200 text-2xl" />
        <input
          type="text"
          placeholder="Type your search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Top K Similar Input */}
      <div className="flex flex-col items-start w-full">
        <label htmlFor="topK" className="text-gray-200 font-semibold mb-2">
          Number of Results (K)
        </label>
        <input
          id="topK"
          type="number"
          min="1"
          value={kValue}
          onChange={(e) => setKValue(e.target.value)}
          placeholder="Enter K value"
          className="w-24 py-2 text-center text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-lg" />
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
}

export default SearchBar;
