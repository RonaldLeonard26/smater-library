import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="rounded-xl aspect-3/2" />
        </div>
      ))}
    </div>
  );
}
