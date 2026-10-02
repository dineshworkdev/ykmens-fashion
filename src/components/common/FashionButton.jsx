import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedArrowRight } from './AnimatedIcons';

/**
 * YK MENS FASHION - Distinctive Editorial Fashion Button
 * 
 * Features:
 * - Refined rounded corners (part of YK brand language)
 * - Controlled directional text & arrow movement
 * - Subtle sliding background transition
 * - Precision borders from Master Color Library
 * - React Router Link support
 */
export const FashionButton = ({
  children,
  to,
  onClick,
  variant = 'dark',
  size = 'md',
  showArrow = true,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const sizeStyles = {
    sm: 'py-2.5 px-5 text-[11px] tracking-wider font-semibold rounded-lg',
    md: 'py-3.5 px-7 text-xs sm:text-sm tracking-wider font-semibold rounded-xl',
    lg: 'py-4 px-9 text-sm sm:text-base tracking-wider font-semibold rounded-xl',
  };

  const variantStyles = {
    // Primary High-Contrast Dark on Light
    dark: 'bg-[#0D0D0D] text-[#F2EFEA] border border-[#0D0D0D] hover:bg-[#200E01]',

    // Crimson / Burgundy luxury statement
    crimson: 'bg-[#8B0000] text-[#EDE7C7] border border-[#5B0202] hover:bg-[#5B0202]',

    // Deep Midnight Navy
    navy: 'bg-[#142F40] text-[#E7DECD] border border-[#142F40] hover:bg-[#200E01]',

    // Olive Deep Accent
    olive: 'bg-[#393A10] text-[#EDE7C7] border border-[#272401] hover:bg-[#272401]',

    // Hairline Outline with Dark Obsidian text
    outlineDark: 'bg-transparent text-[#0D0D0D] border border-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F2EFEA]',

    // Refined Light Luxury Surface Button
    lightLuxe: 'bg-[#EDE7C7] text-[#200E01] border border-[#E7DECD] hover:bg-[#E7DECD] shadow-sm',

    // Soft outline for light cards
    outlineSoft: 'bg-transparent text-[#200E01] border border-[#200E01]/25 hover:border-[#200E01] hover:bg-[#EDE7C7]/50',
  };

  const content = (
    <motion.div
      whileHover="hover"
      initial="rest"
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center font-medium overflow-hidden transition-all duration-300 select-none shadow-sm ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.dark} ${className} ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {/* Subtle Sliding Hover Shimmer Underlay */}
      <motion.span
        variants={{
          rest: { x: '-102%' },
          hover: { x: '0%', transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] } },
        }}
        className="absolute inset-0 bg-white/10 pointer-events-none rounded-xl"
      />

      {/* Button Text with subtle forward drift */}
      <motion.span
        variants={{
          rest: { x: 0 },
          hover: { x: -2, transition: { type: 'spring', stiffness: 450, damping: 25 } },
        }}
        className="relative z-10 inline-flex items-center space-x-2.5"
      >
        <span>{children}</span>
        {showArrow && (
          <motion.span
            variants={{
              rest: { x: 0 },
              hover: { x: 5, transition: { type: 'spring', stiffness: 500, damping: 22 } },
            }}
            className="inline-flex items-center"
          >
            <AnimatedArrowRight className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </motion.span>
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {content}
    </button>
  );
};

export default FashionButton;
