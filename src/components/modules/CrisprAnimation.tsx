import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const DnaSegment = ({ sequence, target }: { sequence: string; target: string }) => {
  const segments = sequence.split(target);
  return (
    <div className="flex items-center font-mono text-lg tracking-widest p-2 bg-background rounded-lg shadow-inner">
      <span>{segments[0]}</span>
      <span className="text-white bg-red-500 px-1 rounded">{target}</span>
      <span>{segments[1]}</span>
    </div>
  );
};
const CrisprAnimation = () => {
  const [step, setStep] = useState(0); // 0: initial, 1: targeting, 2: cutting, 3: cut
  const DNA_SEQUENCE = "AGCTAGCTACGTACGTAGCTAGCT";
  const TARGET_SEQUENCE = "TACGTA";
  const handleStart = () => setStep(1);
  const handleReset = () => setStep(0);
  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
      }, 1500); // Wait 1.5s in the "cutting" state before showing the cut
      return () => clearTimeout(timer);
    }
  }, [step]);
  const cas9Variants = {
    initial: { y: -100, opacity: 0, scale: 0.8 },
    targeting: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
    cutting: { scale: 1.1, transition: { yoyo: Infinity, duration: 0.3 } },
    cut: { y: 100, opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
  };
  const dnaVariants = {
    initial: { scale: 1 },
    cut: { scale: 1.05 },
  };
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-muted/30 rounded-2xl flex flex-col items-center font-sans">
      <div className="w-full h-64 relative flex flex-col items-center justify-center space-y-8 mb-6">
        {/* CRISPR-Cas9 System */}
        <motion.div
          className="w-48 h-24 bg-brand-primary/90 rounded-xl shadow-lg flex flex-col items-center justify-center text-white p-2 z-10"
          variants={cas9Variants}
          initial="initial"
          animate={step === 1 ? 'targeting' : step === 2 ? 'cutting' : step === 3 ? 'cut' : 'initial'}
          onAnimationComplete={() => step === 1 && setStep(2)}
        >
          <div className="font-bold">CRISPR-Cas9</div>
          <div className="text-xs mt-1 bg-white/20 px-2 py-0.5 rounded">gRNA: {TARGET_SEQUENCE}</div>
        </motion.div>
        {/* DNA Strand */}
        <motion.div
          className="relative"
          variants={dnaVariants}
          animate={step === 3 ? 'cut' : 'initial'}
        >
          <DnaSegment sequence={DNA_SEQUENCE} target={TARGET_SEQUENCE} />
          {step === 3 && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
            >
              <Scissors className="w-8 h-8 transform -rotate-45" />
            </motion.div>
          )}
        </motion.div>
      </div>
      <div className="text-center mb-6 h-12">
        <p className="text-muted-foreground">
          {step === 0 && 'The CRISPR system is ready to find its target.'}
          {step === 1 && 'The guide RNA is searching for the matching DNA sequence...'}
          {step === 2 && 'Target found! The Cas9 enzyme is preparing to cut the DNA.'}
          {step === 3 && 'Cut successful! The DNA has been precisely edited.'}
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={handleStart} disabled={step > 0} size="lg">
          <Play className="mr-2 h-4 w-4" /> Begin Gene Editing
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
};
export default CrisprAnimation;