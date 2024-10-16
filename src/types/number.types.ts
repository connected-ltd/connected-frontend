export interface Numbers {
  created_at: string;
  id: number;
  is_set: boolean;
  language: string;
  number: string;
  updated_at: string;
}

export interface NumberStats {
  english: number;
  hausa: number;
  igbo: number;
  total: number;
  yoruba: number;
}

export interface NumbersInput {
  number: string;
  language: string;
  area_id: number | string;
}
