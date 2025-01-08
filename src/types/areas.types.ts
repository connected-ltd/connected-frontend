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

export type AreasStats = AreaStats[];
