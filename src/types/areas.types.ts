export interface Areas {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}

export interface AreaStats {
  area_name: string;
  is_set_count: number;
  languages: string[];
  number_count: number;
}

export interface NumPerAreaStat {
  area_name: string;
  number_count: number;
}

export interface LGAResponse {
  data: Areas[];
  message: string;
  status: string;
}

export interface LGACoordinate {
  count?: number;
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  state: string;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  weight?: number;
}

export type AreasStats = AreaStats[];
export type NumPerAreaStats = NumPerAreaStat[];
