import { Hono } from "hono";
import type { Env } from './core-utils';
import { ok, notFound, bad } from './core-utils';
import { MOCK_MODULES, MOCK_ACHIEVEMENTS, MOCK_LEADERBOARD } from '@shared/mock-data';
import { UserProgressEntity } from './entities';
import type { ModuleSummary } from "@shared/types";
// A simple, insecure way to get a user ID. In a real app, this would come from an auth system.
const getUserId = (c: any) => c.req.header('X-User-ID') || 'guest-user';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // List all modules, enriched with user progress
  app.get('/api/modules', async (c) => {
    const userId = getUserId(c);
    const progressEntity = new UserProgressEntity(c.env, userId);
    const userProgress = await progressEntity.getState();
    const moduleSummaries: ModuleSummary[] = MOCK_MODULES.map(({ id, title, description, steps }) => {
      const completedSteps = userProgress.completedSteps[id]?.length || 0;
      const totalSteps = steps.length;
      const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
      return { id, title, description, progress, totalSteps };
    });
    return ok(c, moduleSummaries);
  });
  // Get a single module by ID (detailed view with steps)
  app.get('/api/modules/:id', (c) => {
    const { id } = c.req.param();
    const module = MOCK_MODULES.find((m) => m.id === id);
    if (module) {
      return ok(c, module);
    } else {
      return notFound(c, 'Module not found');
    }
  });
  // Get user progress and achievements
  app.get('/api/progress', async (c) => {
    const userId = getUserId(c);
    const progressEntity = new UserProgressEntity(c.env, userId);
    const progress = await progressEntity.getState();
    const achievements = MOCK_ACHIEVEMENTS;
    return ok(c, { progress, achievements });
  });
  // Mark a step as complete
  app.post('/api/progress/step', async (c) => {
    const { moduleId, stepIndex } = await c.req.json<{ moduleId: string; stepIndex: number }>();
    if (!moduleId || typeof stepIndex !== 'number') {
      return bad(c, 'Missing moduleId or stepIndex');
    }
    const userId = getUserId(c);
    const progressEntity = new UserProgressEntity(c.env, userId);
    await progressEntity.completeStep(moduleId, stepIndex);
    return ok(c, { success: true });
  });
  // Save a quiz score
  app.post('/api/progress/quiz', async (c) => {
    const { moduleId, score } = await c.req.json<{ moduleId: string; score: number }>();
    if (!moduleId || typeof score !== 'number') {
      return bad(c, 'Missing moduleId or score');
    }
    const userId = getUserId(c);
    const progressEntity = new UserProgressEntity(c.env, userId);
    await progressEntity.setQuizScore(moduleId, score);
    return ok(c, { success: true });
  });
  // Get leaderboard data
  app.get('/api/leaderboard', (c) => {
    // In a real app, this would be generated from user data.
    // For now, we return sorted mock data.
    const sortedLeaderboard = MOCK_LEADERBOARD.sort((a, b) => a.rank - b.rank);
    return ok(c, sortedLeaderboard);
  });
}