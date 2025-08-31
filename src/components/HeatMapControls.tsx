import React, { useState } from "react";
import { Button } from "./ui/button";

interface HeatmapControlsProps {
  onToggleHeatmap: () => void;
  onRadiusChange: (radius: number) => void;
  onOpacityChange: (opacity: number) => void;
  onIntensityChange: (intensity: number) => void;
  isHeatmapVisible: boolean;
  radius: number;
  opacity: number;
  intensity: number;
}

const HeatmapControls: React.FC<HeatmapControlsProps> = ({
  onToggleHeatmap,
  onRadiusChange,
  onOpacityChange,
  onIntensityChange,
  isHeatmapVisible,
  radius,
  opacity,
  intensity,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile Toggle Button - Only visible on small screens */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full bg-bg-primary p-3 rounded-lg mb-2"
        aria-label="Toggle heatmap controls"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">
            Heatmap Controls
          </span>
          <svg
            className={`w-5 h-5 text-text-primary transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Controls Panel */}
      <div
        className={`
          w-full bg-bg-primary rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? "max-h-96" : "max-h-0"} md:max-h-none md:block
        `}
      >
        {/* Controls Content */}
        <div className="p-4">
          {/* Desktop Header */}
          <h3 className="hidden md:block text-sm md:text-lg font-semibold mb-4 text-text-primary">
            Heatmap Controls
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Toggle Heatmap */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-text-primary">
                Toggle Heatmap
              </label>
              <Button
                onClick={onToggleHeatmap}
                // className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                //   isHeatmapVisible
                //     ? "bg-red-600 hover:bg-red-700 text-white"
                //     : "bg-green-600 hover:bg-green-700 text-white"
                // }`}
              >
                {isHeatmapVisible ? "Hide" : "Show"}
              </Button>
            </div>

            {/* Radius Control */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-text-primary mb-3">
                Radius: <span className="font-semibold">{radius}px</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={radius}
                onChange={(e) => onRadiusChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-bg-primary-dark2 focus:ring-opacity-50"
              />
              <div className="flex justify-between text-xs text-text-primary mt-1">
                <span>10px</span>
                <span>100px</span>
              </div>
            </div>

            {/* Opacity Control */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-text-primary mb-3">
                Opacity:{" "}
                <span className="font-semibold">
                  {(opacity * 100).toFixed(0)}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => onOpacityChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-bg-primary-dark2 focus:ring-opacity-50"
              />
              <div className="flex justify-between text-xs text-text-primary mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Intensity Control */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-text-primary mb-3">
                Intensity: <span className="font-semibold">{intensity}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => onIntensityChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-bg-primary-dark2 focus:ring-opacity-50"
              />
              <div className="flex justify-between text-xs text-text-primary mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="md:hidden w-full mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-primary rounded-md transition-colors"
          >
            Close Controls
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isExpanded && (
        <div
          className="md:hidden fixed inset-0 bg-opacity-50 z-0"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default HeatmapControls;
