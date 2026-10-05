import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedArrowRight } from '../common/AnimatedIcons';

/**
 * YK MENS FASHION - Curated Collection Card
 * 
 * Features:
 * - Rounded-3xl container with rounded-2xl image stage
 * - Controlled desktop hover micro-motion
 * - Palette badge and useful description
 * - Responsive CTA button
 */
export const CollectionCard = ({ collection, isFeatured = false }) => {
  return (
    <Link
      to={`/collection/${collection.slug}`}
      className={`group relative flex flex-col bg-[#FFFFFF] rounded-3xl border border-[#E4D7CC] hover:border-[#4A3A32] overflow-hidden p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 ${
        isFeatured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Collection Image Container */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden bg-[#EADFD4]/40 mb-5 select-none ${
          isFeatured ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[4/3] sm:aspect-[16/10]'
        }`}
      >
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Subtle Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#33251F]/40 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

        {/* Season Pill Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-[#FAF7F2]/95 backdrop-blur-xs text-[10px] uppercase tracking-wider font-semibold text-[#4A3A32] rounded-lg shadow-xs">
            {collection.season}
          </span>
        </div>

        {/* Item Count Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1 bg-[#33251F]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase tracking-wider font-medium rounded-md">
            {collection.itemCount}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#33251F] group-hover:text-[#4A3A32] transition-colors leading-tight mb-2">
            {collection.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#6B5549] leading-relaxed max-w-2xl">
            {collection.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-[#E4D7CC] flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8B7768]">
            Curated Wardrobe
          </span>

          <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#4A3A32] group-hover:text-[#33251F] transition-colors">
            <span>Explore Collection</span>
            <AnimatedArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
