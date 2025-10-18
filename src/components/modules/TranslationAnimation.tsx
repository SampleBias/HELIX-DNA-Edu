import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const CODON_MAP: { [key: string]: string } = {
  AUG: 'Met', GCG: 'Ala', UAC: 'Tyr', AAC: 'Asn',
  UAA: 'Stop',
};
const MRNA_SEQUENCE = ['AUG', 'GCG', 'UAC', 'AAC', 'UAA'];
const AMINO_ACIDS = MRNA_SEQUENCE.map(codon => CODON_MAP[codon]);
const TranslationAnimation = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleNext = () => {
    if (step < MRNA_SEQUENCE.length) {
      setStep(s => s + 1);
    }
  };
  const handleReset = () => {
    setStep(0);
    setIsAnimating(false);
  };
  const proteinChain = AMINO_ACIDS.slice(0, step);
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-muted/30 rounded-2xl flex flex-col items-center font-sans">
      <div className="w-full space-y-8">
        {/* Protein Chain */}
        <div className="h-16 flex items-center justify-center space-x-1">
          <AnimatePresence>
            {proteinChain.map((aa, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center"
              >
                <div className="px-3 py-1 bg-brand-accent text-white rounded-full font-bold text-sm shadow-md">
                  {aa}
                </div>
                {aa !== 'Stop' && i < proteinChain.length - 1 && <div className="w-4 h-0.5 bg-foreground/50" />}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Ribosome and mRNA */}
        <div className="relative w-full h-24 flex items-center justify-center">
          {/* mRNA Strand */}
          <div className="absolute w-full h-2 bg-purple-300 rounded-full" />
          <div className="flex items-center justify-center space-x-8 text-lg font-mono tracking-widest">
            {MRNA_SEQUENCE.map((codon, i) => (
              <span key={i} className={cn("transition-colors duration-300", i === step ? "text-brand-primary font-bold" : "text-muted-foreground")}>
                {codon}
              </span>
            ))}
          </div>
          {/* Ribosome */}
          <motion.div
            className="absolute w-40 h-24 bg-brand-secondary/80 rounded-t-full rounded-b-lg flex items-center justify-center text-white font-bold shadow-lg"
            animate={{ x: (step - (MRNA_SEQUENCE.length - 1) / 2) * 104 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            Ribosome
          </motion.div>
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <Button onClick={handleNext} disabled={step >= MRNA_SEQUENCE.length} size="lg">
          <Play className="mr-2 h-4 w-4" /> Next Codon
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
};
export default TranslationAnimation;