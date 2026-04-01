import React, { useEffect } from 'react';
import { FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi';

export default function NotificationToast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const types = {
    success: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', icon: FiCheck },
    error: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', icon: FiAlertCircle },
    info: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', icon: FiInfo },
  };

  const config = types[type] || types.success;
  const Icon = config.icon;

  return (
    <div className={`fixed bottom-4 right-4 ${config.bg} border ${config.border} rounded-lg p-4 shadow-lg animate-slideInUp flex items-center gap-3 max-w-md z-40`}>
      <Icon className="text-2xl" />
      <p className={`${config.text} font-medium`}>{message}</p>
    </div>
  );
}
