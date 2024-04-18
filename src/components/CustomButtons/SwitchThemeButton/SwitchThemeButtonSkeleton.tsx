import { Skeleton } from "@/components/ui/skeleton";

export const SwitchThemeButtonSkeleton = () => {
  return (
    <div className="px-2">
      <Skeleton className="flex rounded-full w-[20px] h-[20px]" />
    </div>
  );
};
