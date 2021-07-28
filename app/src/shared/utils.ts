import { ROUTES } from "../routes";

/**
 * Generates a random string with a given length
 * @param len Desirable output length. Minimal output length is 2.
 */
export function generateToken(len: number): string {
  var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(Math.abs(len) || 2)
    .join()
    .split(",")
    .map(() => s.charAt(Math.floor(Math.random() * s.length)))
    .join("");
}

export function getGroupURL(id: string): string {
  return ROUTES.GROUP.replace(/:id/, id);
}

export function getWordURL(id: string): string {
  return ROUTES.WORD.replace(/:id/, id);
}

export function removeTrailingSlash(url?: string): string {
  return (url || "").trim().replace(/(\/)*$/, "");
}

export function shuffle(arr: Array<any> = []) {
  const _arr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    const idx = Math.floor(arr.length * Math.random());
    const tmp = _arr[idx];
    _arr[idx] = _arr[i];
    _arr[i] = tmp;
  }
  return _arr;
}

export const delay = (ms: number = 100): Promise<void> => {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
};

export function getBearer(token?: string) {
  return `Bearer ${token}`;
}
