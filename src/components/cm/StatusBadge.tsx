import { cn } from "@/lib/utils";
import type { RequestStatus } from "@/lib/requests";

const STYLES: Record<RequestStatus, string> = {
  "На исполнении": "bg-accent text-accent-foreground ring-primary/30",
  Выполнена: "bg-success/10 text-success ring-success/30",
  Отклонена: "bg-destructive/10 text-destructive ring-destructive/30",
};

const DOT: Record<RequestStatus, string> = {
  "На исполнении": "bg-primary",
  Выполнена: "bg-success",
  Отклонена: "bg-destructive",
};

export function StatusDot({ status, className }: { status: RequestStatus; className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2.5 w-2.5 shrink-0", className)}>
      {status === "На исполнении" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
      )}
      <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", DOT[status])} />
    </span>
  );
}

export default function StatusBadge({ status, className }: { status: RequestStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        STYLES[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT[status])} />
      {status}
    </span>
  );
}
