export const estimateReadTime = (text: string) => {
  const avgReadingTime = 200;
  const words = text.split(/\s+/);
  const totalWords = words.length;

  return Math.min(15, (totalWords / avgReadingTime) * 50);
};
