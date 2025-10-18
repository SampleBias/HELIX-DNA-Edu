import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
const AminoAcid = ({ i, isFolded }: { i: number; isFolded: boolean }) => {
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7'];
  const color = colors[i % colors.length];
  const foldedStyle = {
    x: Math.sin(i * 0.8) * 60 + (i % 3) * 20,
    y: Math.cos(i * 0.5) * 50 + (i % 4) * 15,
    scale: 1.2,
    zIndex: i,
  };
  const unfoldedStyle = {
    x: i * 20 - 100,
    y: 0,
    scale: 1,
    zIndex: i,
  };
  return (
    <motion.div
      className="w-5 h-5 rounded-full absolute shadow-md"
      style={{ backgroundColor: color }}
      initial={unfoldedStyle}
      animate={isFolded ? foldedStyle : unfoldedStyle}
      transition={{ type: 'spring', stiffness: 50, damping: 10, delay: i * 0.05 }}
    />
  );
};
const ProteinFoldingAnimation = () => {
  const [isFolded, setIsFolded] = useState(false);
  const handleFold = () => setIsFolded(true);
  const handleReset = () => setIsFolded(false);
  const aminoAcidCount = 20;
  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-muted/30 rounded-2xl flex flex-col items-center font-sans">
      <div className="w-full h-64 relative flex items-center justify-center mb-6">
        {Array.from({ length: aminoAcidCount }).map((_, i) => (
          <AminoAcid key={i} i={i} isFolded={isFolded} />
        ))}
      </div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">{isFolded ? 'Folded Protein' : 'Polypeptide Chain'}</h3>
        <p className="text-muted-foreground">
          {isFolded
            ? 'The chain folds into a specific 3D structure to become functional.'
            : 'A linear sequence of amino acids.'}
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={handleFold} disabled={isFolded} size="lg" className="bg-brand-accent hover:bg-brand-accent/90">
          <Play className="mr-2 h-4 w-4" /> Fold Protein
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
};
export default ProteinFoldingAnimation;