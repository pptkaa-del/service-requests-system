import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatDate, type ServiceRequest } from "@/lib/requests";
import { StatusDot } from "./StatusBadge";
import { NAV_ITEMS, type View } from "./types";

type Props = {
  requests: ServiceRequest[];
  view: View;
  onNavigate: (v: View) => void;
  onCreate: () => void;
  onLogout: () => void;
  login: string;
  className?: string;
};

export default function Sidebar({ requests, view, onNavigate, onCreate, onLogout, login, className }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter(
      (r) =>
        String(r.num).includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.system.toLowerCase().includes(q),
    );
  }, [requests, query]);

  return (
    <aside className={cn("flex h-full w-[360px] shrink-0 flex-col border-r border-border bg-sidebar xl:w-[400px]", className)}>
      <div className="flex items-center justify-between gap-2 px-6 pb-4 pt-6">
        <div className="flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const active = view.type === item.type;
            return (
              <Tooltip key={item.type}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onNavigate({ type: item.type })}
                    aria-label={item.label}
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl border transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-accent"
                        : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
                    )}
                  >
                    <Icon name={item.icon} size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{item.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onLogout}
              aria-label="Выйти"
              className="flex h-11 items-center gap-2 rounded-xl border border-border bg-card pl-2 pr-3 text-sm transition-colors hover:border-destructive hover:text-destructive"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary text-xs font-semibold uppercase">
                {login.slice(0, 2)}
              </span>
              <Icon name="LogOut" size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Выйти ({login})</TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-3 px-6 pb-4">
        <button
          onClick={onCreate}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-primary font-semibold text-primary-foreground shadow-accent transition-[filter,transform] hover:brightness-105 active:translate-y-px"
        >
          <Icon name="Plus" size={18} />
          Создать заявку
        </button>
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по номеру или описанию"
            className="h-10 w-full rounded-[10px] border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-6 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span>Заявки</span>
        <span>{filtered.length}</span>
      </div>

      <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto px-6 pb-6">
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">Ничего не найдено</p>
        )}
        {filtered.map((r) => {
          const active = view.type === "request" && view.num === r.num;
          return (
            <button
              key={r.num}
              onClick={() => onNavigate({ type: "request", num: r.num })}
              className={cn(
                "group w-full rounded-2xl border-2 bg-card px-4 py-3 text-left transition-all active:shadow-inner",
                active ? "border-primary" : "border-border hover:border-primary/70",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-heading text-sm font-semibold">№ {r.num}</span>
                <StatusDot status={r.status} />
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-foreground/80">{r.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {r.system} · {formatDate(r.createdAt)}
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}