import { useMemo, useState } from 'react';
import {
  BookOpen,
  Swords,
  Puzzle,
  Brain,
  Library,
  Trophy,
  Search,
  Bell,
  Flame,
  Star,
  ChevronRight,
  Lock,
  CheckCircle2,
  Play,
  Menu,
  X,
  Target,
  Zap,
  Clock3,
  Sparkles,
} from 'lucide-react';
import { stages, totalChapters, type Chapter } from './data/curriculum';

type Page =
  | 'Dashboard'
  | 'Chess School'
  | 'Online Arena'
  | 'Puzzle World'
  | 'AI Grandmaster'
  | 'Legends Library'
  | 'My Progress';

interface ProgressState {
  completed: number[];
  xp: number;
  streak: number;
}

const navItems: { name: Page; icon: React.ComponentType<{ size?: number }> }[] = [
  { name: 'Dashboard', icon: Star },
  { name: 'Chess School', icon: BookOpen },
  { name: 'Online Arena', icon: Swords },
  { name: 'Puzzle World', icon: Puzzle },
  { name: 'AI Grandmaster', icon: Brain },
  { name: 'Legends Library', icon: Library },
  { name: 'My Progress', icon: Trophy },
];

const initialProgress: ProgressState = { completed: [], xp: 0, streak: 1 };

