import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { UserProgress, Achievement } from '@shared/types';
import AchievementBadge from '@/components/AchievementBadge';
interface ProfileData {
  progress: UserProgress;
  achievements: Achievement[];
}
const ProfilePage = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const profileData = await api<ProfileData>('/api/progress');
        setData(profileData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);
  const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
  if (loading) {
    return (
      <AppLayout>
        <main className="p-8 max-w-5xl mx-auto">
          <Skeleton className="h-12 w-1/3 mb-8" />
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-10 w-1/4 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-32" />)}
          </div>
        </main>
      </AppLayout>
    );
  }
  if (error) return <AppLayout><div className="text-center text-red-500 p-8">{error}</div></AppLayout>;
  if (!data) return <AppLayout><div className="text-center p-8">No profile data found.</div></AppLayout>;
  const { progress, achievements } = data;
  const totalModulesCompleted = progress.completedModules.length;
  const quizScores = Object.values(progress.quizScores);
  const averageScore = quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;
  return (
    <AppLayout>
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-5xl font-display">Your Profile</h1>
            <p className="mt-2 text-lg text-muted-foreground">Track your progress and celebrate your achievements!</p>
          </header>
          <section className="mb-12">
            <h2 className="text-3xl font-display mb-4">Statistics</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard title="Modules Completed" value={totalModulesCompleted} icon={<div className="text-2xl">🎓</div>} />
              <StatCard title="Average Quiz Score" value={`${averageScore}%`} icon={<div className="text-2xl">🎯</div>} />
              <StatCard title="Achievements Unlocked" value={progress.earnedAchievementIds.length} icon={<div className="text-2xl">🏆</div>} />
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-display mb-4">Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {achievements.map((ach) => (
                <AchievementBadge
                  key={ach.id}
                  achievement={ach}
                  isUnlocked={progress.earnedAchievementIds.includes(ach.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </AppLayout>
  );
};
export default ProfilePage;