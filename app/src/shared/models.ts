export interface Group {
  id: string;
  title: string;
  description: string;
  sort: number;
  created_at: Date;
  updated_at: Date;
  words?: number;
}
