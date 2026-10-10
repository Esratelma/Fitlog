
import Link from 'next/link';
import { Clock3, Flame, Star, ArrowUpRight } from 'lucide-react';

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group overflow-hidden rounded-3xl border border-[#293229] bg-[#101510] transition duration-300 hover:-translate-y-1 hover:border-[#64705f] hover:bg-[#131a14]"
    >
      <div className="relative aspect-[1.25] overflow-hidden bg-[#1b211b]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101510] via-transparent to-transparent" />
        {/* View details icon */}
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-[#ccff00] text-black opacity-0 transition group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </div>

      {/* Workout information */}
      <div className="p-5">
        {/* Category pills */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 px-2.5 py-1 text-[9px] font-black tracking-widest text-[#ccff00]"
            >
              {muscle.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Workout name */}
        <h3 className="display text-2xl leading-none">
          {workout.name.toUpperCase()}
        </h3>

        {/* Equipment */}
        <p className="mt-2 truncate text-xs text-zinc-500">
          {workout.equipment}
        </p>

        {/* Workout statistics */}
        <div className="mt-5 flex items-center gap-4 border-t border-[#293229] pt-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock3 size={14} className="text-[#ccff00]" />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={14} className="text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={14} className="text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
