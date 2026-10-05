import React from 'react';

/**
 * Premium Input Component
 * Styled with approved brand palette, rounded-xl borders, and accessible focus states.
 */
export const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  autoComplete,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs uppercase tracking-wider font-semibold text-[#33251F] mb-2"
        >
          {label} {required && <span className="text-[#6B5549]">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`w-full px-4 py-3 bg-[#FFFFFF] border rounded-xl text-[#33251F] placeholder-[#8B7768]/70 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3A32]/20 focus:border-[#4A3A32] transition-all ${
          error ? 'border-[#6B5549] ring-1 ring-[#6B5549]/30' : 'border-[#D8C8BA]'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-[#6B5549] font-medium flex items-center gap-1">
          <span>•</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;
