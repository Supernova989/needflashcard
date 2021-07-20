export interface FindOptions {
  q?: Object;
  p?: number;
  s?: number;
}

export interface Response<T> {
  payload?: T;
  error_code: number;
}

export interface ResponsePagination<T> {
  payload?: {
    size: number;
    page: number;
    total: number;
    entries: T[];
  };
  error_code: number;
}
export interface Group {
  id: string;
  title: string;
  description: string;
  sort: number;
  created_at: Date;
  updated_at: Date;
  words?: number;
}
