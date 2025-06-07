import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { ModalProps } from '../../types/ModalProps';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 10); // Small delay to allow initial render with 'closed' classes
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${
        animateIn ? 'opacity-100 bg-white/60 dark:bg-black/60' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        ref={modalRef}
        className={`w-full transform rounded-t-lg bg-white dark:bg-black p-4 shadow-xl shadow-black dark:shadow-white transition-transform duration-300 ease-out flex flex-col ${
          animateIn ? 'translate-y-0' : 'translate-y-full'
        } ${className || ''}`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as HTMLElement);
};

export default Modal;
