import React from 'react';

export default function Card({ children, className = '', darkMode = false, onClick = null }) {
  return (
    <div
      onClick={onClick}
      className={`${
        darkMode ? 'bg-dark-card border-gray-700' : 'bg-white'
      } border rounded-xl shadow-lg p-6 transition-all hover:shadow-xl ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
