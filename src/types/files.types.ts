export interface File {
  created_at: string;
  id: number;
  name: string;
  shortcode: string | null;
  updated_at: string;
  user_id: number;
  whatsapp_number: string | null;
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
