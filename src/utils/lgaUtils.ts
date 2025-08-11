import { Areas, HeatmapPoint, LGACoordinate } from "@/types/areas.types";
import { LGA_COORDINATES } from "../data/lgaCoordinates";

/**
 * Normalize LGA name for comparison
 */
export const normalizeLGAName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s*-\s*(kaduna|nasarawa|fct)$/i, "") // Remove state suffix
    .replace(/['-]/g, "") // Remove apostrophes and hyphens
    .trim();
};

/**
 * Match backend LGA data with coordinates
 */
export const matchLGAsWithCoordinates = (
  backendLGAs: Areas[]
): LGACoordinate[] => {
  const matched: LGACoordinate[] = [];

  backendLGAs.forEach((backendLGA) => {
    const normalizedBackendName = normalizeLGAName(backendLGA.name);

    const coordinate = LGA_COORDINATES.find((coord) => {
      const normalizedCoordName = normalizeLGAName(coord.name);
      return normalizedCoordName === normalizedBackendName;
    });

    if (coordinate) {
      matched.push({
        ...coordinate,
        id: backendLGA.id, // Use backend ID
        name: backendLGA.name, // Use backend name format
      });
    } else {
      console.warn(`No coordinates found for LGA: ${backendLGA.name}`);
    }
  });

  return matched;
};

/**
 * Convert LGA coordinates to heatmap points
 */
export const convertToHeatmapPoints = (
  lgaCoordinates: LGACoordinate[],
  weightFunction?: (lga: LGACoordinate) => number
): HeatmapPoint[] => {
  return lgaCoordinates.map((lga) => ({
    lat: lga.latitude,
    lng: lga.longitude,
    weight: weightFunction ? weightFunction(lga) : 1,
  }));
};
