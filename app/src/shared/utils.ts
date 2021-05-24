/**
 * Generates a random string with a given length
 * @param len Desirable output length. Minimal output length is 2.
 * @returns {string}
 */
export function generateToken(len: number): string {
  var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(Math.abs(len) || 2)
    .join()
    .split(",")
    .map(() => s.charAt(Math.floor(Math.random() * s.length)))
    .join("");
}
