export function encodeCode(code: string) {
  return encodeURIComponent(code ?? "");
}
