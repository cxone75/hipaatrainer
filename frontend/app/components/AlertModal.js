'use client';

import { useState, useEffect } from 'react';

export default function AlertModal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info', 
  confirmText = 'OK', 
  cancelText = 'Cancel', 
  onConfirm,
  showCancel = false 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          iconColor: 'text-green-600',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'error':
        return {
          iconColor: 'text-red-600',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      case 'warning':
        return {
          iconColor: 'text-yellow-600',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )
        };
      default:
        return {
          iconColor: 'text-blue-600',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };

  const typeStyles = getTypeStyles();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-150 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`flex-shrink-0 ${typeStyles.iconColor}`}>
              {typeStyles.icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            {showCancel && (
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}