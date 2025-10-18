import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
const DnaBase = ({ base, y }: { base: string; y: number }) => {
  const colors: { [key: string]: string } = { A: '#22c55e', T: '#ef4444', C: '#3b82f6', G: '#f59e0b' };
  return <div style={{ backgroundColor: colors[base], top: `${y}px` }} className="absolute left-0 w-1/2 h-6 rounded-r-md" />;
};
const RnaBase = ({ base, y }: { base: string; y: number }) => {
  const colors: { [key: string]: string } = { A: '#22c55e', U: '#a855f7', C: '#3b82f6', G: '#f59e0b' };
  return <div style={{ backgroundColor: colors[base], top: `${y}px` }} className="absolute right-0 w-1/2 h-6 rounded-l-md" />;
};
const TranscriptionAnimation = () => {
  const [animationState, setAnimationState] = useState<'paused' | 'playing' | 'initial'>('initial');
  const dnaTemplate = "ATGCGCATTG";
  const rnaComplement = "UACGCGUAAC";
  const handlePlay = () => setAnimationState('playing');
  const handlePause = () => setAnimationState('paused');
  const handleReset = () => setAnimationState('initial');
  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-muted/30 rounded-2xl flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Transcription Process</h2>
      <div className="relative w-48 h-80 bg-background rounded-lg shadow-inner overflow-hidden">
        {/* DNA Strand */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gray-300" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gray-300 transform rotate-6" />
        {/* RNA Polymerase */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-24 h-16 bg-brand-secondary/80 rounded-full z-10 flex items-center justify-center text-white font-bold text-sm"
          initial={{ y: -64 }}
          animate={{ y: animationState === 'playing' ? 320 : (animationState === 'paused' ? 'var(--y)' : -64) }}
          transition={{ duration: 10, ease: 'linear' }}
        >
          RNA Polymerase
        </motion.div>
        {/* mRNA Strand */}
        <motion.div
          className="absolute top-0 right-4 w-10 h-full overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: animationState === 'playing' ? '100%' : (animationState === 'paused' ? 'var(--height)' : 0) }}
          transition={{ duration: 10, ease: 'linear' }}
        >
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-400" />
            {rnaComplement.split('').map((base, i) => (
              <RnaBase key={i} base={base} y={i * 30 + 10} />
            ))}
          </div>
        </motion.div>
      </div>
      <div className="flex gap-4 mt-6">
        <Button onClick={handlePlay} disabled={animationState === 'playing'}><Play className="mr-2 h-4 w-4" /> Play</Button>
        <Button onClick={handlePause} disabled={animationState !== 'playing'}><Pause className="mr-2 h-4 w-4" /> Pause</Button>
        <Button onClick={handleReset} variant="outline"><RotateCcw className="mr-2 h-4 w-4" /> Reset</Button>
      </div>
    </div>
  );
};
export default TranscriptionAnimation;