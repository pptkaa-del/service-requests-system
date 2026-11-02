import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { DEVICE_RECORDS, formatDate } from "@/lib/requests";

function Power({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        on ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
      )}
    >
      <Icon name={on ? "Zap" : "ZapOff"} size={12} />
      {on ? "В режиме" : "Отсутствует"}
    </span>
  );
}

const battery = (v: number) => (v >= 840 ? "100%" : "Разряжается");

export default function DevicesView() {
  const last = DEVICE_RECORDS[0];
  const cards = [
    { label: "Электропитание здания", value: last.buildingPower ? "В режиме" : "Отсутствует", icon: "Building2", ok: last.buildingPower },
    { label: "Электропитание серверной", value: last.serverPower ? "В режиме" : "Отсутствует", icon: "Server", ok: last.serverPower },
    { label: "Уровень АКБ", value: battery(last.battery), icon: "BatteryFull", ok: last.battery >= 840 },
    { label: "Уровень сигнала", value: `-${last.signal} дБм`, icon: "Signal", ok: true },
  ];

  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="font-heading text-2xl font-semibold">Устройства</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Система мониторинга наличия электропитания здания и серверной
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-card p-4">
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl",
                  c.ok ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                )}
              >
                <Icon name={c.icon} size={20} />
              </span>
              <span className={cn("h-2.5 w-2.5 rounded-full", c.ok ? "bg-success" : "bg-destructive")} />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{c.label}</div>
            <div className="mt-0.5 font-heading text-lg font-semibold">{c.value}</div>
          </div>
        ))}
      </div>

      <h3 className="mb-3 mt-8 font-heading text-lg font-semibold">Последние записи</h3>

      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">№ записи</th>
                <th className="px-4 py-3 font-semibold">Питание здания</th>
                <th className="px-4 py-3 font-semibold">Питание серверной</th>
                <th className="px-4 py-3 font-semibold">АКБ</th>
                <th className="px-4 py-3 font-semibold">Сигнал</th>
                <th className="px-4 py-3 font-semibold">Создана</th>
                <th className="px-4 py-3 font-semibold">Обновлена</th>
              </tr>
            </thead>
            <tbody>
              {DEVICE_RECORDS.map((d) => (
                <tr key={d.num} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-3 font-heading font-semibold">{d.num}</td>
                  <td className="px-4 py-3"><Power on={d.buildingPower} /></td>
                  <td className="px-4 py-3"><Power on={d.serverPower} /></td>
                  <td className="px-4 py-3">{battery(d.battery)}</td>
                  <td className="px-4 py-3">-{d.signal}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(d.createdAt)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(d.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {DEVICE_RECORDS.map((d) => (
          <div key={d.num} className="rounded-2xl bg-card p-4">
            <div className="flex justify-between">
              <span className="font-heading font-semibold">Запись № {d.num}</span>
              <span className="text-xs text-muted-foreground">{formatDate(d.updatedAt)}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="mb-1 text-muted-foreground">Здание</div>
                <Power on={d.buildingPower} />
              </div>
              <div>
                <div className="mb-1 text-muted-foreground">Серверная</div>
                <Power on={d.serverPower} />
              </div>
              <div>
                <div className="text-muted-foreground">АКБ</div>
                <div className="font-semibold">{battery(d.battery)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Сигнал</div>
                <div className="font-semibold">-{d.signal}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
