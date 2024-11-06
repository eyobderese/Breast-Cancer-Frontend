import "tailwindcss/tailwind.css";
import { webScrap } from "../services/webScrapService";

const WebScrape = ({
  uploadProgress,
  uploadComplete,
  setUploadProgress,
  setUploadComplete,
  file,
  setFile,
}) => {
  const handleUrlUpload = async () => {
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

      await webScrap(file);

      clearInterval(fakeProgressInterval);
      setUploadComplete(true);
      setUploadProgress(100);
    } catch (error) {
      console.error("Upload error:", error);
      alert("URL upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-gray-800 rounded-lg shadow-lg w-1/2 mx-auto">
      <input
        type="text"
        value={file}
        onChange={(e) => setFile(e.target.value)}
        placeholder="Enter URL"
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
      />

      <button
        onClick={handleUrlUpload}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Upload URL
      </button>

      <div className="text-center mt-4 text-gray-300">
        {uploadComplete ? (
          <p className="text-green-500 font-semibold">Upload Complete!</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default WebScrape;
