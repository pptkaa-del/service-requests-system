export type RequestStatus = "На исполнении" | "Выполнена" | "Отклонена";

export type ServiceRequest = {
  num: number;
  system: string;
  status: RequestStatus;
  description: string;
  answer: string;
  createdAt: string;
  closedAt: string | null;
  comments: { author: string; text: string; at: string }[];
};

export const SYSTEMS = [
  { id: "skud", label: "СКУД", icon: "KeyRound" },
  { id: "video", label: "Система видеонаблюдения", icon: "Cctv" },
  { id: "voice", label: "Система голосового оповещения", icon: "Megaphone" },
  { id: "sms", label: "Система SMS оповещения", icon: "MessageSquareText" },
] as const;

export const STATUSES: RequestStatus[] = ["На исполнении", "Выполнена", "Отклонена"];

export function systemIcon(system: string): string {
  return SYSTEMS.find((s) => s.label === system)?.icon ?? "Wrench";
}

export const SEED_REQUESTS: ServiceRequest[] = [
  {
    num: 128,
    system: "Система видеонаблюдения",
    status: "На исполнении",
    description: "Камера на въезде №2 не передаёт изображение, на экране чёрный кадр.",
    answer: "Выезд инженера запланирован на ближайший рабочий день.",
    createdAt: "2026-10-31T09:14:00",
    closedAt: null,
    comments: [],
  },
  {
    num: 127,
    system: "СКУД",
    status: "На исполнении",
    description: "Турникет на центральной проходной не считывает пропуска сотрудников.",
    answer: "На исполнении",
    createdAt: "2026-10-30T16:42:00",
    closedAt: null,
    comments: [],
  },
  {
    num: 126,
    system: "Система голосового оповещения",
    status: "Выполнена",
    description: "Не работает громкоговоритель в складском помещении №4.",
    answer: "Заменён усилитель зоны 4, проведена проверка оповещения по всем зонам.",
    createdAt: "2026-10-27T11:05:00",
    closedAt: "2026-10-28T15:30:00",
    comments: [
      { author: "Исполнитель", text: "Усилитель заменён, система работает штатно.", at: "2026-10-28T15:28:00" },
    ],
  },
  {
    num: 125,
    system: "Система SMS оповещения",
    status: "Выполнена",
    description: "SMS о тревоге не приходят дежурному на новый номер.",
    answer: "Номер дежурного добавлен в рассылку, тестовое сообщение доставлено.",
    createdAt: "2026-10-22T08:20:00",
    closedAt: "2026-10-22T10:02:00",
    comments: [],
  },
  {
    num: 124,
    system: "СКУД",
    status: "Отклонена",
    description: "Добавить доступ для подрядчика в серверную.",
    answer: "Требуется письменное согласование службы безопасности.",
    createdAt: "2026-10-18T13:47:00",
    closedAt: "2026-10-19T09:00:00",
    comments: [],
  },
  {
    num: 123,
    system: "Система видеонаблюдения",
    status: "Выполнена",
    description: "Архив видеорегистратора хранит записи только за 3 дня вместо 14.",
    answer: "Установлен дополнительный жёсткий диск, глубина архива восстановлена.",
    createdAt: "2026-10-12T10:10:00",
    closedAt: "2026-10-14T17:45:00",
    comments: [],
  },
];

export type DeviceRecord = {
  num: number;
  buildingPower: boolean;
  serverPower: boolean;
  battery: number;
  signal: number;
  createdAt: string;
  updatedAt: string;
};

export const DEVICE_RECORDS: DeviceRecord[] = [
  { num: 5412, buildingPower: true, serverPower: true, battery: 870, signal: 71, createdAt: "2026-11-02T08:00:00", updatedAt: "2026-11-02T14:20:00" },
  { num: 5411, buildingPower: true, serverPower: true, battery: 865, signal: 73, createdAt: "2026-11-02T02:00:00", updatedAt: "2026-11-02T07:59:00" },
  { num: 5410, buildingPower: false, serverPower: true, battery: 812, signal: 76, createdAt: "2026-11-01T20:00:00", updatedAt: "2026-11-02T01:59:00" },
  { num: 5409, buildingPower: false, serverPower: false, battery: 790, signal: 79, createdAt: "2026-11-01T14:00:00", updatedAt: "2026-11-01T19:59:00" },
  { num: 5408, buildingPower: true, serverPower: true, battery: 850, signal: 70, createdAt: "2026-11-01T08:00:00", updatedAt: "2026-11-01T13:59:00" },
  { num: 5407, buildingPower: true, serverPower: false, battery: 845, signal: 72, createdAt: "2026-11-01T02:00:00", updatedAt: "2026-11-01T07:59:00" },
  { num: 5406, buildingPower: true, serverPower: true, battery: 880, signal: 69, createdAt: "2026-10-31T20:00:00", updatedAt: "2026-11-01T01:59:00" },
  { num: 5405, buildingPower: true, serverPower: true, battery: 880, signal: 68, createdAt: "2026-10-31T14:00:00", updatedAt: "2026-10-31T19:59:00" },
];

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const STORAGE_KEY = "ti-cm-requests";
