import { Badge } from '@/components/ui/badge';
import { StudentHistorySummary } from '@/types/student';
import { formatCurrency } from '@/utils/format-currency';

export default function HistorySummary({
  total_fine,
  total,
}: StudentHistorySummary) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Badge
        variant="outline"
        className="gap-1.5 h-6 text-xs text-primary bg-accent hover:text-amber-800 border-primary"
      >
        <span>Total Pinjam : </span>
        <span className="font-semibold">{total}</span>
      </Badge>

      <Badge
        variant="secondary"
        className="gap-1.5 h-6 text-xs text-amber-700 bg-amber-50 hover:text-amber-800 border-amber-200"
      >
        <span>Total Denda : </span>
        <span className="font-semibold">{formatCurrency(total_fine)}</span>
      </Badge>
    </div>
  );
}
