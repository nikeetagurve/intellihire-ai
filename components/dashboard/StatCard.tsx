import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.05]">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h3>
        </div>

        <div className="rounded-xl bg-violet-500/15 p-3 text-violet-300">
          <Icon size={21} />
        </div>
      </div>

      <p className="text-xs text-emerald-400">
        {description}
      </p>
    </div>
  );
}