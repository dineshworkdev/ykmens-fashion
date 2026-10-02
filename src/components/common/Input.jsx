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
          className="block text-xs uppercase tracking-wider font-semibold text-[#0D0D0D] mb-2"
        >
          {label} {required && <span className="text-[#8B0000]">*</span>}
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
        className={`w-full px-4 py-3 bg-[#F2EFEA] border rounded-xl text-[#0D0D0D] placeholder-[#557373]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#142F40]/30 focus:border-[#142F40] transition-all ${
          error ? 'border-[#8B0000] ring-1 ring-[#8B0000]/40' : 'border-[#DFE5F3]'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-[#8B0000] font-medium flex items-center gap-1">
          <span>•</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;
