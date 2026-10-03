import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import CollectionCard from '../components/collection/CollectionCard';
import { COLLECTIONS } from '../data/collections';

/**
 * YK MENS FASHION - Collections Page
 * 
 * Strict Compliance:
 * - Curated fashion discovery experience
 * - Creative yet structured grid with featured collection
 * - Light surface foundation (#F2EFEA)
 * - Mobile-first vertical hierarchy
 */
export const CollectionsPage = () => {
  return (
    <div className="bg-[#241812] text-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <Container>
        {/* Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99E84] font-bold block">
              Curated Series
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              Menswear Collections
            </h1>
            <p className="text-xs sm:text-sm text-[#C8B8AA] leading-relaxed">
              Explore our thematic design chapters. From architectural wool overcoats and precision tailoring to tactile knitwear and daily essentials.
            </p>
          </motion.div>
        </div>

        {/* Structured Creative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COLLECTIONS.map((col, index) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={index === 0 ? 'lg:col-span-2' : ''}
            >
              <CollectionCard
                collection={col}
                isFeatured={index === 0}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CollectionsPage;
