import { useEffect, useState } from "react";

// Extend the Window interface to include google
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

interface UseGoogleMapsProps {
  apiKey: string;
  libraries?: string[];
}

export const useGoogleMaps = ({
  apiKey,
  libraries = ["visualization"],
}: UseGoogleMapsProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(
      ","
    )}`;
    script.async = true;
    script.defer = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () => setLoadError("Failed to load Google Maps API");

    document.head.appendChild(script);

    return () => {
      // Only remove script if it exists and is still in the DOM
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey, libraries]);

  return { isLoaded, loadError };
};
