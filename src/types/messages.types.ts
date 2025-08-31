export interface Message {
  area: string;
  created_at: string;
  id: number;
  message: string;
  shortcode: string;
  updated_at: string;
}

// export interface AreaStats {
//   area_name: string;
//   is_set_count: number;
//   languages: string[];
//   number_count: number;
// }

export interface MessageInput {
  shortcode_id: number;
  message: string;
  area_id: number;
  user_id: number;
}

export type Messages = Message[];
