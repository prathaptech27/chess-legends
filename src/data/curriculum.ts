export interface Chapter {
  id: number;
  title: string;
  difficulty: string;
  lessonCount: number;
  challengeCount: number;
  xp: number;
}

export interface Stage {
  id: number;
  title: string;
  category: string;
  chapters: Chapter[];
}

const rawStages: [string, string, string[]][] = [
  [
    'The Birth of a Chess Player',
    'FOUNDATION',
    [
      'The 64-Square Universe',
      'Meet the Six Warriors',
      "The Pawn's Journey",
      "The Knight's Unique Power",
      "The Bishop's Vision",
      "The Rook's Kingdom",
      "The Queen's Power",
      "The King's Survival",
      'Check, Checkmate & Stalemate',
      'Special Chess Rules',
    ],
  ],
  [
    'Chess Survival & Winning',
    'FOUNDATION',
    [
      'Protect Your Pieces',
      'The Value of Every Piece',
      'The Art of Capturing',
      'Never Give Away Pieces',
      'Threat Detection',
      'Defend or Escape',
      "The King's Safety",
      'The Two-Move Trap',
      'Winning Material',
      'The Survival Test',
    ],
  ],
  [
    'The Tactical Warrior',
    'TACTICS',
    [
      'Double Attack',
      'Knight Fork',
      'Bishop Fork',
      'Rook Fork',
      'Queen Fork',
      'Absolute Pin',
      'Relative Pin',
      'Skewer',
      'Discovered Attack',
      'Discovered Check',
      'Double Check',
      'Removing the Defender',
      'Deflection',
      'Attraction',
      'Interference',
      'Clearance Sacrifice',
      'Trapping Pieces',
      'Tactical Combinations',
      'Mate in One',
      'Mate in Two',
    ],
  ],
  [
    'The Art of Checkmate',
    'TACTICS',
    [
      'Back-Rank Mate',
      'Ladder Mate',
      'Queen and King Mate',
      'Rook and King Mate',
      'Smothered Mate',
      'Arabian Mate',
      "Anastasia's Mate",
      'Greek Gift Sacrifice',
      'Attacking the Castled King',
      'Checkmate Master Exam',
    ],
  ],
  [
    'The Opening Science',
    'OPENINGS',
    [
      'The Battle for the Centre',
      'Development',
      'Piece Activity',
      'King Safety',
      'Opening Tempo',
      'Italian Game',
      'Ruy Lopez',
      "Queen's Gambit",
      'Sicilian Defence',
      'Opening Master Exam',
    ],
  ],
  [
    'Positional Intelligence',
    'STRATEGY',
    [
      'What Makes a Position Good?',
      'Pawn Structure',
      'Isolated & Doubled Pawns',
      'Passed Pawns',
      'Weak & Strong Squares',
      'Knight Outposts',
      'Good Bishop vs Bad Bishop',
      'Open Files & 7th Rank',
      'Prophylaxis',
      'Strategic Master Exam',
    ],
  ],
  [
    'Calculation & Chess Thinking',
    'CALCULATION',
    [
      'Candidate Moves',
      'Checks, Captures & Threats',
      'Visualisation',
      'Short & Long Variations',
      'Defensive Calculation',
      'Zwischenzug',
      'Evaluating Final Positions',
      'Calculation Under Time Pressure',
      'Blindfold Calculation',
      'Calculation Championship',
    ],
  ],
  [
    'Endgame University',
    'ENDGAME',
    [
      'The Active King',
      'Direct & Distant Opposition',
      'Key Squares & Rule of the Square',
      'Triangulation & Zugzwang',
      'Lucena Position',
      'Philidor Position',
      'Rook Endgame Defence',
      'Bishop vs Knight Endgames',
      'Fortress Positions',
      'Advanced Endgame Championship',
    ],
  ],
  [
    'The Chess Psychologist',
    'PRACTICAL',
    [
      'Evaluate Before Moving',
      'Risk and Reward',
      'When to Exchange',
      'Simplification vs Complications',
      'Playing Winning Positions',
      'Defending Worse Positions',
      'Time Management',
      'Managing Tilt',
      'Avoiding Impulsive Moves',
      'Practical Chess Examination',
    ],
  ],
  [
    'The Grandmaster Game Library',
    'STUDY',
    [
      'The Immortal Game',
      'The Evergreen Game',
      "Fischer's Precision",
      "Capablanca's Simplicity",
      "Tal's Sacrificial Attacks",
      "Kasparov's Dynamic Chess",
      "Karpov's Positional Mastery",
      "Anand's Calculation",
      "Carlsen's Endgame Technique",
      'World Championship Strategies',
    ],
  ],
  [
    "The Master's Preparation Room",
    'EXPERT',
    [
      'Building a Repertoire',
      'Critical Opening Variations',
      'Dynamic vs Static Advantages',
      'Initiative & Compensation',
      'Exchange Sacrifice',
      'Prophylactic Thinking',
      'Complex Combinations',
      'Defensive Resource Hunting',
      'Finding the Only Move',
      'Advanced Tactical Exam',
    ],
  ],
  [
    'Chess Legends: Master Arena',
    'ELITE',
    [
      'Opening Preparation Championship',
      'Tactical Marathon',
      'Strategic Position Championship',
      'Calculation Marathon',
      'Endgame Championship',
      'Blindfold Challenge',
      'Time Pressure Tournament',
      'Defensive Master Challenge',
      'Grandmaster Game Simulation',
      'The Chess Legends Championship',
    ],
  ],
];

let chapterId = 1;

export const stages: Stage[] = rawStages.map(([title, category, chapterTitles], idx) => ({
  id: idx + 1,
  title,
  category,
  chapters: chapterTitles.map((chTitle) => {
    const id = chapterId++;
    return {
      id,
      title: chTitle,
      difficulty: category,
      lessonCount: id > 20 ? 4 : 3,
      challengeCount: 20 + (id % 11),
      xp: 100 + (id % 5) * 50,
    };
  }),
}));

export const totalChapters = chapterId - 1;