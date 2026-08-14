import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

export default function CardPopuler() {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-slate-700">{title}</span>
        <span className="text-xs font-semibold text-slate-500">
          {totalLoans}x dipinjam
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
