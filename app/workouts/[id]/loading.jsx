
export default function Loading() {
  return (
    <div className="container py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Workout image placeholder */}
        <div className="aspect-square animate-pulse rounded-[2rem] bg-[#151b16]" />
        {/* Workout details placeholders */}
        <div className="space-y-5">
          {/* Muscle group label */}
          <div className="h-6 w-32 animate-pulse rounded bg-[#151b16]" />
          {/* Workout title */}
          <div className="h-24 w-4/5 animate-pulse rounded bg-[#151b16]" />
          {/* Workout description */}
          <div className="h-20 w-full animate-pulse rounded bg-[#151b16]" />
        </div>
      </div>
    </div>
  );
}
