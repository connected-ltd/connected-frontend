/// <reference types="@types/google.maps" />

import { useGoogleMaps } from "@/app/useGoogleMaps";
import HeatmapControls from "@/components/HeatMapControls";
import { useGetAreasQuery } from "@/pages/admin/admin-api/statsApiSlice";
import { LGACoordinate } from "@/types/areas.types";
import {
  convertToHeatmapPoints,
  matchLGAsWithCoordinates,
} from "@/utils/lgaUtils";
import React, { useEffect, useRef, useState } from "react";

interface LGAHeatmapProps {
  googleMapsApiKey: string;
  className?: string;
}

const LGAHeatmap: React.FC<LGAHeatmapProps> = ({
  googleMapsApiKey,
  className = "w-full h-[50vh]",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(
    null
  );

  const [isHeatmapVisible, setIsHeatmapVisible] = useState(true);
  const [radius, setRadius] = useState(20);
  const [opacity, setOpacity] = useState(0.6);
  const [intensity, setIntensity] = useState(1);
  const [matchedLGAs, setMatchedLGAs] = useState<LGACoordinate[]>([]);

  // Fetch LGA data from backend
  const {
    data: lgaData,
    isLoading: isLgaLoading,
    error: lgaError,
  } = useGetAreasQuery();

  // Load Google Maps API
  const { isLoaded: isMapsLoaded, loadError: mapsError } = useGoogleMaps({
    apiKey: googleMapsApiKey,
    libraries: ["visualization"],
  });

  // Match backend LGAs with coordinates
  useEffect(() => {
    if (lgaData?.data) {
      const matched = matchLGAsWithCoordinates(lgaData.data);
      setMatchedLGAs(matched);
      //   console.log(
      //     `Matched ${matched.length} out of ${lgaData.data.length} LGAs with coordinates`
      //   );
    }
  }, [lgaData]);

  // Initialize map
  useEffect(() => {
    if (
      !isMapsLoaded ||
      !mapRef.current ||
      !matchedLGAs.length ||
      !window.google
    )
      return;

    // Calculate center of all LGAs
    const avgLat =
      matchedLGAs.reduce((sum, lga) => sum + lga.latitude, 0) /
      matchedLGAs.length;
    const avgLng =
      matchedLGAs.reduce((sum, lga) => sum + lga.longitude, 0) /
      matchedLGAs.length;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: avgLat, lng: avgLng },
      zoom: 8,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    });

    mapInstanceRef.current = map;

    // Create heatmap points
    const heatmapPoints = convertToHeatmapPoints(matchedLGAs);

    // Convert to LatLng objects
    const latLngPoints = heatmapPoints.map(
      (point) => new window.google.maps.LatLng(point.lat, point.lng)
    );

    // Create heatmap layer
    const heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: latLngPoints,
      map: map,
      radius: radius,
      opacity: opacity,
      maxIntensity: intensity,
    });

    heatmapRef.current = heatmap;

    // Add markers for each LGA (optional)
    matchedLGAs.forEach((lga) => {
      const marker = new window.google.maps.Marker({
        position: { lat: lga.latitude, lng: lga.longitude },
        map: map,
        title: `${lga.name} (${lga.state})`,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 4,
          fillColor: "#FF0000",
          fillOpacity: 0.8,
          strokeWeight: 2,
          strokeColor: "#FFFFFF",
        },
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold">${lga.name}</h3>
            <p class="text-sm text-gray-600">${lga.state} State</p>
            <p class="text-xs text-gray-500">Lat: ${lga.latitude.toFixed(
              3
            )}, Lng: ${lga.longitude.toFixed(3)}</p>
            <p class="text-sm text-gray-600">Numbers count: ${200}</p>
            <p class="text-sm text-gray-600">Keywords: ${"Cholera"}</p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  }, [isMapsLoaded, matchedLGAs, radius, opacity, intensity]);

  // Update heatmap properties
  useEffect(() => {
    if (heatmapRef.current && window.google) {
      heatmapRef.current.set("radius", radius);
      heatmapRef.current.set("opacity", opacity);
      heatmapRef.current.set("maxIntensity", intensity);
      heatmapRef.current.setMap(
        isHeatmapVisible ? mapInstanceRef.current : null
      );
    }
  }, [radius, opacity, intensity, isHeatmapVisible]);

  const handleToggleHeatmap = () => {
    setIsHeatmapVisible(!isHeatmapVisible);
  };

  // Loading state
  if (isLgaLoading || !isMapsLoaded) {
    return (
      <div className="w-full">
        {/* Controls Section */}
        <div className="mb-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-28"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <div
            className="border border-gray-200 rounded-lg overflow-hidden"
            style={{ height: "50vh" }}
          >
            <div
              className={`${className} flex items-center justify-center bg-gray-100`}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">
                  {isLgaLoading
                    ? "Loading LGA data..."
                    : "Loading Google Maps..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (lgaError || mapsError) {
    return (
      <div className="w-full">
        {/* Controls Section */}
        <div className="mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-600 font-semibold">Controls unavailable</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <div
            className="border border-red-200 rounded-lg overflow-hidden"
            style={{ height: "50vh" }}
          >
            <div
              className={`${className} flex items-center justify-center bg-red-50`}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <div className="text-center text-red-600">
                <p className="font-semibold">Error loading data</p>
                <p className="text-sm mt-1">
                  {lgaError ? "Failed to load LGA data" : mapsError}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Controls Section - Fixed at top with consistent spacing */}
      <div className="w-full mb-6">
        <HeatmapControls
          onToggleHeatmap={handleToggleHeatmap}
          onRadiusChange={setRadius}
          onOpacityChange={setOpacity}
          onIntensityChange={setIntensity}
          isHeatmapVisible={isHeatmapVisible}
          radius={radius}
          opacity={opacity}
          intensity={intensity}
        />
      </div>

      {/* Map Section - Constrained within fixed boundaries */}
      <div className="w-full">
        <div
          className="relative border border-gray-200 rounded-lg overflow-hidden"
          style={{ height: "50vh" }}
        >
          <div
            ref={mapRef}
            className="w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          />

          {/* Statistics - positioned absolutely within the map container */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-10">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{matchedLGAs.length}</span> LGAs
              mapped
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {lgaData?.data.length} total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGAHeatmap;
