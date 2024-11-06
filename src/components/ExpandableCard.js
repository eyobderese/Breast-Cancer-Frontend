import React, { useState } from "react";

function ExpandableCard({ title, content }) {
  const [expanded, setExpanded] = useState(false);
  const snippet =
    content.length > 60 ? `${content.substring(0, 60)}...` : content;

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div
      onClick={toggleExpanded}
      className="border border-gray-300 rounded-md p-4 m-2 cursor-pointer transition-transform transform hover:scale-105 shadow-md "
      style={{ width: "500px" }} // Adjust the width as needed
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{expanded ? content : snippet}</p>
      <span className="text-blue-500 text-sm">
        {expanded ? "Show Less" : "Show More"}
      </span>
    </div>
  );
}

export default ExpandableCard;
