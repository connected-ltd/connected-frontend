export interface Numbers {
  created_at: string;
  id: number;
  is_set: boolean;
  language: string;
  number: string;
  updated_at: string;
}

export interface NumbersInput {
  number: string;
  language: string;
  area_id: number | string;
}
