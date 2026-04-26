export function isValidImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  
  const trimmed = url.trim();
  if (!trimmed) return false;
  
  try {
    const parsed = new URL(trimmed);
    const pathname = parsed.pathname.toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
    const hasValidExtension = validExtensions.some(ext => pathname.endsWith(ext));
    const hasValidProtocol = ['http:', 'https:'].includes(parsed.protocol);
    
    return hasValidExtension || (hasValidProtocol && (trimmed.includes('cloudinary') || trimmed.includes('imgix') || trimmed.includes('res.cloudinary') || trimmed.includes('cdn.')));
  } catch {
    return false;
  }
}

export function getImageWithFallback(imageUrl, fallbackUrl = '/Beyond.svg', options = {}) {
  const { checkValidity = true } = options;
  
  if (!imageUrl) return fallbackUrl;
  if (checkValidity && !isValidImageUrl(imageUrl)) return fallbackUrl;
  
  return imageUrl;
}

export const PLACEHOLDER_IMAGES = {
  logo: '/Beyond.svg',
  cover: null,
  speaker: null,
  sponsor: null,
};