import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { readSession, writeSession } from "@/lib/session";

export default function LoginCard() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (readSession()) navigate({ to: "/app" });
  }, [navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!login.trim()) {
      setError("Введите логин");
      return;
    }
    if (password.length < 4) {
      setError("Пароль должен содержать не менее 4 символов");
      return;
    }
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      writeSession(login.trim());
      navigate({ to: "/app" });
    }, 450);
  };

  const inputBase =
    "block h-11 w-full rounded-[6px] border border-input bg-card px-3 text-[1.05em] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-2 focus:border-ring focus:px-[11px]";

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-background px-4 py-8 font-body text-base text-foreground">
      <div className="w-full max-w-[404px] animate-card-in rounded-[20px] bg-card px-6 pb-11 pt-8 text-center shadow-card motion-reduce:animate-none sm:px-14 sm:pt-10">
        <img
          src="/logo.webp"
          alt="Телеком Инжиниринг"
          width={290}
          height={87}
          className="mx-auto h-auto w-[220px] sm:w-[290px]"
        />
        <h1 className="mb-10 mt-6 font-heading text-xl font-medium leading-[1.1]">
          Система учета заявок обслуживания
        </h1>

        <form onSubmit={onSubmit} noValidate className="grid gap-2 text-left">
          <label htmlFor="login" className="mt-2.5 font-heading text-[1.1em]">
            Логин
          </label>
          <input
            id="login"
            autoFocus
            autoComplete="username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className={inputBase}
          />

          <label htmlFor="password" className="mt-2.5 font-heading text-[1.1em]">
            Пароль
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(inputBase, "pr-11 focus:pr-[43px]")}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? "Скрыть пароль" : "Показать пароль"}
              className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name={showPass ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          <div
            role="alert"
            className={cn(
              "overflow-hidden text-sm text-destructive transition-all",
              error ? "mt-1 max-h-10 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {error}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mx-auto mt-8 flex h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-[1.05em] font-semibold text-primary-foreground shadow-accent transition-[transform,filter] hover:brightness-105 active:translate-y-px disabled:opacity-80"
          >
            {loading && <Icon name="Loader2" size={18} className="animate-spin" />}
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}