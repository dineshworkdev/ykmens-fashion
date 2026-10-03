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
          className="block text-xs uppercase tracking-wider font-semibold text-[#FAF7F2] mb-2"
        >
          {label} {required && <span className="text-[#A6445D]">*</span>}
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
        className={`w-full px-4 py-3 bg-[#1D1410] border rounded-xl text-[#FAF7F2] placeholder-[#C8B8AA]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D99E84]/30 focus:border-[#D99E84] transition-all ${
          error ? 'border-[#A6445D] ring-1 ring-[#A6445D]/40' : 'border-[#3E2B21]'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-[#A6445D] font-medium flex items-center gap-1">
          <span>•</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;
