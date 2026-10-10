
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDownRight, RefreshCw } from 'lucide-react';
import { getWorkouts } from '@/lib/api';
import WorkoutCard from '@/components/WorkoutCard';
import LoadingGrid from '@/components/LoadingGrid';

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = () => {
    setLoading(true);
    setError('');
    getWorkouts()
      .then(setWorkouts)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <section className="bg-[#0b0e0f] py-12 md:py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-900/50 bg-gradient-to-br from-[#17201b] via-[#121619] to-[#101510] p-8 shadow-[0_0_50px_rgba(204,255,0,0.05)] md:p-12 lg:p-16">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              {/* Hero Content */}
              <div className="z-10 lg:col-span-7">
                <p className="mb-4 text-xs font-black tracking-[0.25em] text-[#ccff00]">
                  WORKOUT LIBRARY
                </p>
                <h1 className="display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  TRAIN WITH INTENT.
                  <br />
                  LOG EVERY SET.
                </h1>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
                  FitLog is a dark, no-nonsense gym companion: pick a lift,
                  lock it into today's plan, and watch the week's work add up.
                </p>
                <a
                  href="#library"
                  className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#ccff00] px-6 py-3.5 text-xs font-extrabold tracking-wider text-black transition hover:bg-white"
                >
                  BROWSE WORKOUTS
                </a>
              </div>

              {/* Hero Image */}
              <div className="relative flex min-h-[280px] items-center justify-center sm:min-h-[360px] lg:col-span-5">
                <Image
                  src="/hero-workout.png"
                  alt="FitLog workout model"
                  width={450}
                  height={450}
                  priority
                  className="h-auto max-h-[380px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workout Library */}
      <section id="library" className="container py-20 md:py-24">
        <div className="mb-10">
          <h2 className="display mt-2 text-5xl text-white sm:text-7xl">
            THE LIBRARY
          </h2>
          <p className="mt-3 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        {/* Loading State */}
        {loading ? (
          <>
            <p className="pulse mb-5 text-xs font-bold tracking-widest text-[#ccff00]">
              LOADING WORKOUTS…
            </p>
            <LoadingGrid />
          </>
        ) : error ? (
          /* Error State */
          <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-8">
            <p className="font-bold text-red-300">
              Unable to load workouts.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {error}
            </p>
            <button
              onClick={load}
              className="mt-5 flex items-center gap-2 rounded-xl bg-[#ccff00] px-4 py-3 text-xs font-black text-black transition hover:bg-white"
            >
              <RefreshCw size={16} className="text-emerald-700" />
              TRY AGAIN
            </button>
          </div>
        ) : workouts.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-zinc-800 bg-[#121619] p-8 text-center">
            <p className="font-bold text-white">
              No workouts found.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Try again later to load the workout library.
            </p>
            <button
              onClick={load}
              className="mt-5 rounded-xl bg-[#ccff00] px-5 py-3 text-xs font-black text-black"
            >
              RELOAD WORKOUTS
            </button>
          </div>
        ) : (
          /* Three Columns on Desktop */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.slice(0, 12).map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
