import React from 'react';
import NotLogo from "../assets/icons/logo.svg?react";
import type { NotLogoPlaceholderProps } from '../types/NotLogoPlaceholderProps';

const NotLogoPlaceholder: React.FC<NotLogoPlaceholderProps> = ({ width, height }) => {
  return (
    <div className="flex items-center justify-center bg-gray-300 dark:bg-gray-800 animate-pulse rounded-md" style={{ width, height }}>
      <NotLogo className="w-32 h-32 opacity-40" />
    </div>
  );
};

export default NotLogoPlaceholder;
