import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background skeleton */}
      <Skeleton className="absolute inset-0" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-16 md:h-24 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Skeleton className="h-14 w-48" />
          <Skeleton className="h-14 w-48" />
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
