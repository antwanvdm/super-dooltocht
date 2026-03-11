import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  getRandomPuzzle, createGame, getLegalMoves, makeMove,
  isCheckmate, getBoard, getTurn, getHint, isCorrectMove,
  getOpponentResponse, getPlayerMoveCount,
} from '../../utils/chessGenerator';
import PuzzleRulesCard from './PuzzleRulesCard';

// Unicode chess pieces
const PIECE_SYMBOLS = {
  wp: '♙', wn: '♘', wb: '♗', wr: '♖', wq: '♕', wk: '♔',
  bp: '♟', bn: '♞', bb: '♝', br: '♜', bq: '♛', bk: '♚',
};

function ChessGame({ mathSettings, onSuccess, theme }) {
  const pl = mathSettings?.puzzleLevel;
  const level = (typeof pl === 'object' ? pl?.chess : pl) || 'easy';

  const puzzle = useMemo(() => getRandomPuzzle(level), [level]);
  const totalPlayerMoves = useMemo(() => getPlayerMoveCount(puzzle), [puzzle]);

  const [game] = useState(() => createGame(puzzle));
  const [board, setBoard] = useState(() => getBoard(game));
  const [playerTurn, setPlayerTurn] = useState(() => getTurn(game));
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);
  const [hintSquare, setHintSquare] = useState(null);
  const [wrongMove, setWrongMove] = useState(null);
  const [solved, setSolved] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [lastMove, setLastMove] = useState(null);

  // Clear hint after 3 seconds
  useEffect(() => {
    if (!hintSquare) return;
    const t = setTimeout(() => setHintSquare(null), 3000);
    return () => clearTimeout(t);
  }, [hintSquare]);

  // Clear wrong-move flash
  useEffect(() => {
    if (!wrongMove) return;
    const t = setTimeout(() => setWrongMove(null), 800);
    return () => clearTimeout(t);
  }, [wrongMove]);

  const handleSquareClick = useCallback((row, col) => {
    if (solved) return;

    const files = 'abcdefgh';
    const square = files[col] + (8 - row);
    const piece = board[row][col];

    // If we already selected a piece and click a legal-move square → try move
    if (selectedSquare && legalMoves.some(m => m.to === square)) {
      if (isCorrectMove(puzzle, moveIndex, selectedSquare, square)) {
        // Correct move
        makeMove(game, selectedSquare, square);
        setLastMove({ from: selectedSquare, to: square });
        setBoard(getBoard(game));
        setSelectedSquare(null);
        setLegalMoves([]);
        setHintSquare(null);

        if (isCheckmate(game)) {
          setSolved(true);
          onSuccess();
          return;
        }

        // Play opponent response
        const response = getOpponentResponse(puzzle, moveIndex);
        if (response) {
          const nextIndex = moveIndex + 1;
          setTimeout(() => {
            makeMove(game, response.from, response.to);
            setLastMove({ from: response.from, to: response.to });
            setBoard(getBoard(game));
            setPlayerTurn(getTurn(game));
            setMoveIndex(nextIndex);
          }, 500);
        } else {
          setMoveIndex(moveIndex + 1);
        }
      } else {
        // Wrong move
        setWrongMove(square);
        setSelectedSquare(null);
        setLegalMoves([]);
      }
      return;
    }

    // Select a piece of the current player
    if (piece && piece.color === playerTurn) {
      const moves = getLegalMoves(game, square);
      if (moves.length > 0) {
        setSelectedSquare(square);
        setLegalMoves(moves);
      }
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }, [board, selectedSquare, legalMoves, game, puzzle, moveIndex, playerTurn, solved, onSuccess]);

  const handleHint = () => {
    const sq = getHint(puzzle, moveIndex);
    if (sq) setHintSquare(sq);
  };

  const isLight = (r, c) => (r + c) % 2 === 0;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Status bar */}
      <div className="flex items-center gap-2 text-sm sm:text-base">
        <span className="font-bold text-gray-700">
          ♟️ Schaakmat in {totalPlayerMoves}
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">
          {playerTurn === 'w' ? 'Wit' : 'Zwart'} aan zet
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-xs text-gray-400">
          Zet {moveIndex + 1}/{totalPlayerMoves}
        </span>
      </div>

      {/* Chess board */}
      <div className="relative w-full max-w-[min(90vw,360px)] aspect-square">
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full rounded-lg overflow-hidden border-2 border-gray-800 shadow-lg">
          {board.map((row, r) =>
            row.map((piece, c) => {
              const files = 'abcdefgh';
              const sq = files[c] + (8 - r);
              const isSelected = selectedSquare === sq;
              const isLegal = legalMoves.some(m => m.to === sq);
              const isHint = hintSquare === sq;
              const isWrong = wrongMove === sq;
              const isLast = lastMove && (lastMove.from === sq || lastMove.to === sq);
              const light = isLight(r, c);

              let bg = light ? 'bg-amber-100' : 'bg-amber-700';
              if (isSelected) bg = 'bg-blue-400';
              else if (isWrong) bg = 'bg-red-400';
              else if (isHint) bg = light ? 'bg-green-200' : 'bg-green-500';
              else if (isLast) bg = light ? 'bg-yellow-200' : 'bg-yellow-600';

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleSquareClick(r, c)}
                  className={`${bg} relative flex items-center justify-center transition-colors aspect-square`}
                  aria-label={`${sq}${piece ? ` ${piece.color === 'w' ? 'wit' : 'zwart'} ${piece.type}` : ''}`}
                >
                  {/* Legal move dot */}
                  {isLegal && !piece && (
                    <div className="w-1/4 h-1/4 rounded-full bg-black/20" />
                  )}
                  {/* Legal capture ring */}
                  {isLegal && piece && (
                    <div className="absolute inset-[4px] rounded-full border-[3px] border-black/20" />
                  )}
                  {/* Piece */}
                  {piece && (
                    <span className={`text-[clamp(1.2rem,6vw,2.5rem)] leading-none select-none ${
                      piece.color === 'w' ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]' : ''
                    }`}>
                      {PIECE_SYMBOLS[piece.color + piece.type]}
                    </span>
                  )}
                  {/* Coordinate labels */}
                  {c === 0 && (
                    <span className={`absolute top-0 left-0.5 text-[0.5rem] font-bold ${light ? 'text-amber-700' : 'text-amber-100'} leading-none`}>
                      {8 - r}
                    </span>
                  )}
                  {r === 7 && (
                    <span className={`absolute bottom-0 right-0.5 text-[0.5rem] font-bold ${light ? 'text-amber-700' : 'text-amber-100'} leading-none`}>
                      {files[c]}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Wrong move feedback */}
      {wrongMove && (
        <p className="text-red-500 text-sm font-medium animate-pulse">
          ✖ Dat is niet de juiste zet!
        </p>
      )}

      {/* Solved feedback */}
      {solved && (
        <p className="text-green-600 text-lg font-bold animate-bounce">
          ♔ Schaakmat! Goed gedaan!
        </p>
      )}

      {/* Action buttons */}
      {!solved && (
        <div className="flex gap-2">
          <button
            onClick={handleHint}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-xl shadow-md transition-all hover:scale-105 text-sm sm:text-base"
            aria-label="Toon een hint"
          >
            💡 Hint
          </button>
          <button
            onClick={() => setShowRules(true)}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-xl shadow-md transition-all hover:scale-105 text-sm sm:text-base"
            aria-label="Uitleg over de regels"
          >
            ❓ Uitleg
          </button>
        </div>
      )}

      {showRules && <PuzzleRulesCard puzzleType="chess" onClose={() => setShowRules(false)} theme={theme} />}
    </div>
  );
}

export default ChessGame;
