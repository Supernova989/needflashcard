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
  payload?: PaginationData<T>;
  error_code: number;
}
export interface PaginationData<T> {
  size: number;
  page: number;
  total: number;
  entries: T[];
}
export interface Group {
  id?: string;
  title: string;
  description: string;
  sort: number;
  created_at: Date;
  updated_at: Date;
  words?: number;
}
export interface Word {
  id?: string;
  title: string;
  definition: string;
  groupId: string[];
  examples: {
    id?: string;
    text: string;
  }[];
}

export enum Language {
  English,
  Russian,
  German,
  Spanish,
  French,
  Italian,
  Korean,
  Greek,
}
