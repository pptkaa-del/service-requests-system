import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

const ITEMS = [
  {
    q: "Как создать заявку?",
    a: "Нажмите «Создать заявку», выберите систему, к которой относится неисправность, и кратко опишите проблему. После создания заявка появится в списке со статусом «На исполнении», а исполнитель получит уведомление.",
  },
  {
    q: "Что означают статусы заявок?",
    a: "«На исполнении» — заявка принята в работу. «Выполнена» — работы завершены, в карточке указан ответ исполнителя и дата закрытия. «Отклонена» — заявка не может быть выполнена, причина указана в ответе исполнителя.",
  },
  {
    q: "Как найти нужную заявку?",
    a: "Воспользуйтесь поиском в списке заявок: можно искать по номеру, системе или словам из описания. В разделе «Все заявки» доступен фильтр по статусу.",
  },
  {
    q: "Как читать показания раздела «Устройства»?",
    a: "Раздел показывает наличие электропитания в здании и серверной, уровень заряда АКБ и уровень сигнала. Зелёный цвет — норма, красный — питание отсутствует или АКБ разряжается.",
  },
];

const DOCS = [
  "Регламент технического обслуживания",
  "Инструкция пользователя СКУД",
  "Инструкция по системе видеонаблюдения",
  "Схема зон голосового оповещения",
];

export default function FaqView() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="font-heading text-2xl font-semibold">Инструкции</h2>
      <p className="mt-1 text-sm text-muted-foreground">Ответы на частые вопросы и документация</p>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl bg-card px-5 py-2 sm:px-7">
          <Accordion type="single" collapsible defaultValue="0">
            {ITEMS.map((it, i) => (
              <AccordionItem key={i} value={String(i)} className="last:border-0">
                <AccordionTrigger className="text-left font-heading text-base hover:text-primary hover:no-underline">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="rounded-2xl bg-card p-5">
          <h3 className="font-heading text-lg font-semibold">Ссылки на документацию</h3>
          <ul className="mt-3 space-y-1">
            {DOCS.map((d) => (
              <li key={d}>
                <span className="flex items-center gap-3 rounded-xl p-2.5 text-sm">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Icon name="FileText" size={16} />
                  </span>
                  {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Документы будут доступны для скачивания после загрузки администратором.</p>
        </div>
      </div>
    </section>
  );
}
