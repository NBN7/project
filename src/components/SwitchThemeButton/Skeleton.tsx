import { Skeleton as SkeletonUI } from "@nextui-org/skeleton";

export const Skeleton = () => {
  return (
    <div className="px-2">
      <SkeletonUI className="flex rounded-full w-[20px] h-[20px]" />
    </div>
  );
};
