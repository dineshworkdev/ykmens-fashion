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
    ice: 'bg-[#DFE5F3] text-[#0D0D0D]',
    olive: 'bg-[#272401] text-[#F2EFEA]',
    slate: 'bg-[#557373] text-[#F2EFEA]',
    dark: 'bg-[#0D0D0D] text-[#F2EFEA]',
    sand: 'bg-[#F2EFEA] text-[#0D0D0D] border border-[#557373]',
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
