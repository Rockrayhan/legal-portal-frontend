import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <div>
      <div className="space-y-3 w-[500px] ">
        <Skeleton className="h-8 w-full bg-gray-300 shadow" />
        <Skeleton className="h-4 w-full bg-gray-300 shadow" />
        <Skeleton className="h-4 w-3/4  bg-gray-300 shadow" />
        <Skeleton className="h-4 w-1/2  bg-gray-300 shadow" />
      </div>
    </div>
  );
};

export default SkeletonCard;
