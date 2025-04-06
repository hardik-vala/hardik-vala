export function calculateReadingTimeInMinutes(content: string): number {
  const wordsPerMinute = 180;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
