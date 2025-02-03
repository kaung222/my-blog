export function calculateReadTime(content: string, images = 0) {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.split(/\s+/).length; // Count words
  const imageTime = images * 10; // 10 seconds per image

  const readTimeMinutes = Math.ceil(words / wordsPerMinute);
  const totalReadTime = Math.ceil(readTimeMinutes + imageTime / 60); // Convert image time to minutes
  return totalReadTime;
}

export function truncateText(text: string, length = 100): string {
  return text.length > length ? `${text.substring(0, length)}...` : text;
}
