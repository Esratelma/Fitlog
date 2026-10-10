
'use client';

import { ChevronDown } from 'lucide-react';

export default function SortSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-3 text-xs font-black tracking-widest text-zinc-500">
      SORT BY

      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="appearance-none rounded-xl border border-[#394139] bg-[#101510] py-3 pl-4 pr-10 text-xs font-black tracking-wider text-white outline-none"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>

        {/* Custom dropdown arrow */}
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        />
      </span>
    </label>
  );
}
