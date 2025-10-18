import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api } from '@/lib/api-client';
import type { LeaderboardEntry } from '@shared/types';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await api<LeaderboardEntry[]>('/api/leaderboard');
        setLeaderboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);
  return (
    <AppLayout>
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center">
            <div className="inline-block bg-brand-accent/10 text-brand-accent p-4 rounded-full mb-4">
              <Trophy className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display">Leaderboard</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              See who's mastering the world of molecular biology. Keep learning to climb the ranks!
            </p>
          </header>
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : error ? (
                <div className="text-center text-red-500 p-8">{error}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24 text-center">Rank</TableHead>
                      <TableHead>Learner</TableHead>
                      <TableHead className="text-center">Modules Completed</TableHead>
                      <TableHead className="text-right">Average Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.map((entry) => (
                      <TableRow key={entry.rank} className={cn(entry.name === 'You' && 'bg-brand-primary/10')}>
                        <TableCell className="font-bold text-2xl text-center">
                          {entry.rank === 1 && '🥇'}
                          {entry.rank === 2 && '🥈'}
                          {entry.rank === 3 && '🥉'}
                          {entry.rank > 3 && entry.rank}
                        </TableCell>
                        <TableCell className="font-medium text-lg">{entry.name}</TableCell>
                        <TableCell className="text-center text-lg">{entry.modulesCompleted}</TableCell>
                        <TableCell className="text-right font-semibold text-lg text-brand-secondary">{entry.averageScore}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          <footer className="text-center mt-8 text-muted-foreground">
            <p>Built with ❤️ by hc-bld-dev on Cloudflare</p>
          </footer>
        </div>
      </main>
    </AppLayout>
  );
};
export default LeaderboardPage;