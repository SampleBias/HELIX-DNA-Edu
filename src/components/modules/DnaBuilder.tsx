import { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
type Base = 'A' | 'T' | 'C' | 'G';
const PAIRS: Record<Base, Base> = { A: 'T', T: 'A', C: 'G', G: 'C' };
const BaseItem = ({ base, isDragging, ...props }: { base: Base; isDragging?: boolean; [key: string]: any }) => {
  const color = {
    A: 'bg-green-500 hover:bg-green-600',
    T: 'bg-red-500 hover:bg-red-600',
    C: 'bg-blue-500 hover:bg-blue-600',
    G: 'bg-yellow-500 hover:bg-yellow-600',
  }[base];
  return (
    <div
      {...props}
      className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-md transition-all",
        color,
        isDragging ? 'opacity-50 scale-110 shadow-lg' : 'cursor-grab active:cursor-grabbing'
      )}
    >
      {base}
    </div>
  );
};
const DraggableBase = ({ id, base }: { id: string; base: Base }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <BaseItem base={base} isDragging={isDragging} />
    </div>
  );
};
const DroppableSlot = ({ id, base, isOver }: { id: string; base: Base | null; isOver: boolean }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center transition-colors",
        isOver && "bg-brand-primary/20 border-brand-primary"
      )}
    >
      {base && <BaseItem base={base} />}
    </div>
  );
};
const DnaBuilder = () => {
  const initialStrand1: Base[] = ['A', 'C', 'G', 'T', 'A', 'G'];
  const initialAvailableBases: { id: string; base: Base }[] = [
    { id: 'src-0', base: 'T' }, { id: 'src-1', base: 'G' }, { id: 'src-2', base: 'C' },
    { id: 'src-3', base: 'A' }, { id: 'src-4', base: 'T' }, { id: 'src-5', base: 'C' },
  ];
  const [strand1] = useState<Base[]>(initialStrand1);
  const [strand2, setStrand2] = useState<(Base | null)[]>(Array(6).fill(null));
  const [availableBases, setAvailableBases] = useState(initialAvailableBases);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    const isSource = activeId.startsWith('src-');
    const isTarget = overId.startsWith('target-');
    if (isSource && isTarget) {
      const sourceIndex = availableBases.findIndex(b => b.id === activeId);
      const targetIndex = parseInt(overId.split('-')[1], 10);
      if (sourceIndex > -1 && strand2[targetIndex] === null) {
        const baseToMove = availableBases[sourceIndex];
        setStrand2(prev => {
          const newStrand = [...prev];
          newStrand[targetIndex] = baseToMove.base;
          return newStrand;
        });
        setAvailableBases(prev => prev.filter(b => b.id !== activeId));
      }
    }
  };
  const checkStrand = () => {
    const isComplete = strand2.every(base => base !== null);
    if (!isComplete) {
      toast.warning("Please complete the strand before checking.");
      return;
    }
    const isCorrect = strand1.every((base, i) => strand2[i] === PAIRS[base]);
    if (isCorrect) {
      toast.success("Correct! Well done, biologist!");
    } else {
      toast.error("Not quite right. Double-check your base pairs!");
    }
  };
  const reset = () => {
    setStrand2(Array(6).fill(null));
    setAvailableBases(initialAvailableBases);
    toast.info("Builder has been reset.");
  };
  const sensors = useSensors(useSensor(PointerSensor));
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center space-y-8 p-4 sm:p-8 bg-background/50 rounded-2xl w-full">
        <div className="flex justify-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="font-bold text-lg text-muted-foreground">Template</h3>
            {strand1.map((base, i) => <BaseItem key={`strand1-${i}`} base={base} />)}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h3 className="font-bold text-lg text-foreground">Your Strand</h3>
            {strand2.map((base, i) => (
              <DroppableSlot key={`target-${i}`} id={`target-${i}`} base={base} isOver={false} />
            ))}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 w-full max-w-md">
          <h3 className="font-bold text-lg text-center mb-4">Available Bases</h3>
          <div className="flex gap-2 sm:gap-4 justify-center flex-wrap min-h-[5rem]">
            <AnimatePresence>
              {availableBases.map(({ id, base }) => (
                <motion.div key={id} layout exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <DraggableBase id={id} base={base} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={checkStrand} size="lg" className="bg-brand-primary hover:bg-brand-primary/90">Check My Work</Button>
          <Button onClick={reset} size="lg" variant="outline">Reset</Button>
        </div>
      </div>
    </DndContext>
  );
};
export default DnaBuilder;