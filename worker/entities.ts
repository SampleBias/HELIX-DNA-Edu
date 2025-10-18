import { Entity } from "./core-utils";
import type { UserProgress } from "@shared/types";
import { MOCK_MODULES, MOCK_ACHIEVEMENTS } from "@shared/mock-data";
export class UserProgressEntity extends Entity<UserProgress> {
  static readonly entityName = "userProgress";
  static readonly initialState: UserProgress = {
    userId: "",
    completedSteps: {},
    completedModules: [],
    quizScores: {},
    earnedAchievementIds: [],
  };
  // Helper to unlock an achievement if it hasn't been earned yet
  private async unlockAchievement(achievementId: string): Promise<boolean> {
    const achievementExists = MOCK_ACHIEVEMENTS.some(a => a.id === achievementId);
    if (!achievementExists) return false;
    const currentState = await this.getState();
    if (!currentState.earnedAchievementIds.includes(achievementId)) {
      await this.mutate(s => ({
        ...s,
        earnedAchievementIds: [...s.earnedAchievementIds, achievementId],
      }));
      return true;
    }
    return false;
  }
  async completeStep(moduleId: string, stepIndex: number): Promise<void> {
    await this.mutate(s => {
      const steps = s.completedSteps[moduleId] || [];
      if (!steps.includes(stepIndex)) {
        steps.push(stepIndex);
      }
      return { ...s, completedSteps: { ...s.completedSteps, [moduleId]: steps } };
    });
    // Check for achievements after state update
    await this.unlockAchievement('first-step');
    const module = MOCK_MODULES.find(m => m.id === moduleId);
    if (module && module.steps.length > 0) {
      const currentProgress = await this.getState();
      const completedStepsForModule = currentProgress.completedSteps[moduleId] || [];
      if (completedStepsForModule.length >= module.steps.length) {
        if (!currentProgress.completedModules.includes(moduleId)) {
          await this.mutate(s => ({
            ...s,
            completedModules: [...s.completedModules, moduleId],
          }));
          // This will unlock achievements like 'dna-structure-module-complete', etc.
          await this.unlockAchievement(`${moduleId}-module-complete`);
        }
      }
    }
  }
  async setQuizScore(moduleId: string, score: number): Promise<void> {
    await this.mutate(s => ({
      ...s,
      quizScores: { ...s.quizScores, [moduleId]: score },
    }));
    // Check for perfect score achievement
    if (score === 100) {
      await this.unlockAchievement('perfect-quiz');
    }
  }
}