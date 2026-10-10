
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell } from 'lucide-react';
import { useFitLog } from '@/context/FitLogContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const isWorkoutPage = pathname === '/';
  const isPlanPage = pathname === '/my-plan';
  const getLinkStyle = (isActive) => {
    const baseStyle =
      'rounded-full px-4 py-2 text-xs font-black tracking-widest transition-colors';
    return isActive
      ? `${baseStyle} bg-[#ccff00] text-black`
      : `${baseStyle} text-zinc-400 hover:text-white`;
  };

  return (
    <>
      <header className="navbar">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          {/* Brand logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-black tracking-wider"
          >
            <span className="logo-icon grid size-10 place-items-center rounded-xl text-[#ccff00]">
              <Dumbbell size={21} />
            </span>
            <span className="hidden sm:inline">FITLOG</span>
          </Link>

          {/* Main navigation */}
          <nav className="flex items-center gap-1 rounded-full border border-[#252d26] bg-[#101510] p-1">
            <Link
              href="/#library"
              className={getLinkStyle(isWorkoutPage)}
            >
              WORKOUTS
            </Link>
            <Link
              href="/my-plan"
              className={getLinkStyle(isPlanPage)}
            >
              MY PLAN
            </Link>
          </nav>
          {/* Plan and saved counters */}
          <div className="flex items-center gap-2">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-black text-[#ccff00] transition-opacity hover:opacity-80"
            >
              PLAN
              <b className="grid size-5 place-items-center rounded-full bg-[#ccff00] text-black">
                {plan.length}
              </b>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className="rounded-full border border-[#687168] px-3 py-2 text-[11px] font-black transition-colors hover:border-[#ccff00]"
            >
              SAVED <b>{saved.length}</b>
            </Link>
          </div>
        </div>
      </header>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 40;
          border-bottom: 1px solid #252d26;
          background: rgba(8, 11, 9, 0.95);
          backdrop-filter: blur(16px);
        }
        .logo-icon :global(svg) {
          transform: scaleX(-1);
        }
      `}</style>
    </>
  );
}
