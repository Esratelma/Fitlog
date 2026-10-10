
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Dumbbell, Clock3, Flame } from 'lucide-react';
import { useFitLog } from '@/context/FitLogContext';
import WorkoutRow from '@/components/WorkoutRow';
import SortSelect from '@/components/SortSelect';

export default function MyPlan() {
  const { plan, saved, hydrated } = useFitLog();
  const [tab, setTab] = useState('plan');
  const [sort, setSort] = useState('duration');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'saved') {
      setTab('saved');
    }
  }, []);
  const workouts = tab === 'plan' ? plan : saved;
  // Sort workouts based on the selected option.
  const sortedWorkouts = [...workouts].sort((a, b) => {
    switch (sort) {
      case 'duration':
        return (a.duration ?? 0) - (b.duration ?? 0);
      case 'calories':
        return (a.caloriesBurned ?? 0) - (b.caloriesBurned ?? 0);
      case 'rating':
        return (a.rating ?? 0) - (b.rating ?? 0);
      default:
        return 0;
    }
  });

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );
  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );
  const stats = [
    { label: 'Exercises', value: plan.length, Icon: Dumbbell },
    { label: 'Minutes', value: totalMinutes, Icon: Clock3 },
    { label: 'Calories', value: totalCalories, Icon: Flame },
  ];
  return (
    <div className="container py-16">
      <header className="flex flex-col justify-between gap-6 border-b border-[#293229] pb-10 md:flex-row md:items-end">
        <div>
          <h1 className="display mt-2 text-7xl sm:text-9xl">
            MY PLAN
          </h1>
          <p className="mt-3 text-zinc-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
      </header>

      {/* Today's workout summary */}
      <section className="my-8 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="rounded-3xl border border-[#293229] bg-[#101510] p-6"
          >
            <p className="mt-5 text-xs font-black tracking-widest text-zinc-600">
              {label}
            </p>
            <p className="display mt-1 text-5xl">
              {value}
            </p>
          </div>
        ))}
      </section>

      {/* Switch between today's plan and saved workouts */}
      <div className="mb-6 flex border-b border-[#293229]">
        <button
          type="button"
          onClick={() => setTab('plan')}
          className={`border-b-2 px-5 py-4 text-sm font-black ${
            tab === 'plan'
              ? 'border-[#ccff00] text-[#ccff00]'
              : 'border-transparent text-zinc-500'
          }`}
        >
          TODAY'S PLAN ({plan.length})
        </button>

        <button
          type="button"
          onClick={() => setTab('saved')}
          className={`border-b-2 px-5 py-4 text-sm font-black ${
            tab === 'saved'
              ? 'border-[#ccff00] text-[#ccff00]'
              : 'border-transparent text-zinc-500'
          }`}
        >
          SAVED ({saved.length})
        </button>
      </div>

      {/* Sort By dropdown */}
      <div className="mb-6 flex items-center justify-end gap-3">
        <span className="text-sm font-bold text-zinc-400">
        </span>
        <SortSelect
          value={sort}
          onChange={setSort}
        />
      </div>

      {!hydrated ? (
        <div className="py-16 text-center text-zinc-500">
          Loading your workouts...
        </div>
      ) : workouts.length === 0 ? (
        <div className="rounded-3xl border border-[#293229] bg-[#101510] px-6 py-16 text-center">
          <h2 className="display mt-5 text-4xl">
            NOTHING HERE YET
          </h2>
          <p className="mt-3 text-zinc-500">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/#library"
            className="mt-6 inline-flex rounded-xl bg-[#ccff00] px-5 py-3 font-black text-black transition hover:bg-[#b8e600]"
          >
            Go to Workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedWorkouts.map((workout) => (
            <WorkoutRow
              key={workout.id}
              workout={workout}
              mode={tab}
            />
          ))}
        </div>
      )}
    </div>
  );
}
