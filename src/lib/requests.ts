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
    "num": 41,
    "system": "СКУД",
    "status": "На исполнении",
    "description": "Не работают кнопки управления турникетами",
    "answer": "На исполнении",
    "createdAt": "2026-11-02T08:23:11Z",
    "closedAt": null,
    "comments": []
  },
  {
    "num": 40,
    "system": "СКУД",
    "status": "На исполнении",
    "description": "Не срабатывает 1-й турникет",
    "answer": "На исполнении",
    "createdAt": "2026-11-02T08:22:51Z",
    "closedAt": null,
    "comments": []
  },
  {
    "num": 39,
    "system": "Система видеонаблюдения",
    "status": "На исполнении",
    "description": "Уличная камера внутреннего двора сбита со своего положения",
    "answer": "На исполнении",
    "createdAt": "2026-10-23T10:07:56Z",
    "closedAt": null,
    "comments": []
  },
  {
    "num": 38,
    "system": "СКУД",
    "status": "На исполнении",
    "description": "Ложное срабатывание звукового оповещения прохода через турникета",
    "answer": "На исполнении",
    "createdAt": "2026-10-22T06:56:30Z",
    "closedAt": null,
    "comments": []
  },
  {
    "num": 37,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Картоприемник не принимает карточки, турникет при этом работает исправно",
    "answer": "Выполнена регулировка и смазка механизма сброса карты",
    "createdAt": "2026-09-29T08:57:54Z",
    "closedAt": "2026-10-29T10:06:02Z",
    "comments": []
  },
  {
    "num": 36,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Orion",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-09-29T08:57:01Z",
    "closedAt": "2026-10-29T10:45:39Z",
    "comments": []
  },
  {
    "num": 35,
    "system": "Система голосового оповещения",
    "status": "Выполнена",
    "description": "Консоль с микрофоном не видит сервер и усилитель",
    "answer": "Выполнена замена разъёма RJ45 консоли",
    "createdAt": "2026-09-28T05:52:41Z",
    "closedAt": "2026-10-28T07:52:18Z",
    "comments": []
  },
  {
    "num": 34,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Не срабатывает доводчик двери 4 этаж",
    "answer": "Выполнена регулировка доводчика двери",
    "createdAt": "2026-09-22T06:45:15Z",
    "closedAt": "2026-10-22T08:45:05Z",
    "comments": []
  },
  {
    "num": 33,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Orion",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-09-22T06:42:44Z",
    "closedAt": "2026-10-22T08:44:46Z",
    "comments": []
  },
  {
    "num": 32,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Orion",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-09-16T10:30:55Z",
    "closedAt": "2026-09-16T10:52:05Z",
    "comments": []
  },
  {
    "num": 31,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Не работает Турникет 2, срабатывает только на ввыход, створки устанавливаются не ровно",
    "answer": "Выполнена замена контроллера С2000-2",
    "createdAt": "2026-09-14T07:06:38Z",
    "closedAt": "2026-09-14T09:25:35Z",
    "comments": []
  },
  {
    "num": 30,
    "system": "Система видеонаблюдения",
    "status": "Выполнена",
    "description": "Нет соединения IP Camera 8 1-й этаж , коридор 1-1",
    "answer": "Выполнена замена камеры",
    "createdAt": "2026-09-07T07:22:49Z",
    "closedAt": "2026-09-07T08:46:12Z",
    "comments": []
  },
  {
    "num": 29,
    "system": "Система SMS оповещения",
    "status": "Выполнена",
    "description": "Не приходят смс, отсутствует соединение с сервером",
    "answer": "Выполнено восстановление таблицы БД сервера",
    "createdAt": "2026-09-04T07:00:39Z",
    "closedAt": "2026-09-04T09:02:11Z",
    "comments": []
  },
  {
    "num": 28,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Не срабатывает картоприемник турникета, перезапуск сервера проблему не устранил",
    "answer": "Выполнен ремонт линии уравнения картоприемника и контроллера",
    "createdAt": "2026-08-27T10:49:30Z",
    "closedAt": "2026-08-27T12:18:20Z",
    "comments": []
  },
  {
    "num": 27,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Orion",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-08-11T11:17:20Z",
    "closedAt": "2026-08-11T13:27:05Z",
    "comments": []
  },
  {
    "num": 26,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Не работают замки 2 и 3 этажа дальней лестницы",
    "answer": "Выполнена замена контроллера С2000-2",
    "createdAt": "2026-08-11T10:38:36Z",
    "closedAt": "2026-08-11T13:26:46Z",
    "comments": []
  },
  {
    "num": 25,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Не работает картоприемник",
    "answer": "Выполнен перезапуск срипта картоприемника на сервере",
    "createdAt": "2026-04-22T06:45:31Z",
    "closedAt": "2026-04-22T09:00:36Z",
    "comments": []
  },
  {
    "num": 24,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Orion",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-04-22T06:45:07Z",
    "closedAt": "2026-04-22T09:00:25Z",
    "comments": []
  },
  {
    "num": 23,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Не работает запирающее устройство двери 3 этаж запасной выход",
    "answer": "Выполнен ремонт запирающего устройства",
    "createdAt": "2026-04-21T07:19:01Z",
    "closedAt": "2026-04-21T08:26:52Z",
    "comments": []
  },
  {
    "num": 22,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Orion",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-04-21T07:10:33Z",
    "closedAt": "2026-04-21T07:59:47Z",
    "comments": []
  },
  {
    "num": 21,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Зависает кнопка выхода на 4 этаже запасного выхода",
    "answer": "Выполнен ремонт кнопки открытия двери",
    "createdAt": "2026-04-21T07:01:12Z",
    "closedAt": "2026-04-21T08:05:29Z",
    "comments": []
  },
  {
    "num": 20,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Зависает кнопка выхода на 4 этаже запасного выхода",
    "answer": "Выполнен ремонт кнопки открытия двери",
    "createdAt": "2026-04-21T07:01:00Z",
    "closedAt": "2026-04-21T08:05:12Z",
    "comments": []
  },
  {
    "num": 19,
    "system": "Система видеонаблюдения",
    "status": "Выполнена",
    "description": "Пропадает связь с камерой 3-й этаж, коридор 2-2",
    "answer": "Выполнен восстановление линии связи камеры",
    "createdAt": "2026-03-19T08:20:00Z",
    "closedAt": "2026-03-19T09:25:35Z",
    "comments": []
  },
  {
    "num": 18,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Orion",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-03-19T06:52:12Z",
    "closedAt": "2026-03-19T08:25:05Z",
    "comments": []
  },
  {
    "num": 17,
    "system": "Система видеонаблюдения",
    "status": "Выполнена",
    "description": "Не работает камера на 4 этаже коридор 1-1",
    "answer": "Выполнен восстановление линии связи камеры",
    "createdAt": "2026-03-10T09:49:53Z",
    "closedAt": "2026-03-10T11:31:16Z",
    "comments": []
  },
  {
    "num": 16,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Зависает кнопка выхода в серверном помещении",
    "answer": "Выполнен ремонт кнопки открытия двери",
    "createdAt": "2026-03-10T09:48:59Z",
    "closedAt": "2026-03-11T11:25:50Z",
    "comments": []
  },
  {
    "num": 9,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Оrion, нет обмена данными, не работает картоприемник",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-03-03T07:48:06Z",
    "closedAt": "2026-03-03T09:42:56Z",
    "comments": []
  },
  {
    "num": 8,
    "system": "Система видеонаблюдения",
    "status": "Выполнена",
    "description": "Ошибка по серверу Trassir",
    "answer": "Выполнена перенастройка скриптов сервера",
    "createdAt": "2026-02-19T09:15:23Z",
    "closedAt": null,
    "comments": []
  },
  {
    "num": 7,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Заедает кнопка открывания двери на 3 этаже дальней лестницы",
    "answer": "Выполнен ремонт кнопки открытия двери",
    "createdAt": "2026-02-19T09:15:04Z",
    "closedAt": null,
    "comments": []
  },
  {
    "num": 6,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Ошибка по серверу Orion",
    "answer": "Выполнен перезапуск сервера",
    "createdAt": "2026-02-16T07:29:15Z",
    "closedAt": "2026-02-16T11:47:51Z",
    "comments": []
  },
  {
    "num": 5,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Потерян контакт с картоприемником",
    "answer": "Восстановлена линия связи  (RS485) c контроллером картоприемника",
    "createdAt": "2026-02-16T07:28:34Z",
    "closedAt": "2026-02-16T11:47:31Z",
    "comments": []
  },
  {
    "num": 4,
    "system": "Система видеонаблюдения",
    "status": "Выполнена",
    "description": "Нет связи с двумя камерами",
    "answer": "Ремонт 2х камер видеонаблюдения",
    "createdAt": "2026-02-04T07:00:08Z",
    "closedAt": "2026-02-04T08:33:08Z",
    "comments": []
  },
  {
    "num": 3,
    "system": "Система видеонаблюдения",
    "status": "Выполнена",
    "description": "Ошибки по серверу Trassir: не настроены скрипты",
    "answer": "Выполнена перенастройка сервера",
    "createdAt": "2026-01-29T07:40:43Z",
    "closedAt": "2026-01-29T12:03:43Z",
    "comments": []
  },
  {
    "num": 2,
    "system": "Система видеонаблюдения",
    "status": "Выполнена",
    "description": "2 внутренние камеры не работают: 2-й и 3-й этаж",
    "answer": "Выполнена замена камер",
    "createdAt": "2026-01-29T07:40:12Z",
    "closedAt": "2026-01-29T12:03:40Z",
    "comments": []
  },
  {
    "num": 1,
    "system": "СКУД",
    "status": "Выполнена",
    "description": "Считыватель на 4 ом таже не на связи",
    "answer": "Выполнено перепрограммирование контроллера 4го этажа",
    "createdAt": "2025-12-02T07:02:48Z",
    "closedAt": "2025-12-02T09:02:48Z",
    "comments": []
  }
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

export const STORAGE_KEY = "ti-cm-requests-v2";
