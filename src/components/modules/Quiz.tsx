import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@shared/types';
interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}
const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);
  const handleAnswerSelect = (choiceIndex: number) => {
    if (isFinished) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = choiceIndex;
    setSelectedAnswers(newAnswers);
  };
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = selectedAnswers.reduce((total, answer, index) => {
        if (answer !== null && questions[index].choices[answer].isCorrect) {
          return total + 1;
        }
        return total;
      }, 0);
      const finalScorePercentage = Math.round((finalScore / questions.length) * 100);
      onComplete(finalScorePercentage);
      setIsFinished(true);
    }
  };
  const score = selectedAnswers.reduce((total, answer, index) => {
    if (answer !== null && questions[index].choices[answer].isCorrect) {
      return total + 1;
    }
    return total;
  }, 0);
  const scorePercentage = Math.round((score / questions.length) * 100);
  if (isFinished) {
    return (
      <Card className="w-full max-w-2xl text-center p-8 animate-fade-in">
        <CardHeader>
          <div className="mx-auto bg-brand-secondary/20 text-brand-secondary p-4 rounded-full w-fit mb-4">
            <Award className="w-12 h-12" />
          </div>
          <CardTitle className="text-4xl font-display">Quiz Complete!</CardTitle>
          <CardDescription className="text-xl">You scored</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-7xl font-bold text-brand-secondary">{scorePercentage}%</p>
          <p className="text-muted-foreground mt-2">({score} out of {questions.length} correct)</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button size="lg" onClick={() => { setIsFinished(false); setCurrentQuestionIndex(0); setSelectedAnswers(Array(questions.length).fill(null)); }}>
            Try Again
          </Button>
          <div className="mt-6 w-full text-left space-y-4">
            <h3 className="font-bold text-lg">Review:</h3>
            {questions.map((q, i) => (
              <div key={i} className="p-3 bg-muted/50 rounded-lg">
                <p className="font-semibold">{q.question}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">{q.explanation}</p>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    );
  }
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Knowledge Check</CardTitle>
        <Progress value={progress} className="mt-2 h-2" />
      </CardHeader>
      <CardContent className="p-6 min-h-[20rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.choices.map((choice, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={cn(
                    "w-full justify-start h-auto py-3 text-left",
                    selectedAnswers[currentQuestionIndex] === index && "ring-2 ring-brand-primary"
                  )}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {choice.text}
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestionIndex] === null}
          className="w-full"
          size="lg"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default Quiz;