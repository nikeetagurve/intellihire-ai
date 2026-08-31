"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileSearch,
  MessageSquareText,
  ChartNoAxesCombined,
  Settings,
  Sparkles,
  Briefcase,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Resume Analyzer",
    href: "/analyzer",
    icon: FileSearch,
  },
  {
    name: "Interview AI",
    href: "/interview",
    icon: MessageSquareText,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesCombined,
  },
  {
  name: "Job Matches",
  href: "/jobs",
  icon: Briefcase,
},
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#080b14] px-4 py-6">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400">
          <Sparkles size={20} className="text-white" />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">
            IntelliHire
          </h1>

          <p className="text-xs text-slate-400">
            AI Career Intelligence
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                isActive
                  ? "bg-violet-500/15 text-violet-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={19} />

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 pt-5">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Settings size={19} />
          Settings
        </Link>

        <div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
          <p className="text-sm font-semibold text-white">
            IntelliHire Pro
          </p>

          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Unlock advanced career insights powered by AI.
          </p>
        </div>
      </div>
    </aside>
  );
}
