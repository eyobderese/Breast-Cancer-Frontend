import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progress, complete }) => {
  return (
    <div className="flex flex-col items-center my-8 w-full">
      <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 bg-gray-300 rounded-full shadow-lg overflow-hidden">
        <div
          className={`h-6 flex items-center justify-end rounded-full transition-all duration-200 ease-in ${
            complete ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${progress}%` }}
        >
          <span className="text-xs text-white font-bold mr-2">
            {`${progress}%`}
          </span>
        </div>
      </div>
      {complete && (
        <div className="text-green-500 font-bold mt-3 text-center">
          Upload Complete
        </div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  complete: PropTypes.bool.isRequired,
};

export default ProgressBar;
