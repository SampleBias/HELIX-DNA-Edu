import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { ModuleSummary } from '@shared/types';
import { Dna, Atom, TestTube, Copy, Shapes, FlaskConical } from 'lucide-react';
const ICONS: { [key: string]: React.ElementType } = {
  'dna-structure': Dna,
  'dna-replication': Copy,
  'transcription': Atom,
  'translation': TestTube,
  'gene-to-protein': Shapes,
  'virtual-lab-crispr': FlaskConical,
};
const ModuleCard = ({ module }: { module: ModuleSummary }) => {
  const Icon = ICONS[module.id] || Dna;
  return (
    <Link to={`/module/${module.id}`} className="block group">
      <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm hover:bg-card/80 border-2 border-transparent hover:border-brand-primary transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 rounded-2xl overflow-hidden">
        <CardHeader className="p-0">
          <div className="aspect-video bg-muted/50 overflow-hidden center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10"></div>
            <Icon className="w-24 h-24 text-brand-primary/50 group-hover:text-brand-primary transition-colors duration-300" strokeWidth={1.5} />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-2xl font-display text-foreground">{module.title}</CardTitle>
          <CardDescription className="mt-2 text-base text-muted-foreground">{module.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <div className="w-full">
            <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-2 progress-vibrant-green" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
const DashboardPage = () => {
  const [modules, setModules] = useState<ModuleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const fetchedModules = await api<ModuleSummary[]>('/api/modules');
        setModules(fetchedModules);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load modules.');
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);
  return (
    <AppLayout>
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-display text-foreground tracking-wider">Welcome to HelixScope</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              An interactive journey into the world of molecular biology. Select a module to begin your adventure!
            </p>
          </header>
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="rounded-2xl">
                  <Skeleton className="aspect-video rounded-t-2xl" />
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Skeleton className="h-6 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          {error && <div className="text-center text-red-500">{error}</div>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          )}
        </div>
      </main>
    </AppLayout>
  );
};
export default DashboardPage;