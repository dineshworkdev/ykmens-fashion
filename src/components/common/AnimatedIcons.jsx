import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
} from '../../assets/icons';

// High-precision luxury mechanical easing
const luxurySnappy = { type: 'spring', stiffness: 500, damping: 28 };

/**
 * SEARCH ICON
 * Lens focuses and scales while handle directionally pivots
 */
export const AnimatedSearchIcon = ({ className = 'w-5 h-5', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center cursor-pointer select-none"
      whileHover="hover"
      whileTap={{ scale: 0.9 }}
      initial="rest"
      {...props}
    >
      <motion.div
        variants={{
          rest: { rotate: 0, x: 0, y: 0, scale: 1 },
          hover: { rotate: 22, x: 2, y: -1, scale: 1.12, transition: luxurySnappy },
        }}
      >
        <Search className={className} />
      </motion.div>
    </motion.span>
  );
};

/**
 * HEART / WISHLIST ICON
 * Line-draw sensation with double-beat micro-pulse and luxury fill
 */
export const AnimatedHeartIcon = ({ isFavorited = false, className = 'w-5 h-5', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center cursor-pointer select-none"
      whileHover="hover"
      whileTap={{ scale: 0.82 }}
      initial="rest"
      {...props}
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: {
            scale: [1, 1.28, 1.15],
            transition: { duration: 0.35, ease: 'easeOut' },
          },
        }}
      >
        <Heart
          className={`${className} transition-colors duration-200 ${
            isFavorited
              ? 'fill-current'
              : 'text-current hover:opacity-80'
          }`}
        />
      </motion.div>
    </motion.span>
  );
};

/**
 * SHOPPING BAG ICON
 * Subtle vertical handle lift and soft architectural suspension
 */
export const AnimatedBagIcon = ({ className = 'w-5 h-5', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center cursor-pointer select-none"
      whileHover="hover"
      whileTap={{ scale: 0.88 }}
      initial="rest"
      {...props}
    >
      <motion.div
        variants={{
          rest: { y: 0, rotate: 0 },
          hover: { y: -3.5, rotate: -4, transition: luxurySnappy },
        }}
      >
        <ShoppingBag className={className} />
      </motion.div>
    </motion.span>
  );
};

/**
 * DIRECTIONAL ARROW (RIGHT)
 * Trailing horizontal travel with spring return
 */
export const AnimatedArrowRight = ({ className = 'w-4 h-4', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center overflow-visible"
      whileHover={{ x: 7, transition: luxurySnappy }}
      whileTap={{ x: 3 }}
      initial={{ x: 0 }}
      whileInView={{ x: [0, 4, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.2 }}
      {...props}
    >
      <ArrowRight className={className} />
    </motion.span>
  );
};

/**
 * DIRECTIONAL ARROW (LEFT)
 * Trailing reverse horizontal travel
 */
export const AnimatedArrowLeft = ({ className = 'w-4 h-4', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center overflow-visible"
      whileHover={{ x: -7, transition: luxurySnappy }}
      whileTap={{ x: -3 }}
      initial={{ x: 0 }}
      whileInView={{ x: [0, -4, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.2 }}
      {...props}
    >
      <ArrowLeft className={className} />
    </motion.span>
  );
};

/**
 * CHEVRON (RIGHT)
 */
export const AnimatedChevronRight = ({ className = 'w-4 h-4', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center"
      whileHover={{ x: 4, scale: 1.1, transition: luxurySnappy }}
      {...props}
    >
      <ChevronRight className={className} />
    </motion.span>
  );
};

/**
 * MENU ICON
 * Subtle line choreography
 */
export const AnimatedMenuIcon = ({ className = 'w-6 h-6', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.08, rotate: 6, transition: luxurySnappy }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      <Menu className={className} />
    </motion.span>
  );
};

/**
 * CLOSE ICON
 * Controlled 90-degree line transformation
 */
export const AnimatedCloseIcon = ({ className = 'w-6 h-6', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center cursor-pointer"
      whileHover={{ rotate: 90, scale: 1.12, transition: { duration: 0.25, ease: 'easeInOut' } }}
      whileTap={{ scale: 0.85 }}
      {...props}
    >
      <X className={className} />
    </motion.span>
  );
};

/**
 * FILTER ICON
 * Notch shift interaction
 */
export const AnimatedFilterIcon = ({ className = 'w-4 h-4', ...props }) => {
  return (
    <motion.span
      className="inline-flex items-center justify-center"
      whileHover={{ rotate: -20, scale: 1.15, transition: luxurySnappy }}
      whileTap={{ scale: 0.92 }}
      {...props}
    >
      <SlidersHorizontal className={className} />
    </motion.span>
  );
};
