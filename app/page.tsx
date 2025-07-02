'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCcw, Users } from 'lucide-react';
import GameBoard from '@/components/GameBoard';
import { checkWinner, isBoardFull } from '@/lib/gameLogic';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];

interface GameStats {
  playerX: number;
  playerO: number;
  draws: number;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [isGameActive, setIsGameActive] = useState(true);
  const [stats, setStats] = useState<GameStats>({ playerX: 0, playerO: 0, draws: 0 });

  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setIsGameActive(false);
      setStats(prev => ({
        ...prev,
        [gameWinner === 'X' ? 'playerX' : 'playerO']: prev[gameWinner === 'X' ? 'playerX' : 'playerO'] + 1
      }));
    } else if (isBoardFull(board)) {
      setWinner('draw');
      setIsGameActive(false);
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  }, [board]);

  const handleCellClick = (index: number) => {
    if (board[index] || !isGameActive) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsGameActive(true);
  };

  const resetStats = () => {
    setStats({ playerX: 0, playerO: 0, draws: 0 });
    resetGame();
  };

  const getGameStatus = () => {
    if (winner === 'draw') return 'It\'s a draw!';
    if (winner) return `Player ${winner} wins! 🎉`;
    return `Player ${currentPlayer}'s turn`;
  };

  const getStatusColor = () => {
    if (winner === 'draw') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (winner) return 'bg-green-100 text-green-800 border-green-200';
    return currentPlayer === 'X' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-purple-100 text-purple-800 border-purple-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tic-Tac-Toe
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Challenge a friend in this classic strategy game. First to get three in a row wins!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Status */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5" />
                  Game Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg border text-center font-semibold text-lg transition-all duration-300 ${getStatusColor()}`}>
                  {getGameStatus()}
                </div>
                
                {(winner || !isGameActive) && (
                  <Button 
                    onClick={resetGame}
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Score Board */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="w-5 h-5" />
                  Score Board
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Player X</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-bold">
                    {stats.playerX}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Player O</span>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-bold">
                    {stats.playerO}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Draws</span>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 font-bold">
                    {stats.draws}
                  </Badge>
                </div>
                <Button 
                  onClick={resetStats}
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 hover:bg-gray-50"
                >
                  Reset Stats
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <GameBoard 
                  board={board}
                  onCellClick={handleCellClick}
                  isGameActive={isGameActive}
                  winner={winner}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Game Rules */}
        <Card className="mt-8 shadow-lg border-0 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl">How to Play</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-1">Take Turns</h3>
                <p className="text-sm text-gray-600">Players alternate between X and O</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-1">Get Three in a Row</h3>
                <p className="text-sm text-gray-600">Horizontally, vertically, or diagonally</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-1">Win the Game</h3>
                <p className="text-sm text-gray-600">First to get three in a row wins!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}