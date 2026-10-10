
import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#252d26] bg-[#050705]">
      <div className="container flex min-h-28 flex-col items-center justify-between gap-5 py-7 text-xs text-zinc-500 sm:flex-row">
        {/* FitLog brand */}
        <div className="flex items-center gap-2 font-black tracking-widest text-white">
          <Dumbbell size={18} className="text-[#ccff00]" />
          <span>FITLOG</span>
        </div>
        {/* Copyright and tagline */}
        <p>
          © 2026 FitLog — Your workout library. Train hard, stay consistent.
        </p>
      </div>
    </footer>
  );
}
