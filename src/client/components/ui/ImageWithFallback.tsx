import { useState } from "react";
import { getImageWithFallback, isValidImageUrl } from "../../lib/imageUtils";

export default function ImageWithFallback({
  src,
  fallbackSrc = '/Beyond.svg',
  alt,
  checkValidity = true,
  onError,
  onLoad,
  ...imgProps
}) {
  const [error, setError] = useState(false);
  
  const handleError = (e) => {
    if (!error) {
      setError(true);
      e.target.src = fallbackSrc;
      if (onError) onError(e);
    }
  };
  
  const handleLoad = (e) => {
    if (onLoad) onLoad(e);
  };
  
  const displaySrc = checkValidity && !isValidImageUrl(src) ? fallbackSrc : src;
  
  return (
    <img
      src={displaySrc}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      {...imgProps}
    />
  );
}