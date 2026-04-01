import React from 'react';

export default function Button({
  children,
  onClick = null,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  loading = false,
}) {
  const baseStyle = 'rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-primary text-white hover:bg-green-600 disabled:bg-gray-400',
    secondary: 'bg-secondary text-white hover:bg-blue-600 disabled:bg-gray-400',
    outline: 'border-2 border-primary text-primary hover:bg-green-50 disabled:opacity-50',
    danger: 'bg-danger text-white hover:bg-red-600 disabled:bg-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <>
          <span className="animate-spin">⏳</span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
