
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6">
      <div className="text-center">
        <p className="mb-3 text-sm font-bold tracking-[.3em] text-[#ccff00]">
          404 — PAGE NOT FOUND
        </p>
        <h1 className="display text-7xl sm:text-9xl">
          WRONG TURN
        </h1>
        <p className="mx-auto mt-5 max-w-md text-zinc-400">
          Looks like this page took a wrong turn. No worries —
          your next workout is just one click away.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#ccff00] px-6 py-3 font-black text-black"
        >
          BACK TO WORKOUTS
        </Link>
      </div>
    </div>
  );
}