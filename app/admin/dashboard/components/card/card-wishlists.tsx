import { Badge } from '@/components/ui/badge';

interface CardWishlistProps {
  title: string;
  author: string;
  category: string;
  availableCopies: number;
  count: number;
}
export default function CardWishlist(props: CardWishlistProps) {
  const { title, author, category, availableCopies, count } = props;
  return (
    <div className="flex space-y-4  items-center p-3 justify-between gap-4 bg-slate-50/80 hover:bg-slate-100/80 transition-colors rounded-lg">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">
            {title}
          </h4>
          <Badge variant="outline" className="text-[10px] py-0 shrink-0">
            {category}
          </Badge>
        </div>
        <p className="text-xs text-slate-500">{author}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-xs font-bold text-rose-400 block">
          {count} Wishlist
        </span>
        <span
          className={`text-[11px] font-medium block ${
            availableCopies === 0
              ? 'text-red-500 font-semibold'
              : 'text-primary'
          }`}
        >
          {availableCopies === 0
            ? 'Stok Habis'
            : `Sisa ${availableCopies} Stok`}
        </span>
      </div>
    </div>
  );
}
