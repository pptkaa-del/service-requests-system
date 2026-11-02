import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { formatDate, STATUSES, systemIcon, type RequestStatus, type ServiceRequest } from "@/lib/requests";
import StatusBadge from "./StatusBadge";

type Props = {
  requests: ServiceRequest[];
  onOpen: (num: number) => void;
};

type Filter = "Все" | RequestStatus;

export default function RequestsTable({ requests, onOpen }: Props) {
  const [filter, setFilter] = useState<Filter>("Все");

  const counts = useMemo(() => {
    const c: Record<string, number> = { Все: requests.length };
    STATUSES.forEach((s) => (c[s] = requests.filter((r) => r.status === s).length));
    return c;
  }, [requests]);

  const rows = filter === "Все" ? requests : requests.filter((r) => r.status === filter);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Все заявки</h2>
          <p className="mt-1 text-sm text-muted-foreground">Журнал обращений по обслуживаемым системам</p>
        </div>
      </header>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {(["Все", ...STATUSES] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-2xl border-2 bg-card p-4 text-left transition-all",
              filter === f ? "border-primary shadow-accent" : "border-transparent hover:border-border",
            )}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {f === "Все" ? "Всего" : f}
            </div>
            <div className="mt-1 font-heading text-3xl font-semibold">{counts[f]}</div>
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">№</th>
                <th className="px-4 py-3 font-semibold">Система</th>
                <th className="px-4 py-3 font-semibold">Статус</th>
                <th className="px-4 py-3 font-semibold">Описание заявки</th>
                <th className="px-4 py-3 font-semibold">Ответ исполнителя</th>
                <th className="px-4 py-3 font-semibold">Создана</th>
                <th className="px-4 py-3 font-semibold">Закрыта</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.num}
                  onClick={() => onOpen(r.num)}
                  className="cursor-pointer border-b border-border/70 transition-colors last:border-0 hover:bg-accent/50"
                >
                  <td className="px-4 py-3 font-heading font-semibold">{r.num}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <Icon name={systemIcon(r.system)} size={16} className="shrink-0 text-muted-foreground" />
                      {r.system}
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="max-w-[260px] px-4 py-3"><span className="line-clamp-2">{r.description}</span></td>
                  <td className="max-w-[220px] px-4 py-3 text-muted-foreground"><span className="line-clamp-2">{r.answer}</span></td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(r.createdAt)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(r.closedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">Заявок с таким статусом нет</p>}
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((r) => (
          <button
            key={r.num}
            onClick={() => onOpen(r.num)}
            className="w-full rounded-2xl border border-border bg-card p-4 text-left transition-colors active:border-primary"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading font-semibold">Заявка № {r.num}</span>
              <StatusBadge status={r.status} />
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name={systemIcon(r.system)} size={14} />
              {r.system}
            </div>
            <p className="mt-2 text-sm">{r.description}</p>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span>Создана: {formatDate(r.createdAt)}</span>
              <span>Закрыта: {formatDate(r.closedAt)}</span>
            </div>
          </button>
        ))}
        {rows.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">Заявок с таким статусом нет</p>}
      </div>
    </section>
  );
}
