import React from "react";
import ExpandableCard from "./ExpandableCard";

function ResultsList({ results }) {
  return (
    <div>
      {results.map((item, index) => (
        <ExpandableCard key={index} title={item[0]} content={item[1]} />
      ))}
    </div>
  );
}

export default ResultsList;
