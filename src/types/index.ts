export type ActId = 'act1' | 'act2' | 'act3';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface VisualMemoryItem {
  name: string;
  type: 'int' | 'str' | 'float' | 'bool' | 'list' | 'dict' | 'tuple' | 'function' | 'object' | 'None';
  value: string;
  memoryAddress: string;
  isReference?: boolean;
  targetAddress?: string;
  scope?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TestCase {
  inputDescription: string;
  callExpression: string;
  expectedOutput: string;
  explanation?: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: DifficultyLevel | 'Beginner' | 'Intermediate';
  prompt: string;
  starterCode: string;
  testCases: TestCase[];
  hint: string;
  solution: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  content: string;
  codeSample?: string;
  gotcha?: {
    title: string;
    description: string;
    badCode: string;
    goodCode: string;
  };
  deepDive?: {
    title: string;
    explanation: string;
  };
  memorySample?: {
    description: string;
    variables: VisualMemoryItem[];
  };
}

export interface Chapter {
  id: number;
  number: string; // e.g. "01"
  title: string;
  subtitle: string;
  act: ActId;
  difficulty: DifficultyLevel;
  readTimeMinutes: number;
  summary: string;
  sections: ChapterSection[];
  quiz: QuizQuestion[];
  challenge: Challenge;
  challengesByDifficulty?: Record<DifficultyLevel, Challenge>;
  keyTakeaways: string[];
  projectNote?: string;
}

export interface Badge {
  id: string;
  name: string;
  title: string;
  description: string;
  criteria: string;
  category: 'challenge' | 'quiz' | 'mastery';
  icon: string;
  gradient: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressText?: string;
}

export interface UserProgress {
  studentName: string;
  completedChapters: number[];
  completedChallenges: string[];
  quizScores: Record<number, number>; // chapterId -> percentage (0-100)
  bookmarks: number[];
  customCodes: Record<string, string>; // chapterId/challengeId -> student code
  preferredDifficulty?: DifficultyLevel;
  unlockedBadges?: string[];
  issuedDate?: string;
  certificateId?: string;
}

export interface ExecutionResult {
  output: string[];
  errors: string[];
  executionTimeMs: number;
  variables: VisualMemoryItem[];
  returnValue?: string;
  success: boolean;
}
