import { Skeleton } from "@/components/ui/skeleton";
import CardSkeleton from "./CardSkeleton";

interface PageSkeletonProps {
  variant: "classes" | "equipment" | "trainers" | "membership" | "about" | "contact";
}

const PageSkeleton = ({ variant }: PageSkeletonProps) => {
  const renderHeader = () => (
    <section className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>
    </section>
  );

  switch (variant) {
    case "classes":
      return (
        <div className="min-h-screen bg-background">
          {renderHeader()}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-4 mb-8 justify-center">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CardSkeleton variant="class" count={6} />
              </div>
            </div>
          </section>
        </div>
      );

    case "equipment":
      return (
        <div className="min-h-screen bg-background">
          {renderHeader()}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-4 mb-8 justify-center flex-wrap">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-28 rounded-full" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CardSkeleton variant="equipment" count={6} />
              </div>
            </div>
          </section>
        </div>
      );

    case "trainers":
      return (
        <div className="min-h-screen bg-background">
          {renderHeader()}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <CardSkeleton variant="trainer" count={4} />
            </div>
          </section>
        </div>
      );

    case "membership":
      return (
        <div className="min-h-screen bg-background">
          {renderHeader()}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-8 rounded-2xl bg-card border border-border space-y-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-12 w-32" />
                  <div className="space-y-3">
                    {[...Array(6)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          </section>
        </div>
      );

    case "about":
      return (
        <div className="min-h-screen bg-background">
          {renderHeader()}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-video rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </section>
        </div>
      );

    case "contact":
      return (
        <div className="min-h-screen bg-background">
          {renderHeader()}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-12 w-12 rounded-xl" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border space-y-6">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </section>
        </div>
      );

    default:
      return null;
  }
};

export default PageSkeleton;
