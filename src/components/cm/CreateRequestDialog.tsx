import { useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { SYSTEMS } from "@/lib/requests";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreate: (system: string, description: string) => void;
};

export default function CreateRequestDialog({ open, onOpenChange, onCreate }: Props) {
  const [system, setSystem] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setSystem(null);
    setDesc("");
    setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!system) return setError("Выберите систему");
    if (desc.trim().length < 5) return setError("Опишите проблему подробнее (не менее 5 символов)");
    onCreate(system, desc.trim());
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="max-h-[92dvh] w-[calc(100%-24px)] max-w-lg overflow-y-auto rounded-[20px] p-5 sm:p-7">
        <DialogHeader className="text-left">
          <DialogTitle className="font-heading text-xl">Создание заявки</DialogTitle>
          <DialogDescription>Выберите систему и опишите неисправность</DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} noValidate className="space-y-5">
          <fieldset>
            <legend className="mb-2 font-heading text-sm font-medium">Система</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {SYSTEMS.map((s) => {
                const active = system === s.label;
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => {
                      setSystem(s.label);
                      setError(null);
                    }}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition-all",
                      active ? "border-primary bg-accent" : "border-border hover:border-primary/60",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                        active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
                      )}
                    >
                      <Icon name={s.icon} size={18} />
                    </span>
                    <span className="leading-tight">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="desc" className="mb-2 block font-heading text-sm font-medium">
              Описание
            </label>
            <textarea
              id="desc"
              rows={4}
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                setError(null);
              }}
              placeholder="Например: не работает камера на въезде №2"
              className="w-full resize-none rounded-[10px] border border-input bg-card p-3 text-sm outline-none focus:border-ring"
            />
          </div>

          {error && (
            <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
              <Icon name="CircleAlert" size={16} />
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-[10px] border border-border px-5 font-semibold transition-colors hover:bg-secondary"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="h-11 rounded-[10px] bg-primary px-6 font-semibold text-primary-foreground shadow-accent hover:brightness-105"
            >
              Создать
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
