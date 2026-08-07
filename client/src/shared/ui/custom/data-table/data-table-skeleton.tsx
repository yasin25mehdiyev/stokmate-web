import { Skeleton } from "@/shared/ui/core/skeleton";

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
}

const DataTableSkeleton = ({
  columnCount,
  rowCount = 20,
}: DataTableSkeletonProps) => {
  return (
    <div className="animate-in fade-in-0 duration-600 overflow-hidden rounded-xl border border-outline">
      <table className="w-full">
        <thead>
          <tr className="bg-brand-500">
            {Array.from({ length: columnCount }).map((_, index) => (
              <th key={index} className="px-4 py-3">
                <Skeleton className="h-4 w-24 bg-white/20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-wash bg-white">
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-3.5">
                  <Skeleton className="h-4 w-full max-w-[160px]" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { DataTableSkeleton };
