import React from 'react';

/**
 * Foundation Button Component
 * Strictly styled with the 5 approved brand colors:
 * #DFE5F3, #557373, #272401, #F2EFEA, #0D0D0D
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs tracking-wider uppercase',
    md: 'px-5 py-2.5 text-sm tracking-wider uppercase',
    lg: 'px-7 py-3 text-base tracking-wider uppercase',
  };

  const variantStyles = {
    primary: 'bg-[#4A3A32] text-[#FAF7F2] hover:bg-[#33251F]',
    secondary: 'bg-[#6B5549] text-[#FAF7F2] hover:bg-[#4A3A32]',
    outline: 'border border-[#4A3A32] text-[#4A3A32] hover:bg-[#4A3A32] hover:text-[#FAF7F2]',
    ice: 'bg-[#FFFFFF] text-[#33251F] border border-[#D8C8BA] hover:bg-[#FAF7F2]',
    ghost: 'text-[#4A3A32] hover:bg-[#EADFD4]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
