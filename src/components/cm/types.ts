export type View =
  | { type: "table" }
  | { type: "devices" }
  | { type: "faq" }
  | { type: "request"; num: number };

export const NAV_ITEMS = [
  { type: "devices", label: "Устройства", icon: "Cpu" },
  { type: "table", label: "Все заявки", icon: "Table2" },
  { type: "faq", label: "Инструкции", icon: "BookOpen" },
] as const;
