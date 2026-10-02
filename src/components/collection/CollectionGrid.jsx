import React from 'react';
import CollectionCard from './CollectionCard';

/**
 * Responsive Collection Grid Container
 */
export const CollectionGrid = ({ collections = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {collections.map((col) => (
        <CollectionCard key={col.id} collection={col} />
      ))}
    </div>
  );
};

export default CollectionGrid;
