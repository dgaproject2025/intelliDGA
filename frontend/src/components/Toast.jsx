import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 3000); // auto close after 3s
    return () => clearTimeout(t);
  }, [onClose]);

  if (!message) return null;

  return createPortal(
    <div className="fixed bottom-4 left-4 z-[9999]">
      <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
        {message}
      </div>
    </div>,
    document.body
  );
}
