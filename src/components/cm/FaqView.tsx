import Icon from "@/components/ui/icon";

const CDN = "https://cdn.poehali.dev/projects/bcf243ff-f6e4-4363-b15f-348fdbed3317/bucket";

const DOCS = [
  {
    title: "Руководство по установке «С2000-2»",
    note: "Контроллер доступа Болид · 16 стр. · 7,1 МБ",
    file: "Руководство по установке «С2000-2».pdf",
    url: `${CDN}/0870849a-109f-4899-ba99-427951ec3aa2.pdf`,
  },
  {
    title: "Руководство по эксплуатации «PERCo-IC05»",
    note: "Картоприёмник · 38 стр. · 3,3 МБ",
    file: "Руководство по эксплуатации «PERCo-IC05».pdf",
    url: `${CDN}/836815ed-1836-4882-a4e5-0ad69195b8d3.pdf`,
  },
  {
    title: "Руководство по эксплуатации «PERCo STD-01»",
    note: "Скоростной проход и двухсторонняя секция · 50 стр. · 7,4 МБ",
    file: "Руководство по эксплуатации «PERCo STD-01».pdf",
    url: `${CDN}/bf908538-a8a6-47c5-a0ba-8bc32f3f9323.pdf`,
  },
  {
    title: "Исполнительная документация СКУД — Автодор",
    note: "Рабочая документация системы СКУД · 10 стр. · 0,8 МБ",
    file: "ИД СКУД Автодор v2.pdf",
    url: `${CDN}/ed4640b1-7543-43d2-9464-c51fdb823273.pdf`,
  },
];

export default function FaqView() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="font-heading text-2xl font-semibold">Инструкции</h2>
      <p className="mt-1 text-sm text-muted-foreground">Документация по обслуживаемому оборудованию</p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {DOCS.map((d) => (
          <div key={d.url} className="flex flex-col gap-4 rounded-2xl bg-card p-5 sm:flex-row sm:items-center">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon name="FileText" size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-heading font-semibold leading-snug">{d.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{d.note}</div>
            </div>
            <div className="flex gap-2">
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-accent hover:brightness-105 sm:flex-none"
              >
                <Icon name="Eye" size={16} />
                Открыть
              </a>
              <a
                href={d.url}
                download={d.file}
                aria-label={`Скачать: ${d.title}`}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-border transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name="Download" size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
