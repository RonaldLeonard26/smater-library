import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface CardKpiProps {
  title: string;
  value: number;
  desc: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function CardKpi(props: CardKpiProps) {
  const { title, value, desc, icon: Icon, iconBg, iconColor } = props;
  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardContent>
        <div className="space-y-4 md:space-y-2">
          <p className="text-xs font-medium truncate text-slate-500">{title}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <div className={`p-2 rounded-xl ${iconBg}`}>
              <Icon className={`size-6 ${iconColor}`} />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}
