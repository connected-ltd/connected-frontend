export interface File {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}

// export interface AreaStats {
//   area_name: string;
//   is_set_count: number;
//   languages: string[];
//   number_count: number;
// }

export interface FileInput {
  user_id: number;
  file: File;
}

export type Files = File[];
