'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

type Player = 'X' | 'O';

interface GameCellProps {
  value: Player | null;
  onClick: () => void;
  isClickable: boolean;
  // index: number;
}

export default function GameCell({ value, onClick, isClickable }: GameCellProps) {
  const getCellContent = () => {
    if (!value) return '';
    return value;
  };

  const getCellStyles = () => {
    const baseStyles = "w-24 h-24 text-4xl font-bold transition-all duration-200 border-2 rounded-lg shadow-lg";
    
    if (!value && isClickable) {
      return `${baseStyles} border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transform hover:scale-105 cursor-pointer`;
    }
    
    if (value === 'X') {
      return `${baseStyles} border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-blue-100`;
    }
    
    if (value === 'O') {
      return `${baseStyles} border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 shadow-purple-100`;
    }
    
    return `${baseStyles} border-gray-200 bg-gray-50 cursor-not-allowed`;
  };

  return (
    <Button
      onClick={onClick}
      disabled={!isClickable}
      className={getCellStyles()}
      variant="outline"
    >
      <span className="transition-all duration-200 transform hover:scale-110">
        {getCellContent()}
      </span>
    </Button>
  );
}