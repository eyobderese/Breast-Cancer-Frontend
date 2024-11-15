import React from "react";

function ResultDisplay({ result }) {
  if (!result) {
    return null; // If no result is provided, don't render the component
  }

  const { prediction, confidence } = result;

  // Determine the background color based on prediction
  const bgColor = prediction === "cancerous" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`w-full max-w-md p-6 rounded-lg shadow-lg text-white text-center ${bgColor}`}
    >
      <h2 className="text-2xl font-bold mb-2">Classification Result</h2>
      <p className="text-xl">
        <span className="font-semibold">Prediction:</span> {prediction}
      </p>
      <p className="text-lg mt-2">
        <span className="font-semibold">Confidence:</span>{" "}
        {(confidence * 100).toFixed(2)}%
      </p>
    </div>
  );
}

export default ResultDisplay;
