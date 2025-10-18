import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { Module, ModuleStep } from '@shared/types';
import DnaBuilder from '@/components/modules/DnaBuilder';
import MoleculeViewer from '@/components/modules/MoleculeViewer';
import Quiz from '@/components/modules/Quiz';
import TranscriptionAnimation from '@/components/modules/TranscriptionAnimation';
import TranslationAnimation from '@/components/modules/TranslationAnimation';
import DnaReplicationAnimation from '@/components/modules/DnaReplicationAnimation';
import ProteinFoldingAnimation from '@/components/modules/ProteinFoldingAnimation';
import CrisprAnimation from '@/components/modules/CrisprAnimation';
import { Toaster, toast } from '@/components/ui/sonner';
const ModuleContent = ({ step, onQuizComplete }: { step: ModuleStep; onQuizComplete: (score: number) => void; }) => {
  switch (step.type) {
    case 'text':
      return (
        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 animate-fade-in">
          <h2 className="font-display text-4xl mb-4">{step.title}</h2>
          <p className="text-xl leading-relaxed">{step.content}</p>
        </div>
      );
    case 'dna-builder':
      return (
        <div className="w-full animate-fade-in">
          <h2 className="font-display text-4xl text-center mb-8">{step.title}</h2>
          <DnaBuilder />
        </div>
      );
    case '3d-viewer':
      return (
        <div className="h-[60vh] w-full rounded-2xl overflow-hidden border-2 border-border bg-muted/20 relative animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl text-center my-8 absolute w-full z-10 pointer-events-none">{step.title}</h2>
          <MoleculeViewer />
        </div>
      );
    case 'quiz':
      return step.quiz ? (
        <div className="animate-fade-in">
          <Quiz questions={step.quiz} onComplete={onQuizComplete} />
        </div>
      ) : (
        <div>Quiz data is missing.</div>
      );
    case 'transcription-animation':
      return (
        <div className="animate-fade-in w-full">
           <h2 className="font-display text-4xl text-center mb-8">{step.title}</h2>
          <TranscriptionAnimation />
        </div>
      );
    case 'translation-animation':
      return (
        <div className="animate-fade-in w-full">
           <h2 className="font-display text-4xl text-center mb-8">{step.title}</h2>
          <TranslationAnimation />
        </div>
      );
    case 'dna-replication-animation':
      return (
        <div className="animate-fade-in w-full">
           <h2 className="font-display text-4xl text-center mb-8">{step.title}</h2>
          <DnaReplicationAnimation />
        </div>
      );
    case 'protein-folding-animation':
      return (
        <div className="animate-fade-in w-full">
           <h2 className="font-display text-4xl text-center mb-8">{step.title}</h2>
          <ProteinFoldingAnimation />
        </div>
      );
    case 'crispr-animation':
      return (
        <div className="animate-fade-in w-full">
           <h2 className="font-display text-4xl text-center mb-8">{step.title}</h2>
          <CrisprAnimation />
        </div>
      );
    default:
      return <div>Unsupported step type</div>;
  }
};
const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!moduleId) return;
    const fetchModule = async () => {
      try {
        setLoading(true);
        const data = await api<Module>(`/api/modules/${moduleId}`);
        setModule(data);
        setCurrentStepIndex(0); // Reset step on module change
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load module.');
      } finally {
        setLoading(false);
      }
    };
    fetchModule();
  }, [moduleId]);
  const handleNext = async () => {
    if (module && currentStepIndex < module.steps.length - 1) {
      try {
        await api('/api/progress/step', {
          method: 'POST',
          body: JSON.stringify({ moduleId, stepIndex: currentStepIndex }),
        });
      } catch (err) {
        toast.error("Could not save progress.");
      }
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  const handleQuizComplete = async (score: number) => {
    if (!moduleId) return;
    try {
      await api('/api/progress/quiz', {
        method: 'POST',
        body: JSON.stringify({ moduleId, score }),
      });
      toast.success(`Quiz score of ${score}% saved!`);
    } catch (err) {
      toast.error("Could not save quiz score.");
    }
  };
  if (loading) {
    return (
      <AppLayout>
        <div className="p-8 max-w-5xl mx-auto space-y-8">
          <Skeleton className="h-12 w-1/4" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-64 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </AppLayout>
    );
  }
  if (error) return <AppLayout><div className="text-center text-red-500 p-8">{error}</div></AppLayout>;
  if (!module) return <AppLayout><div className="text-center p-8">Module not found.</div></AppLayout>;
  const progress = ((currentStepIndex + 1) / module.steps.length) * 100;
  const currentStep = module.steps[currentStepIndex];
  return (
    <AppLayout>
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-8">
              <Button variant="ghost" onClick={() => navigate('/')} className="mb-4 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
              <h1 className="text-5xl font-display">{module.title}</h1>
              <Progress value={progress} className="mt-4 h-3 progress-vibrant-green" />
            </header>
            <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-8 bg-muted/30 rounded-3xl">
              {currentStep && <ModuleContent step={currentStep} onQuizComplete={handleQuizComplete} />}
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 bg-background/80 backdrop-blur-sm border-t p-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Button onClick={handlePrev} disabled={currentStepIndex === 0} size="lg" variant="outline">
              <ArrowLeft className="mr-2 h-5 w-5" /> Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {module.steps.length}
            </div>
            <Button onClick={handleNext} disabled={currentStepIndex === module.steps.length - 1} size="lg">
              Next <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </footer>
      </div>
      <Toaster richColors closeButton />
    </AppLayout>
  );
};
export default ModulePage;