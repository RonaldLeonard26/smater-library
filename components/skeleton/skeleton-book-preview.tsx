import { Skeleton } from '@/components/ui/skeleton';
export default function BookPreviewCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-3">
      {' '}
      {/* Book Information */}{' '}
      <div className="flex items-start gap-4">
        {' '}
        {/* Cover Skeleton */}{' '}
        <Skeleton className="h-28 w-20 shrink-0 rounded-md" />{' '}
        {/* Detail Skeleton */}{' '}
        <div className="min-w-0 flex-1 space-y-2">
          {' '}
          {/* Title */}{' '}
          <div className="space-y-1.5">
            {' '}
            <Skeleton className="h-4 w-[90%]" />{' '}
            <Skeleton className="h-4 w-[65%]" />{' '}
          </div>{' '}
          {/* Authors */}{' '}
          <div className="flex items-start gap-2">
            {' '}
            <Skeleton className="h-3 w-12 shrink-0" />{' '}
            <div className="flex flex-wrap gap-2">
              {' '}
              <Skeleton className="h-3 w-20" />{' '}
              <Skeleton className="h-3 w-24" />{' '}
            </div>{' '}
          </div>{' '}
          {/* Category */}{' '}
          <div className="flex items-center gap-2">
            {' '}
            <Skeleton className="h-3 w-14" />{' '}
            <Skeleton className="h-5 w-20 rounded-full" />{' '}
          </div>{' '}
          {/* Barcode */}{' '}
          <div className="flex items-center gap-2">
            {' '}
            <Skeleton className="h-3 w-14 shrink-0" />{' '}
            <Skeleton className="h-5 w-32 rounded" />{' '}
          </div>{' '}
          {/* Available Stock */}{' '}
          <div className="flex items-center gap-2">
            {' '}
            <Skeleton className="h-3 w-8" />{' '}
            <Skeleton className="h-5 w-28 rounded-full" />{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
      {/* Button Skeleton */}{' '}
      <Skeleton className="h-10 w-full rounded-md" />{' '}
    </div>
  );
}
