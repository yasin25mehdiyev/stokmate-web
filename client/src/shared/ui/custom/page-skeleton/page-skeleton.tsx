import { Skeleton } from "@/shared/ui/core/skeleton";

const className =
  "rounded-2xl bg-white p-6 shadow-[0px_2px_2px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.08)]";

const PageSkeleton = () => {
  return (
    <div className="animate-in fade-in-0 duration-500 flex flex-col gap-4">
      <div className={className}>
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className={className}>
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
        <div className={className}>
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
      <div className={className}>
        <Skeleton className="h-22 w-full rounded-xl" />
      </div>
      <div className={className}>
        <Skeleton className="h-22 w-full rounded-xl" />
      </div>
      <div className={className}>
        <Skeleton className="h-22 w-full rounded-xl" />
      </div>
    </div>
  );
};

export { PageSkeleton };
