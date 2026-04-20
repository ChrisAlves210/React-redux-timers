export function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const padded = (n) => String(n).padStart(2, "0");

  return `${padded(hours)}:${padded(minutes)}:${padded(seconds)}`;
}
