export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface QuizChoice {
  text: string;
  isCorrect: boolean;
}
export interface QuizQuestion {
  question: string;
  choices: QuizChoice[];
  explanation: string;
}
export type ModuleStepType = 'text' | 'dna-builder' | '3d-viewer' | 'quiz' | 'transcription-animation' | 'translation-animation' | 'dna-replication-animation' | 'protein-folding-animation' | 'crispr-animation';
export interface ModuleStep {
  type: ModuleStepType;
  title: string;
  content?: string; // For text steps
  quiz?: QuizQuestion[]; // For quiz steps
}
export interface Module {
  id: string;
  title: string;
  description: string;
  steps: ModuleStep[];
}
// A summary type for the dashboard view to avoid sending all step data
export interface ModuleSummary extends Omit<Module, 'steps'> {
  progress: number;
  totalSteps: number;
}
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}
export interface UserProgress {
  userId: string;
  completedSteps: {
    [moduleId:string]: number[]; // Array of completed step indices
  };
  completedModules: string[]; // Array of completed module IDs
  quizScores: {
    [moduleId: string]: number; // Score percentage
  };
  earnedAchievementIds: string[];
}
export interface LeaderboardEntry {
  rank: number;
  name: string;
  modulesCompleted: number;
  averageScore: number;
}