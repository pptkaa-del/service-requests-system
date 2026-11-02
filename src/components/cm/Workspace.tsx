import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SEED_REQUESTS, STORAGE_KEY, type ServiceRequest } from "@/lib/requests";
import { clearSession, readSession } from "@/lib/session";
import Sidebar from "./Sidebar";
import RequestsTable from "./RequestsTable";
import RequestDetail from "./RequestDetail";
import DevicesView from "./DevicesView";
import FaqView from "./FaqView";
import CreateRequestDialog from "./CreateRequestDialog";
import { NAV_ITEMS, type View } from "./types";

export default function Workspace() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<View>({ type: "table" });
  const [createOpen, setCreateOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const s = readSession();
    if (!s) {
      navigate({ to: "/" });
      return;
    }
    setLogin(s.login);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setRequests(raw ? (JSON.parse(raw) as ServiceRequest[]) : SEED_REQUESTS);
    } catch {
      setRequests(SEED_REQUESTS);
    }
    setLoaded(true);
  }, [navigate]);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests, loaded]);

  const go = (v: View) => {
    setView(v);
    setMenuOpen(false);
    document.getElementById("cm-content")?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    clearSession();
    navigate({ to: "/" });
  };

  const create = (system: string, description: string) => {
    const num = (requests.reduce((m, r) => Math.max(m, r.num), 0) || 0) + 1;
    const req: ServiceRequest = {
      num,
      system,
      status: "На исполнении",
      description,
      answer: "На исполнении",
      createdAt: new Date().toISOString(),
      closedAt: null,
      comments: [],
    };
    setRequests((prev) => [req, ...prev]);
    setCreateOpen(false);
    go({ type: "request", num });
    toast.success(`Заявка № ${num} создана`, { description: system });
  };

  const comment = (num: number, text: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.num === num
          ? { ...r, comments: [...r.comments, { author: login ?? "Пользователь", text, at: new Date().toISOString() }] }
          : r,
      ),
    );
    toast.success("Комментарий добавлен");
  };

  if (!login) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-background">
        <Icon name="Loader2" size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  const sidebarProps = {
    requests,
    view,
    onNavigate: go,
    onCreate: () => {
      setMenuOpen(false);
      setCreateOpen(true);
    },
    onLogout: logout,
    login,
  };

  return (
    <div className="min-h-[100dvh] bg-background lg:flex lg:h-[100dvh] lg:items-center lg:justify-center lg:p-6">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
        <img src="/logo.webp" alt="Телеком Инжиниринг" width={140} height={42} className="h-9 w-auto" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCreateOpen(true)}
            aria-label="Создать заявку"
            className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-accent"
          >
            <Icon name="Plus" size={20} />
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть список заявок"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card"
          >
            <Icon name="Menu" size={20} />
          </button>
        </div>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[88vw] max-w-[380px] p-0">
          <SheetTitle className="sr-only">Меню и список заявок</SheetTitle>
          <Sidebar {...sidebarProps} className="w-full border-r-0" />
        </SheetContent>
      </Sheet>

      <div className="flex w-full max-w-[1700px] overflow-hidden lg:h-full lg:max-h-[900px] lg:rounded-[20px] lg:bg-card lg:shadow-card">
        <Sidebar {...sidebarProps} className="hidden lg:flex" />

        <main id="cm-content" className="scrollbar-thin min-w-0 flex-1 overflow-y-auto bg-background/60 px-4 pb-28 pt-5 sm:px-6 lg:bg-muted/60 lg:p-8">
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <img src="/logo.webp" alt="Телеком Инжиниринг" width={180} height={54} className="h-11 w-auto" />
            <span className="text-sm text-muted-foreground">Система учета заявок обслуживания</span>
          </div>

          {view.type === "table" && <RequestsTable requests={requests} onOpen={(num) => go({ type: "request", num })} />}
          {view.type === "devices" && <DevicesView />}
          {view.type === "faq" && <FaqView />}
          {view.type === "request" && (
            <RequestDetail
              request={requests.find((r) => r.num === view.num)}
              onBack={() => go({ type: "table" })}
              onComment={comment}
            />
          )}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        {NAV_ITEMS.map((item) => {
          const active = view.type === item.type || (item.type === "table" && view.type === "request");
          return (
            <button
              key={item.type}
              onClick={() => go({ type: item.type })}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </button>
          );
        })}
        <button
          onClick={logout}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-foreground"
        >
          <Icon name="LogOut" size={20} />
          Выйти
        </button>
      </nav>

      <CreateRequestDialog open={createOpen} onOpenChange={setCreateOpen} onCreate={create} />
    </div>
  );
}
