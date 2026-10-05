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
    // Primary High-Contrast Dark on Light (Mocha Brown with Warm Ivory text)
    dark: 'bg-[#4A3A32] text-[#FAF7F2] border border-[#4A3A32] hover:bg-[#33251F]',

    // Deep Espresso luxury statement
    crimson: 'bg-[#33251F] text-[#FAF7F2] border border-[#33251F] hover:bg-[#4A3A32]',

    // Coffee Brown
    navy: 'bg-[#6B5549] text-[#FAF7F2] border border-[#6B5549] hover:bg-[#33251F]',

    // Rich Mocha
    olive: 'bg-[#4A3A32] text-[#FAF7F2] border border-[#4A3A32] hover:bg-[#33251F]',

    // Hairline Outline with Mocha Brown text
    outlineDark: 'bg-transparent text-[#4A3A32] border border-[#4A3A32] hover:bg-[#4A3A32] hover:text-[#FAF7F2]',

    // Refined Pure White Luxury Surface Button with warm beige border
    lightLuxe: 'bg-[#FFFFFF] text-[#33251F] border border-[#D8C8BA] hover:bg-[#FAF7F2] shadow-sm',

    // Soft outline for light cards
    outlineSoft: 'bg-transparent text-[#4A3A32] border border-[#C5B3A4] hover:border-[#4A3A32] hover:bg-[#FAF7F2]',

    // Cream Latte Surface Button
    cream: 'bg-[#EADFD4] text-[#33251F] border border-[#D8C8BA] hover:bg-[#FAF7F2] hover:border-[#4A3A32] shadow-sm',

    // Warm Light Outline
    outlineLight: 'bg-transparent text-[#33251F] border border-[#D8C8BA] hover:border-[#4A3A32] hover:bg-[#FAF7F2]',
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
