"use client";

import {
  Bell,
  Search,
  Sparkles,
} from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#080b14]/80 px-8 backdrop-blur-xl">
      
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 md:flex">
          <Search size={18} className="text-slate-500" />

          <input
            placeholder="Search insights..."
            className="w-56 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">

        <button className="relative rounded-xl p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
            <Sparkles size={15} className="text-white" />
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">
              Career Explorer
            </p>

            <p className="text-xs text-slate-500">
              Free Plan
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}