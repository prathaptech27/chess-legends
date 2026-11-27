export interface Challenge {
  title: string;
  instruction: string;
  fen: string;
  expectedMove: string; // e.g., "e2e4" (from + to)
  hint: string;
}

export const chapterChallenges: Record<number, Challenge[]> = {
  1: [
    {
      title: 'Control the Center',
      instruction: 'Move the White pawn from e2 to the central square e4.',
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      expectedMove: 'e2e4',
      hint: 'Click the pawn on e2, then click e4.',
    },
    {
      title: 'Develop the Knight',
      instruction: 'Jump the White knight from g1 to f3.',
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
      expectedMove: 'g1f3',
      hint: 'Knights move in an L-shape. Click g1, then f3.',
    },
  ],
  2: [
    {
      title: 'Bishop Diagonal Capture',
      instruction: 'Use your White bishop on c1 to capture the Black knight on g5.',
      fen: 'r1bqkbnr/pppppppp/8/6n1/8/3P4/PPP1PPPP/RNBQKBNR w KQkq - 0 1',
      expectedMove: 'c1g5',
      hint: 'Move the bishop diagonally from c1 all the way to g5.',
    },
  ],
  3: [
    {
      title: 'Pawn Promotion',
      instruction: 'Advance your White pawn on e7 to e8 to promote it into a Queen.',
      fen: '8/4P3/8/8/8/8/6k1/4K3 w - - 0 1',
      expectedMove: 'e7e8',
      hint: 'Click the pawn on e7 and move it to e8.',
    },
  ],
};

// Default playable puzzle (Back-rank Mate in 1) for any other chapter
export const defaultChallenge: Challenge[] = [
  {
    title: 'Deliver Checkmate in 1',
    instruction: 'Move the White rook to deliver a back-rank checkmate.',
    fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
    expectedMove: 'e1e8',
    hint: 'Move your rook from e1 to e8.',
  },
];