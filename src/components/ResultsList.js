import React from 'react';
import ExpandableCard from './ExpandableCard';

function ResultsList({ results }) {
  return (
    <div>
      {results.map((item, index) => (
        <ExpandableCard key={index} content={item} />
      ))}
    </div>
  );
}

export default ResultsList;