export default function App() {
  const [page, setPage] = useState<Page>('Dashboard');
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selected, setSelected] = useState<Chapter | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem('chess-legends-progress');
      return saved ? JSON.parse(saved) : initialProgress;
    } catch {
      return initialProgress;
    }
  });

  const completedSet = useMemo(() => new Set(progress.completed), [progress.completed]);
  const isUnlocked = (id: number) => id === 1 || completedSet.has(id - 1);

  const completeChapter = (chapter: Chapter) => {
    if (completedSet.has(chapter.id)) return;
    const next: ProgressState = {
      ...progress,
      completed: [...progress.completed, chapter.id],
      xp: progress.xp + chapter.xp,
    };
    setProgress(next);
    localStorage.setItem('chess-legends-progress', JSON.stringify(next));
    setSelected(null);
  };

  const allChapters = useMemo(() => stages.flatMap((s) => s.chapters), []);
  const currentChapter = allChapters.find((c) => !completedSet.has(c.id)) ?? allChapters[0];

  const filteredStages = useMemo(
    () =>
      stages
        .map((s) => ({
          ...s,
          chapters: s.chapters.filter(
            (c) =>
              (stageFilter === 'all' || String(s.id) === stageFilter) &&
              c.title.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((s) => s.chapters.length > 0),
    [search, stageFilter]
  );

  const navigate = (target: Page) => {
    setPage(target);
    setDrawerOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${drawerOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">♞</div>
          <div>
            <strong>
              CHESS <span>LEGENDS</span>
            </strong>
            <small>LEARN · CALCULATE · CONQUER</small>
          </div>
        </div>

        <div className="profile">
          <div className="avatar">P</div>
          <div>
            <b>Chess Explorer</b>
            <small>Rookie · Level 1</small>
          </div>
          <ChevronRight size={15} />
        </div>

        <div className="nav-label">YOUR ACADEMY</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={`nav-item ${page === item.name ? 'active' : ''}`}
              onClick={() => navigate(item.name)}
            >
              <Icon size={18} />
              <span>{item.name}</span>
              {item.name === 'Chess School' && <small>{totalChapters}</small>}
            </button>
          );
        })}

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <Sparkles size={18} />
            <b>Unlock your potential</b>
            <p>Your journey to chess mastery starts with one move.</p>
            <button onClick={() => navigate('Chess School')}>
              Explore academy <ChevronRight size={14} />
            </button>
          </div>
          <small className="version">CHESS LEGENDS · V0.1</small>
        </div>
      </aside>

      {drawerOpen && <div className="scrim" onClick={() => setDrawerOpen(false)} />}

      <main className="main">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setDrawerOpen(!drawerOpen)}>
            <Menu size={19} />
          </button>
          <div className="breadcrumb">
            Academy <ChevronRight size={14} /> <b>{page}</b>
          </div>
          <div className="top-actions">
            <div className="streak">
              <Flame size={17} />
              <b>{progress.streak}</b>
              <span>day streak</span>
            </div>
            <button className="icon-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="avatar small">P</div>
          </div>
        </header>

        {page === 'Dashboard' && (
          <div className="content">
            <div className="welcome-row">
              <div>
                <div className="eyebrow">
                  <Sparkles size={14} /> YOUR CHESS JOURNEY
                </div>
                <h1>
                  Every master was
                  <br />
                  once a <em>beginner.</em>
                </h1>
                <p className="muted">Your next move is the beginning of something great.</p>
              </div>
              <div className="hero-piece">♞</div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon gold">
                  <Zap size={17} />
                </div>
                <small>TOTAL XP</small>
                <strong>{progress.xp.toLocaleString()}</strong>
                <p>Keep learning to earn more</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon orange">
                  <Flame size={17} />
                </div>
                <small>DAY STREAK</small>
                <strong>{progress.streak} day</strong>
                <p>Come back tomorrow</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">
                  <Trophy size={17} />
                </div>
                <small>CHAPTERS</small>
                <strong>
                  {progress.completed.length}/{totalChapters}
                </strong>
                <p>Academy progress</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon blue">
                  <Target size={17} />
                </div>
                <small>SKILL RATING</small>
                <strong>—</strong>
                <p>Play games to establish</p>
              </div>
            </div>

            <div className="section-heading">
              <div>
                <h2>Continue your journey</h2>
                <p>Pick up right where you left off.</p>
              </div>
              <button className="text-button" onClick={() => navigate('Chess School')}>
                View curriculum <ChevronRight size={16} />
              </button>
            </div>

            <div className="continue-card">
              <div className="continue-icon">♟</div>
              <div className="continue-info">
                <small>CHAPTER {String(currentChapter.id).padStart(3, '0')}</small>
                <h3>{currentChapter.title}</h3>
                <p>Start with a focused lesson and practice what you learn.</p>
                <button className="primary" onClick={() => setSelected(currentChapter)}>
                  <Play size={16} fill="currentColor" /> Continue chapter
                </button>
              </div>
              <div className="continue-art">♔</div>
            </div>

            <div className="section-heading">
              <div>
                <h2>Your learning path</h2>
                <p>12 stages. Structured progression from beginner to master.</p>
              </div>
            </div>

            <div className="stage-mini-grid">
              {stages.slice(0, 4).map((s, i) => (
                <div
                  className="stage-mini"
                  key={s.id}
                  onClick={() => {
                    setStageFilter(String(s.id));
                    navigate('Chess School');
                  }}
                >
                  <span className="stage-number">{String(s.id).padStart(2, '0')}</span>
                  <div>
                    <b>{s.title}</b>
                    <small>
                      {s.chapters.length} chapters ·{' '}
                      {i === 0 ? 'Start here' : i === 1 ? 'Build confidence' : 'Unlock as you progress'}
                    </small>
                  </div>
                  <ChevronRight size={17} />
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'Chess School' && (
          <div className="content">
            <div className="page-head">
              <div className="eyebrow">
                <BookOpen size={14} /> THE CHESS ACADEMY
              </div>
              <h1>
                Master the <em>64 squares.</em>
              </h1>
              <p className="muted">
                A structured journey from your first move to advanced chess understanding.
              </p>
            </div>

            <div className="filter-row">
              <div className="search-box">
                <Search size={17} />
                <input
                  placeholder="Search chapters or skills..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
                <option value="all">All stages</option>
                {stages.map((s) => (
                  <option value={String(s.id)} key={s.id}>
                    Stage {s.id}: {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="stage-list">
              {filteredStages.map((s) => {
                const doneInStage = s.chapters.filter((c) => completedSet.has(c.id)).length;
                const pct = Math.round((doneInStage / s.chapters.length) * 100);
                return (
                  <section className="stage-block" key={s.id}>
                    <div className="stage-head">
                      <div className="stage-badge">{String(s.id).padStart(2, '0')}</div>
                      <div className="stage-title">
                        <small>{s.category}</small>
                        <h2>{s.title}</h2>
                        <p>
                          {s.chapters.length} chapters · {doneInStage} completed
                        </p>
                      </div>
                      <div className="stage-progress">
                        <div className="progress-track">
                          <div style={{ width: `${pct}%` }} />
                        </div>
                        <small>{pct}%</small>
                      </div>
                    </div>

                    <div className="chapter-grid">
                      {s.chapters.map((c) => {
                        const done = completedSet.has(c.id);
                        const unlocked = isUnlocked(c.id);
                        return (
                          <button
                            key={c.id}
                            className={`chapter-card ${!unlocked && !done ? 'locked' : ''} ${
                              done ? 'complete' : ''
                            }`}
                            onClick={() => (unlocked || done ? setSelected(c) : null)}
                          >
                            <div className="chapter-top">
                              <span>CH. {String(c.id).padStart(3, '0')}</span>
                              {done ? (
                                <CheckCircle2 size={17} />
                              ) : !unlocked ? (
                                <Lock size={15} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </div>
                            <b>{c.title}</b>
                            <div className="chapter-bottom">
                              <span>
                                <BookOpen size={13} /> {c.lessonCount} lessons
                              </span>
                              <span>
                                <Zap size={13} /> {c.xp} XP
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}

        {page !== 'Dashboard' && page !== 'Chess School' && (
          <div className="content placeholder">
            <div className="eyebrow">UPCOMING MODULE</div>
            <h1>{page}</h1>
            <p className="muted">
              This module is scheduled for the next development phase once the interactive board and
              chess.js engine are wired in.
            </p>
            <div className="roadmap-box">
              <b>Development roadmap</b>
              <div>
                <CheckCircle2 size={16} /> Academy interface & 12-stage curriculum
              </div>
              <div>
                <Clock3 size={16} /> Interactive chessboard & puzzle validation (chess.js)
              </div>
              <div>
                <Clock3 size={16} /> Stockfish engine & move analysis
              </div>
              <div>
                <Clock3 size={16} /> Online arena & adaptive AI coach
              </div>
            </div>
            <button className="primary" onClick={() => navigate('Chess School')}>
              Explore Chess School <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn close" onClick={() => setSelected(null)}>
              <X size={18} />
            </button>
            <div className="modal-kicker">
              CHAPTER {String(selected.id).padStart(3, '0')} · {selected.difficulty}
            </div>
            <h2>{selected.title}</h2>
            <p className="muted">
              Master this concept through guided lessons, practice positions, and a final mastery
              exam.
            </p>
            <div className="modal-stats">
              <div>
                <BookOpen />
                <strong>{selected.lessonCount} lessons</strong>
              </div>
              <div>
                <Target />
                <strong>{selected.challengeCount} challenges</strong>
              </div>
              <div>
                <Zap />
                <strong>{selected.xp} XP</strong>
              </div>
            </div>
            <div className="lesson-list">
              <div>
                <span className="lesson-num">01</span>
                <div>
                  <b>Understand the concept</b>
                  <small>Animated board explanation and key ideas</small>
                </div>
                <Play size={16} />
              </div>
              <div>
                <span className="lesson-num">02</span>
                <div>
                  <b>Guided practice</b>
                  <small>Solve positions with visual hints</small>
                </div>
                <Play size={16} />
              </div>
              <div>
                <span className="lesson-num">03</span>
                <div>
                  <b>Challenge round</b>
                  <small>Apply the skill independently</small>
                </div>
                <Play size={16} />
              </div>
              <div>
                <span className="lesson-num">04</span>
                <div>
                  <b>Mastery exam</b>
                  <small>Score 85%+ to unlock the next chapter</small>
                </div>
                <Trophy size={16} />
              </div>
            </div>
            <button
              className="primary full"
              onClick={() => completeChapter(selected)}
              disabled={completedSet.has(selected.id)}
            >
              <CheckCircle2 size={17} />
              {completedSet.has(selected.id) ? 'Chapter Completed' : 'Mark chapter complete'}
              <span>+{selected.xp} XP</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}