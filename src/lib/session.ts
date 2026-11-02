export const SESSION_KEY = "ti-cm-session";

export type Session = {
  login: string;
  since: string;
};

export function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    return parsed && parsed.login ? parsed : null;
  } catch {
    return null;
  }
}

export function writeSession(login: string) {
  const s: Session = { login, since: new Date().toISOString() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
