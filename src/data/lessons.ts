export interface Challenge {
  title: string;
  instruction: string;
  fen: string;
  expectedMove: string;
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
      title: 'Claim More Center Space',
      instruction: 'Push your d2 pawn two squares forward to d4.',
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
      expectedMove: 'd2d4',
      hint: 'Click the pawn on d2, then click d4.',
    },
  ],
  2: [
    {
      title: 'Bishop Diagonal Capture',
      instruction: 'Use your White bishop on c1 to capture the Black knight on g5.',
      fen: 'r1bqkbnr/pppppppp/8/6n1/8/3P4/PPP1PPPP/RNBQKBNR w KQkq - 0 1',
      expectedMove: 'c1g5',
      hint: 'Move the bishop diagonally from c1 to g5.',
    },
    {
      title: 'Rook Open File Capture',
      instruction: 'Capture the Black rook on e4 using your White rook on e1.',
      fen: '4k3/8/8/8/4r3/8/8/4R1K1 w - - 0 1',
      expectedMove: 'e1e4',
      hint: 'Move the rook straight up the e-file from e1 to e4.',
    },
  ],
  3: [
    {
      title: 'Diagonal Pawn Capture',
      instruction: 'Pawns capture diagonally. Capture the Black pawn on d5.',
      fen: '4k3/8/8/3p4/4P3/8/8/4K3 w - - 0 1',
      expectedMove: 'e4d5',
      hint: 'Click your pawn on e4, then capture on d5.',
    },
    {
      title: 'Pawn Promotion',
      instruction: 'Advance your White pawn from e7 to e8 to promote it into a Queen.',
      fen: '8/4P3/8/8/8/8/6k1/4K3 w - - 0 1',
      expectedMove: 'e7e8',
      hint: 'Click the pawn on e7 and move it to e8.',
    },
  ],
  4: [
    {
      title: 'Jump Over Pieces',
      instruction: 'Develop your White knight from g1 to f3, jumping over your pawns.',
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      expectedMove: 'g1f3',
      hint: 'Knights move in an L-shape. Click g1, then f3.',
    },
    {
      title: 'Knight Strike',
      instruction: 'Use your knight on e4 to capture the Black queen on f6.',
      fen: '4k3/8/5q2/8/4N3/8/8/4K3 w - - 0 1',
      expectedMove: 'e4f6',
      hint: 'Move the knight two squares up and one square right to f6.',
    },
  ],
  5: [
    {
      title: 'Long Diagonal Snipe',
      instruction: 'Capture the Black rook on g7 from across the board.',
      fen: '4k3/6r1/8/8/8/2B5/8/4K3 w - - 0 1',
      expectedMove: 'c3g7',
      hint: 'Click the bishop on c3 and slide it diagonally to g7.',
    },
    {
      title: 'Bishop vs Bishop',
      instruction: 'Capture the Black bishop on f6 with your bishop on d4.',
      fen: '4k3/8/5b2/8/3B4/8/8/4K3 w - - 0 1',
      expectedMove: 'd4f6',
      hint: 'Move your bishop from d4 to f6.',
    },
  ],
  6: [
    {
      title: 'Win the Open File',
      instruction: 'Capture the Black rook on d2 with your rook on d1.',
      fen: '4k3/8/8/8/8/8/3r4/3R2K1 w - - 0 1',
      expectedMove: 'd1d2',
      hint: 'Click d1 and move straight up to d2.',
    },
    {
      title: 'Sweep Across the Rank',
      instruction: 'Slide your rook along the 5th rank to capture the Black knight on g5.',
      fen: '4k3/8/8/1R4n1/8/8/8/4K3 w - - 0 1',
      expectedMove: 'b5g5',
      hint: 'Move the rook horizontally from b5 to g5.',
    },
  ],
  7: [
    {
      title: 'Diagonal Queen Strike',
      instruction: 'Move your queen like a bishop to capture the Black rook on g6.',
      fen: '4k3/8/6r1/8/8/3Q4/8/4K3 w - - 0 1',
      expectedMove: 'd3g6',
      hint: 'Click the queen on d3 and move diagonally to g6.',
    },
    {
      title: 'Vertical Queen Strike',
      instruction: 'Move your queen like a rook to capture the Black knight on d7.',
      fen: '4k3/3n4/8/8/8/3Q4/8/4K3 w - - 0 1',
      expectedMove: 'd3d7',
      hint: 'Click the queen on d3 and move straight up to d7.',
    },
  ],
  8: [
    {
      title: 'Capture the Attacker',
      instruction: 'Your King is in check! Capture the unprotected Black rook on e2.',
      fen: '4k3/8/8/8/8/8/4r3/4K3 w - - 0 1',
      expectedMove: 'e1e2',
      hint: 'Click your King on e1 and capture the rook on e2.',
    },
    {
      title: 'Escape the Check',
      instruction: 'Your King is in check from the rook on a1. Step out of check to f2.',
      fen: '4k3/8/8/8/8/8/8/r3K3 w - - 0 1',
      expectedMove: 'e1f2',
      hint: 'Move your King diagonally from e1 to f2.',
    },
  ],
  9: [
    {
      title: 'Back-Rank Checkmate',
      instruction: 'Deliver checkmate in 1 move using your White rook.',
      fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
      expectedMove: 'e1e8',
      hint: 'Move your rook from e1 to e8.',
    },
    {
      title: 'Supported Queen Checkmate',
      instruction: 'Use your King to support your Queen and deliver checkmate on g7.',
      fen: '7k/5Q2/6K1/8/8/8/8/8 w - - 0 1',
      expectedMove: 'f7g7',
      hint: 'Move your Queen from f7 to g7.',
    },
  ],
  10: [
    {
      title: 'Kingside Castling',
      instruction: 'Castle kingside to tuck your King to safety and activate your rook.',
      fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
      expectedMove: 'e1g1',
      hint: 'Click your King on e1, then click g1.',
    },
    {
      title: 'En Passant Capture',
      instruction: 'Black just moved d7-d5. Capture the pawn en passant on d6.',
      fen: '4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 1',
      expectedMove: 'e5d6',
      hint: 'Click your pawn on e5 and move diagonally to the empty d6 square.',
    },
  ],
};

export const defaultChallenge: Challenge[] = [
  {
    title: 'Deliver Checkmate in 1',
    instruction: 'Move the White rook to deliver a back-rank checkmate.',
    fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
    expectedMove: 'e1e8',
    hint: 'Move your rook from e1 to e8.',
  },
];
