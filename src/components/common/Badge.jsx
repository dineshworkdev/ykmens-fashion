import React from 'react';

/**
 * Foundation Badge Component
 * Strictly styled with the 5 approved brand colors
 */
export const Badge = ({
  children,
  variant = 'ice',
  className = '',
  ...props
}) => {
  const variantStyles = {
    ice: 'bg-[#EADFD4] text-[#33251F]',
    olive: 'bg-[#4A3A32] text-[#FAF7F2]',
    slate: 'bg-[#6B5549] text-[#FAF7F2]',
    dark: 'bg-[#33251F] text-[#FAF7F2]',
    sand: 'bg-[#FFFFFF] text-[#33251F] border border-[#D8C8BA]',
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase ${variantStyles[variant] || variantStyles.ice} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
