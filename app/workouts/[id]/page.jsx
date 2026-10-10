import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getWorkout } from '@/lib/api';
import DetailActions from '@/components/DetailActions';

export default async function WorkoutDetails({ params }) {
  const { id } = await params;
  let workout;
  try {
    workout = await getWorkout(id);
  } catch {
    workout = null;
  }
  if (!workout) {
    notFound();
  }
  const workoutStats = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', workout.sets],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.caloriesBurned} kcal`],
    ['Rating', workout.rating],
  ];
  return (
    <div className="container py-10">
      <Link
        href="/#library"
        className="mb-8 inline-flex items-center gap-2 text-xs font-black tracking-widest text-zinc-500 transition hover:text-white"
      >
        <ArrowLeft size={15} />
        BACK TO LIBRARY
      </Link>

      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        {/* Workout image */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[2rem] border border-[#293229] bg-[#101510] p-3">
            <img
              src={workout.image}
              alt={workout.name}
              className="aspect-[.9] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>

        {/* Workout information */}
        <div className="py-2">
          <h1 className="display text-5xl tracking-wide sm:text-6xl lg:text-7xl">
            {workout.name.toUpperCase()}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            {workout.description}
          </p>

          {/* Target muscle groups */}
          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3.5 py-1 text-[10px] font-extrabold tracking-wider text-black"
              >
                {muscle.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Workout statistics / Key Specs Panel */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-[#121619]">
            {workoutStats.map(([label, value], idx) => (
              <div
                key={label}
                className={`flex items-center justify-between px-5 py-3.5 text-xs ${
                  idx !== workoutStats.length - 1 ? 'border-b border-zinc-800/80' : ''
                }`}
              >
                <span className="font-extrabold tracking-wider text-zinc-500">
                  {label}
                </span>
                <span className="font-bold text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Step-by-step instructions */}
          <section className="mt-10">
            <h2 className="text-xs font-black tracking-[0.25em] text-[#ccff00]">
              INSTRUCTIONS
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className="flex items-start gap-3 text-xs leading-5 text-zinc-300 sm:text-sm"
                >
                  <span className="font-bold text-[#ccff00]">
                    {index + 1}.
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Save and workout actions */}
          <div className="mt-8">
            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}