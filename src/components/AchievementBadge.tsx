import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Achievement } from '@shared/types';
interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
}
const AchievementBadge = ({ achievement, isUnlocked }: AchievementBadgeProps) => {
  const Icon = (LucideIcons as any)[achievement.icon] || LucideIcons.Award;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={cn(
              "text-center p-4 transition-all duration-300 ease-in-out",
              isUnlocked
                ? "bg-brand-secondary/10 border-brand-secondary"
                : "bg-muted/50 filter grayscale opacity-60"
            )}
          >
            <CardHeader className="p-0 items-center">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-2",
                  isUnlocked ? "bg-brand-secondary/20 text-brand-secondary" : "bg-muted-foreground/20 text-muted-foreground"
                )}
              >
                <Icon className="w-8 h-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="text-base font-bold">{achievement.title}</CardTitle>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{achievement.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default AchievementBadge;