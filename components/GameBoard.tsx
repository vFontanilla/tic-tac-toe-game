'use client';

import React from 'react';
import GameCell from './GameCell';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];

interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  isGameActive: boolean;
  winner: Player | 'draw' | null;
}

export default function GameBoard({ board, onCellClick, isGameActive, winner }: GameBoardProps) {
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell}
            onClick={() => onCellClick(index)}
            isClickable={isGameActive && !cell}
          />
        ))}
      </div>
      
      {winner && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="text-center p-6 animate-pulse">
            <div className="text-6xl mb-4">
              {winner === 'draw' ? '🤝' : '🎉'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {winner === 'draw' ? 'It\'s a Draw!' : `Player ${winner} Wins!`}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}