export function pad(obj: any, count = 2, char = '0', start = true) {
  const str = String(obj);
  return start
    ? str.padStart(count, char) 
    : str.padEnd(count, char);
}
export function refreshPage() {
  window.location.reload();
}