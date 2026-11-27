import { useState } from 'react';
import { Chess } from 'chess.js';
import { RotateCcw, Swords, Cpu } from 'lucide-react';
import ChessBoard from './ChessBoard';

type Difficulty = 'Beginner' | 'Intermediate';

function pickAiMove(game: Chess, difficulty: Difficulty) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  if (difficulty === 'Intermediate') {
    const captures = moves.filter((m) => m.captured);
    if (captures.length > 0) {
      return captures[Math.floor(Math.random() * captures.length)];
    }
  }
  return moves[Math.floor(Math.random() * moves.length)];
}

export default function Arena() {
  const [fen, setFen] = useState('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [history, setHistory] = useState<string[]>([]);
  const [status, setStatus] = useState('Your turn (White)');
  const [aiThinking, setAiThinking] = useState(false);

  const resetGame = () => {
    setFen('start');
    setHistory([]);
    setStatus('Your turn (White)');
    setAiThinking(false);
  };

  const handlePlayerMove = (move: { san: string; fen: string }) => {
    const nextGame = new Chess(move.fen);
    setFen(move.fen);
    setHistory((prev) => [...prev, move.san]);

    if (nextGame.isCheckmate()) {
      setStatus('Checkmate! You win.');
      return;
    }
    if (nextGame.isDraw()) {
      setStatus('Game drawn.');
      return;
    }

    setAiThinking(true);
    setStatus('AI is thinking...');

    setTimeout(() => {
      const aiMove = pickAiMove(nextGame, difficulty);
      if (aiMove) {
        nextGame.move(aiMove);
        setFen(nextGame.fen());
        setHistory((prev) => [...prev, aiMove.san]);

        if (nextGame.isCheckmate()) {
          setStatus('Checkmate! AI wins.');
        } else if (nextGame.isDraw()) {
          setStatus('Game drawn.');
        } else {
          setStatus('Your turn (White)');
        }
      }
      setAiThinking(false);
    }, 450);
  };

  return (
    <div className="content">
      <div className="page-head">
        <div className="eyebrow">
          <Swords size={14} /> ONLINE ARENA
        </div>
        <h1>
          Play vs <em>AI Bot.</em>
        </h1>
        <p className="muted">Practice your openings, tactics, and checkmates in a full game.</p>
      </div>

      <div className="filter-row" style={{ alignItems: 'center' }}>
        <div className="search-box" style={{ flex: 'none', padding: '8px 12px' }}>
          <Cpu size={16} />
          <span style={{ fontSize: '11px', color: '#dce5df' }}>{status}</span>
        </div>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          style={{ height: '36px' }}
        >
          <option value="Beginner">Bot: Beginner</option>
          <option value="Intermediate">Bot: Intermediate</option>
        </select>

        <button className="primary" onClick={resetGame}>
          <RotateCcw size={14} /> New Game
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '20px', alignItems: 'start' }}>
        <div className="stage-block">
          <ChessBoard fen={fen} onMove={handlePlayerMove} interactive={!aiThinking} />
        </div>

        <div className="stage-block">
          <b style={{ fontSize: '12px', color: '#d5b66d', display: 'block', marginBottom: '10px' }}>
            Move History
          </b>
          {history.length === 0 ? (
            <p className="muted">Make your first move as White.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px' }}>
              {history.map((san, idx) => (
                <div key={idx} style={{ color: idx % 2 === 0 ? '#e9eeeb' : '#85938c' }}>
                  {idx % 2 === 0 ? `${Math.floor(idx / 2) + 1}. ` : ''}
                  {san}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
