import { Skeleton } from "@/components/ui/skeleton";
import CardSkeleton from "./CardSkeleton";

interface SectionSkeletonProps {
  variant?: "features" | "classes" | "testimonials" | "stats" | "pricing";
}

const SectionSkeleton = ({ variant = "features" }: SectionSkeletonProps) => {
  switch (variant) {
    case "features":
      return (
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-5 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <CardSkeleton count={4} />
            </div>
          </div>
        </section>
      );

    case "classes":
      return (
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Skeleton className="h-10 w-48 mx-auto" />
              <Skeleton className="h-5 w-80 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CardSkeleton variant="class" count={3} />
            </div>
          </div>
        </section>
      );

    case "testimonials":
      return (
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Skeleton className="h-10 w-56 mx-auto" />
              <Skeleton className="h-5 w-72 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CardSkeleton variant="testimonial" count={3} />
            </div>
          </div>
        </section>
      );

    case "stats":
      return (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <Skeleton className="h-12 w-24 mx-auto" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "pricing":
      return (
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Skeleton className="h-10 w-52 mx-auto" />
              <Skeleton className="h-5 w-80 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-8 rounded-2xl bg-card border border-border space-y-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-12 w-32" />
                  <div className="space-y-3">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default SectionSkeleton;
