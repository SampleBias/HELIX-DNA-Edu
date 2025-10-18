import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const DnaReplicationAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const handlePlay = () => setIsAnimating(true);
  const handleReset = () => setIsAnimating(false);
  const duration = 10;
  const parent = {
    animate: { transition: { staggerChildren: 0.2 } },
    initial: {},
  };
  const base = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-muted/30 rounded-2xl flex flex-col items-center font-sans">
      <div className="w-full h-96 relative overflow-hidden border-b-2 border-dashed border-foreground/20 mb-6">
        {/* Original DNA */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-12"
          initial={{ x: 0 }}
          animate={{ x: isAnimating ? '-50%' : 0 }}
          transition={{ duration: duration, ease: 'linear' }}
        >
          <div className="w-[200%] h-full flex items-center">
            <div className="w-1/2 h-1 bg-blue-500" />
            <div className="w-1/2 h-1 bg-blue-300" />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 w-[200%] flex justify-between">
            {'ATGCGTACGTATGCGTACGT'.repeat(4).split('').map((b, i) => (
              <div key={i} className="w-1 h-4 bg-gray-400" />
            ))}
          </div>
        </motion.div>
        {/* Helicase */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-16 h-16 bg-brand-accent rounded-full z-20 flex items-center justify-center text-white font-bold text-xs shadow-lg"
          initial={{ left: '10%' }}
          animate={{ left: isAnimating ? '80%' : '10%' }}
          transition={{ duration: duration, ease: 'linear' }}
        >
          Helicase
        </motion.div>
        {/* Separated Strands */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-blue-500"
          initial={{ width: '10%' }}
          animate={{ width: isAnimating ? '80%' : '10%' }}
          transition={{ duration: duration, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-blue-300"
          initial={{ y: 0, width: '10%' }}
          animate={{ y: isAnimating ? -20 : 0, width: isAnimating ? '80%' : '10%' }}
          transition={{ duration: duration, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-blue-300"
          initial={{ y: 0, width: '10%' }}
          animate={{ y: isAnimating ? 20 : 0, width: isAnimating ? '80%' : '10%' }}
          transition={{ duration: duration, ease: 'linear' }}
        />
        {/* DNA Polymerase and new strands */}
        {isAnimating && (
          <>
            {/* Leading Strand */}
            <motion.div
              className="absolute top-1/2 w-10 h-10 bg-brand-secondary rounded-full z-10 flex items-center justify-center text-white text-xs"
              initial={{ left: '10%', y: -20 }}
              animate={{ left: '78%' }}
              transition={{ duration: duration * 0.9, delay: duration * 0.1, ease: 'linear' }}
            >
              Poly
            </motion.div>
            <motion.div
              className="absolute top-1/2 h-1 bg-red-400"
              initial={{ left: '10%', width: 0, y: -20 }}
              animate={{ width: '68%' }}
              transition={{ duration: duration * 0.9, delay: duration * 0.1, ease: 'linear' }}
            />
            {/* Lagging Strand */}
            <motion.div
              className="absolute top-1/2 w-10 h-10 bg-brand-secondary rounded-full z-10 flex items-center justify-center text-white text-xs"
              initial={{ left: '10%', y: 20 }}
              animate={{ left: '78%' }}
              transition={{ duration: duration * 0.9, delay: duration * 0.1, ease: 'linear' }}
            >
              Poly
            </motion.div>
            <motion.div
              className="absolute top-1/2 h-1 bg-red-400"
              initial={{ left: '10%', width: 0, y: 20 }}
              animate={{ width: '68%' }}
              transition={{ duration: duration * 0.9, delay: duration * 0.1, ease: 'linear' }}
            />
          </>
        )}
      </div>
      <div className="flex gap-4">
        <Button onClick={handlePlay} disabled={isAnimating} size="lg">
          <Play className="mr-2 h-4 w-4" /> Start Replication
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
};
export default DnaReplicationAnimation;