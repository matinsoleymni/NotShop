import React from 'react';
import NotLogo from "../assets/icons/logo.svg?react";
import type { PlaceholderProps } from '../types/PlaceholderProps';

export const NotLogoPlaceholder: React.FC<PlaceholderProps> = ({ width, height }) => {
  return (
    <div className="flex items-center justify-center bg-gray-300 dark:bg-gray-800 animate-pulse rounded-md" style={{ width, height }}>
      <NotLogo className="w-32 h-32 opacity-40" />
    </div>
  );
};

export const Placeholder: React.FC<PlaceholderProps> = ({ width, height }) => {
  return (
    <div className="flex items-center justify-center bg-gray-300 dark:bg-gray-800 animate-pulse rounded-md" style={{ width, height }}></div>
  );
};
