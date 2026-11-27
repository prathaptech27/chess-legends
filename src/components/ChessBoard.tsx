import { useState, useEffect } from 'react';
import { Chess, type Square } from 'chess.js';

interface ChessBoardProps {
  fen?: string;
  onMove?: (move: { from: string; to: string; san: string; fen: string }) => void;
  interactive?: boolean;
}

const PIECE_SYMBOLS: Record<string, string> = {
  wp: '♙', wn: '♘', wb: '♗', wr: '♖', wq: '♕', wk: '♔',
  bp: '♟', bn: '♞', bb: '♝', br: '♜', bq: '♛', bk: '♚',
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export default function ChessBoard({
  fen = 'start',
  onMove,
  interactive = true,
}: ChessBoardProps) {
  const [game, setGame] = useState(() => new Chess(fen === 'start' ? undefined : fen));
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<string[]>([]);

  useEffect(() => {
    setGame(new Chess(fen === 'start' ? undefined : fen));
    setSelected(null);
    setLegalTargets([]);
  }, [fen]);

  const handleSquareClick = (square: Square) => {
    if (!interactive) return;

    // If a piece is already selected and user clicks a legal destination
    if (selected && legalTargets.includes(square)) {
      const nextGame = new Chess(game.fen());
      const result = nextGame.move({ from: selected, to: square, promotion: 'q' });
      if (result) {
        setGame(nextGame);
        setSelected(null);
        setLegalTargets([]);
        onMove?.({
          from: result.from,
          to: result.to,
          san: result.san,
          fen: nextGame.fen(),
        });
        return;
      }
    }

    // Otherwise, select a piece belonging to the side to move
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setSelected(square);
      const moves = game.moves({ square, verbose: true });
      setLegalTargets(moves.map((m) => m.to));
    } else {
      setSelected(null);
      setLegalTargets([]);
    }
  };

  const board = game.board();

  return (
    <div className="chessboard-wrap">
      <div className="chessboard">
        {RANKS.map((rank, rIdx) =>
          FILES.map((file, fIdx) => {
            const square = `${file}${rank}` as Square;
            const piece = board[rIdx][fIdx];
            const isDark = (rIdx + fIdx) % 2 === 1;
            const isSelected = selected === square;
            const isLegal = legalTargets.includes(square);

            return (
              <button
                key={square}
                type="button"
                className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSquareClick(square)}
              >
                {fIdx === 0 && <span className="coord rank">{rank}</span>}
                {rIdx === 7 && <span className="coord file">{file}</span>}
                {piece && (
                  <span className={`piece ${piece.color === 'w' ? 'white-piece' : 'black-piece'}`}>
                    {PIECE_SYMBOLS[`${piece.color}${piece.type}`]}
                  </span>
                )}
                {isLegal && <span className={`legal-dot ${piece ? 'capture' : ''}`} />}
              </button>
            );
          })
        )}
      </div>
      <div className="board-status">
        <span>Turn: <b>{game.turn() === 'w' ? 'White' : 'Black'}</b></span>
        {game.isCheckmate() && <span className="badge-alert">Checkmate!</span>}
        {game.isCheck() && !game.isCheckmate() && <span className="badge-alert">Check</span>}
        {game.isStalemate() && <span className="badge-alert">Stalemate</span>}
      </div>
    </div>
  );
}