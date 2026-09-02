import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠️';
      case 'error':
        return '✕';
      default:
        return 'ℹ️';
    }
  };

  return (
    <aside className={`toast-notification toast-${type}`} role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">{getIcon()}</span>
      <span className="toast-message">{message}</span>
      <button 
        type="button" 
        className="toast-close-btn" 
        onClick={onClose}
        aria-label="Close notification"
      >
        &times;
      </button>
    </aside>
  );
}
