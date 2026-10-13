import { Badge, UserProgress } from '../types';

export interface BadgeDefinition {
  id: string;
  name: string;
  title: string;
  description: string;
  criteria: string;
  category: 'challenge' | 'quiz' | 'mastery';
  icon: string;
  gradient: string;
  accentColor: string;
  checkUnlocked: (progress: UserProgress) => { unlocked: boolean; progressText?: string };
}

// Helper to check if a specific chapter challenge has been solved
function isChallengeSolved(chapterId: number, completedChallenges: string[]): boolean {
  return completedChallenges.some((cId) => {
    return (
      cId === `ch${chapterId}-` ||
      cId.startsWith(`ch${chapterId}-`) ||
      cId === `ch${chapterId}`
    );
  });
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'syntax-sage',
    name: 'Syntax Sage',
    title: 'Syntax Sage',
    description: 'Master clean indentation, print statements, and fundamental Python syntax semantics.',
    criteria: 'Complete Chapter 1 coding challenge or score 100% on Chapter 1 quiz',
    category: 'challenge',
    icon: 'Terminal',
    gradient: 'from-sky-500 to-blue-600',
    accentColor: '#0284c7',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(1, p.completedChallenges);
      const perfectQuiz = p.quizScores[1] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 1 challenge or quiz',
      };
    },
  },
  {
    id: 'variable-virtuoso',
    name: 'Variable Virtuoso',
    title: 'Variable Virtuoso',
    description: 'Form an accurate mental model of object references, variable assignment, and Python memory.',
    criteria: 'Complete Chapter 2 coding challenge or score 100% on Chapter 2 quiz',
    category: 'challenge',
    icon: 'Layers',
    gradient: 'from-indigo-500 to-purple-600',
    accentColor: '#6366f1',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(2, p.completedChallenges);
      const perfectQuiz = p.quizScores[2] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 2 challenge or quiz',
      };
    },
  },
  {
    id: 'branching-boss',
    name: 'Branching Boss',
    title: 'Branching Boss',
    description: 'Master logic flows, boolean expressions, and complex if-elif-else condition trees.',
    criteria: 'Complete Chapter 4 coding challenge or score 100% on Chapter 4 quiz',
    category: 'challenge',
    icon: 'GitFork',
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: '#10b981',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(4, p.completedChallenges);
      const perfectQuiz = p.quizScores[4] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 4 challenge or quiz',
      };
    },
  },
  {
    id: 'loop-master',
    name: 'Loop Master',
    title: 'Loop Master',
    description: 'Conquer loops, range generators, accumulation patterns, and iteration cycles.',
    criteria: 'Complete Chapter 5 coding challenge or score 100% on Chapter 5 quiz',
    category: 'challenge',
    icon: 'Repeat',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(5, p.completedChallenges);
      const perfectQuiz = p.quizScores[5] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 5 challenge or quiz',
      };
    },
  },
  {
    id: 'sequence-specialist',
    name: 'Sequence Specialist',
    title: 'Sequence Specialist',
    description: 'Master lists, index boundaries, in-place mutation, and advanced slice notation.',
    criteria: 'Complete Chapter 6 coding challenge or score 100% on Chapter 6 quiz',
    category: 'challenge',
    icon: 'Boxes',
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: '#06b6d4',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(6, p.completedChallenges);
      const perfectQuiz = p.quizScores[6] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 6 challenge or quiz',
      };
    },
  },
  {
    id: 'dictionary-dynamo',
    name: 'Dictionary Dynamo',
    title: 'Dictionary Dynamo',
    description: 'Master O(1) hash tables, key-value mappings, and dictionary lookups.',
    criteria: 'Complete Chapter 7 coding challenge or score 100% on Chapter 7 quiz',
    category: 'challenge',
    icon: 'Database',
    gradient: 'from-violet-500 to-fuchsia-600',
    accentColor: '#8b5cf6',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(7, p.completedChallenges);
      const perfectQuiz = p.quizScores[7] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 7 challenge or quiz',
      };
    },
  },
  {
    id: 'function-fanatic',
    name: 'Function Fanatic',
    title: 'Function Fanatic',
    description: 'Design modular, reusable functions with pure signatures and clear return contracts.',
    criteria: 'Complete Chapter 8 coding challenge or score 100% on Chapter 8 quiz',
    category: 'challenge',
    icon: 'Wrench',
    gradient: 'from-blue-600 to-indigo-700',
    accentColor: '#2563eb',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(8, p.completedChallenges);
      const perfectQuiz = p.quizScores[8] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 8 challenge or quiz',
      };
    },
  },
  {
    id: 'bug-hunter',
    name: 'Bug Hunter',
    title: 'Bug Hunter',
    description: 'Safeguard applications against crashes with robust try-except error handling.',
    criteria: 'Complete Chapter 9 coding challenge or score 100% on Chapter 9 quiz',
    category: 'challenge',
    icon: 'ShieldCheck',
    gradient: 'from-rose-500 to-pink-600',
    accentColor: '#f43f5e',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(9, p.completedChallenges);
      const perfectQuiz = p.quizScores[9] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 9 challenge or quiz',
      };
    },
  },
  {
    id: 'oop-architect',
    name: 'OOP Architect',
    title: 'OOP Architect',
    description: 'Architect object-oriented blueprints, constructors (__init__), and encapsulated state.',
    criteria: 'Complete Chapter 10 coding challenge or score 100% on Chapter 10 quiz',
    category: 'challenge',
    icon: 'Cpu',
    gradient: 'from-purple-600 to-indigo-800',
    accentColor: '#7c3aed',
    checkUnlocked: (p) => {
      const solved = isChallengeSolved(10, p.completedChallenges);
      const perfectQuiz = p.quizScores[10] === 100;
      return {
        unlocked: solved || perfectQuiz,
        progressText: solved ? 'Challenge Solved!' : perfectQuiz ? '100% Quiz Score!' : 'Solve Ch. 10 challenge or quiz',
      };
    },
  },
  {
    id: 'quiz-perfectionist',
    name: 'Quiz Perfectionist',
    title: 'Quiz Perfectionist',
    description: 'Demonstrate deep conceptual mastery with flawless 100% scores on at least 3 chapter quizzes.',
    criteria: 'Achieve 100% score on 3 or more chapter quizzes',
    category: 'quiz',
    icon: 'Sparkles',
    gradient: 'from-yellow-400 to-amber-600',
    accentColor: '#d97706',
    checkUnlocked: (p) => {
      const perfectCount = Object.values(p.quizScores).filter((s) => s === 100).length;
      return {
        unlocked: perfectCount >= 3,
        progressText: perfectCount >= 3 ? `${perfectCount}/3 Perfect Quizzes` : `${perfectCount}/3 Quizzes (Target: 3)`,
      };
    },
  },
  {
    id: 'flawless-scholar',
    name: 'Flawless Scholar',
    title: 'Flawless Scholar',
    description: 'Ace half the textbook assessments with 100% perfection on 5 or more chapter quizzes.',
    criteria: 'Achieve 100% score on 5 or more chapter quizzes',
    category: 'quiz',
    icon: 'Trophy',
    gradient: 'from-amber-400 to-rose-500',
    accentColor: '#e11d48',
    checkUnlocked: (p) => {
      const perfectCount = Object.values(p.quizScores).filter((s) => s === 100).length;
      return {
        unlocked: perfectCount >= 5,
        progressText: perfectCount >= 5 ? `${perfectCount}/5 Perfect Quizzes` : `${perfectCount}/5 Quizzes (Target: 5)`,
      };
    },
  },
  {
    id: 'code-titan',
    name: 'Code Titan',
    title: 'Code Titan',
    description: 'Solve and satisfy automated test suites for at least 5 coding challenges.',
    criteria: 'Complete 5 or more coding challenges across any difficulty',
    category: 'mastery',
    icon: 'Zap',
    gradient: 'from-emerald-500 to-cyan-600',
    accentColor: '#059669',
    checkUnlocked: (p) => {
      const count = p.completedChallenges.length;
      return {
        unlocked: count >= 5,
        progressText: count >= 5 ? `${count}/5 Challenges Solved` : `${count}/5 Solved (Target: 5)`,
      };
    },
  },
  {
    id: 'python-grandmaster',
    name: 'Python Grandmaster',
    title: 'Python Grandmaster',
    description: 'The ultimate distinction: Complete all 10 curriculum chapters and solve all 10 challenges.',
    criteria: 'Complete all 10 chapters & solve all 10 coding challenges',
    category: 'mastery',
    icon: 'Crown',
    gradient: 'from-yellow-500 via-amber-600 to-purple-700',
    accentColor: '#b45309',
    checkUnlocked: (p) => {
      const allChapters = p.completedChapters.length >= 10;
      const allChallenges = p.completedChallenges.length >= 10;
      return {
        unlocked: allChapters && allChallenges,
        progressText: allChapters && allChallenges ? 'Grandmaster Attained!' : `${p.completedChapters.length}/10 Chapters · ${p.completedChallenges.length}/10 Challenges`,
      };
    },
  },
];

export function getBadgesWithStatus(progress: UserProgress): Badge[] {
  return BADGE_DEFINITIONS.map((def) => {
    const { unlocked, progressText } = def.checkUnlocked(progress);
    return {
      id: def.id,
      name: def.name,
      title: def.title,
      description: def.description,
      criteria: def.criteria,
      category: def.category,
      icon: def.icon,
      gradient: def.gradient,
      unlocked,
      progressText,
    };
  });
}

export function getUnlockedBadgesCount(progress: UserProgress): { unlocked: number; total: number } {
  const badges = getBadgesWithStatus(progress);
  const unlocked = badges.filter((b) => b.unlocked).length;
  return { unlocked, total: badges.length };
}
