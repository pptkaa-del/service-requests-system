import { useState, type FormEvent } from "react";
import Icon from "@/components/ui/icon";
import { formatDate, systemIcon, type ServiceRequest } from "@/lib/requests";
import StatusBadge from "./StatusBadge";

type Props = {
  request: ServiceRequest | undefined;
  onBack: () => void;
  onComment: (num: number, text: string) => void;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-secondary p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-sm">{children}</div>
    </div>
  );
}

export default function RequestDetail({ request, onBack, onComment }: Props) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  if (!request) {
    return (
      <div className="rounded-2xl bg-card p-10 text-center">
        <p className="text-muted-foreground">Заявка не найдена</p>
        <button onClick={onBack} className="mt-4 font-semibold text-primary">К списку заявок</button>
      </div>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 2) {
      setError(true);
      return;
    }
    onComment(request.num, text.trim());
    setText("");
    setError(false);
  };

  return (
    <section key={request.num} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon name="ArrowLeft" size={16} />
        Все заявки
      </button>

      <div className="rounded-2xl bg-card p-5 shadow-card sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon name={systemIcon(request.system)} size={22} />
            </span>
            <div>
              <h2 className="font-heading text-2xl font-semibold">Заявка № {request.num}</h2>
              <p className="text-sm text-muted-foreground">{request.system}</p>
            </div>
          </div>
          <StatusBadge status={request.status} className="self-start text-sm" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Field label="Описание от заявителя">{request.description}</Field>
          <Field label="Ответ исполнителя">{request.answer}</Field>
          <Field label="Дата создания">{formatDate(request.createdAt)}</Field>
          <Field label="Дата закрытия">{formatDate(request.closedAt)}</Field>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-card p-5 sm:p-7">
        <h3 className="font-heading text-lg font-semibold">Комментарии по заявке</h3>
        <div className="mt-4 space-y-3">
          {request.comments.length === 0 && (
            <p className="text-sm text-muted-foreground">Комментариев пока нет</p>
          )}
          {request.comments.map((c, i) => (
            <div key={i} className="rounded-xl border border-border p-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{c.author}</span>
                <span>{formatDate(c.at)}</span>
              </div>
              <p className="mt-1 text-sm">{c.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Напишите комментарий"
            aria-invalid={error}
            className="h-11 flex-1 rounded-[10px] border border-input bg-card px-3 text-sm outline-none focus:border-ring aria-[invalid=true]:border-destructive"
          />
          <button
            type="submit"
            className="flex h-11 items-center justify-center gap-2 rounded-[10px] bg-primary px-5 font-semibold text-primary-foreground shadow-accent hover:brightness-105"
          >
            <Icon name="Send" size={16} />
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
}
