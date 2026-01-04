import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  variant?: "default" | "class" | "equipment" | "trainer" | "testimonial";
  count?: number;
}

const CardSkeleton = ({ variant = "default", count = 1 }: CardSkeletonProps) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "class":
        return (
          <div className="group relative rounded-2xl overflow-hidden bg-card border border-border">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        );

      case "equipment":
        return (
          <div className="group relative rounded-2xl overflow-hidden bg-card border border-border">
            <Skeleton className="aspect-square w-full" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        );

      case "trainer":
        return (
          <div className="group relative rounded-2xl overflow-hidden bg-card border border-border">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        );

      case "testimonial":
        return (
          <div className="p-8 rounded-2xl bg-card border border-border space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5" />
              ))}
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-4 pt-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        );
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default CardSkeleton;
