import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonTable() {
  return (
    <div className="px-2">
      <div className="flex lg:w-full sm:w-sm rounded-lg p-2 border flex-col gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="flex p-2 gap-4" key={index}>
            <Skeleton className="h-6 flex-1" />
            <Skeleton className="h-6 w-30" />
            <Skeleton className="h-6 w-30" />
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
