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
    primary: 'bg-[#0D0D0D] text-[#F2EFEA] hover:bg-[#272401]',
    secondary: 'bg-[#557373] text-[#F2EFEA] hover:bg-[#0D0D0D]',
    outline: 'border border-[#272401] text-[#272401] hover:bg-[#272401] hover:text-[#F2EFEA]',
    ice: 'bg-[#DFE5F3] text-[#0D0D0D] hover:bg-[#557373] hover:text-[#F2EFEA]',
    ghost: 'text-[#0D0D0D] hover:bg-[#DFE5F3]',
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
