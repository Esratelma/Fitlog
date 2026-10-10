
'use client';

import Link from 'next/link';
import { Clock3, Flame, Star, Check, X } from 'lucide-react';

import { useFitLog } from '@/context/FitLogContext';

export default function WorkoutRow({ workout, mode = 'plan' }) {
  const { removeFromPlan, markDone, removeSaved } = useFitLog();

  const isPlanMode = mode === 'plan';

  return (
    <article
      className={`flex flex-col gap-4 rounded-3xl border border-[#293229] bg-[#101510] p-3 sm:flex-row sm:items-center ${
        workout.done ? 'opacity-60' : ''
      }`}
    >
      {/* Workout image */}
      <img
        src={workout.image}
        alt={workout.name}
        className="h-24 w-full rounded-2xl object-cover sm:w-32"
      />

      {/* Workout information */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.slice(0, 2).map((muscle) => (
            <span
              key={muscle}
              className="text-[9px] font-black tracking-widest text-[#ccff00]"
            >
              {muscle.toUpperCase()}
            </span>
          ))}
        </div>

        <h3 className="display mt-1 text-2xl">
          {workout.name.toUpperCase()}
        </h3>

        <p className="truncate text-xs text-zinc-500">
          {workout.equipment}
        </p>

        {/* Workout statistics */}
        <div className="mt-2 flex gap-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock3 size={13} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={13} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={13} />
            {workout.rating}
          </span>
        </div>
      </div>

      {/* Workout actions */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-xl border border-[#3d473d] px-3 py-2 text-[10px] font-black tracking-wider"
        >
          VIEW DETAILS
        </Link>

        {isPlanMode ? (
          <>
            <button
              type="button"
              onClick={() => markDone(workout.id)}
              className="flex items-center gap-1 rounded-xl bg-[#ccff00] px-3 py-2 text-[10px] font-black text-black"
            >
              <Check size={14} />
              {workout.done ? 'DONE' : 'MARK AS DONE'}
            </button>

            <button
              type="button"
              onClick={() => removeFromPlan(workout.id)}
              aria-label={`Remove ${workout.name} from today's plan`}
              className="grid size-9 place-items-center rounded-xl border border-[#3d473d] text-zinc-400 transition hover:text-red-400"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => removeSaved(workout.id)}
            aria-label={`Remove ${workout.name} from saved workouts`}
            className="grid size-9 place-items-center rounded-xl border border-[#3d473d] text-zinc-400 transition hover:text-red-400"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </article>
  );
}