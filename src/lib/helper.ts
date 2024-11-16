export const toAbsoluteUrl = (pathname: string) =>
  import.meta.env.BASE_URL + pathname;


export type Response<T> = {
  data?: T;
  payload?: {
    message?: string;
    errors?: {
      [key: string]: Array<string>;
    };
    pagination?: PaginationState;
  };
};
export type Filter = {
  status?: string;
  leave_type_id?: string;
  start_date?: string;
  end_date?: string;
  role?: string;
  last_login?: string;
};

export type FilterState = {
  filter?: Filter;
};
export type SortState = {
  sort?: string;
  order?: "asc" | "desc";
};
export type PaginationState = {
  page: number;
  items_per_page: 3 | 5 | 10 | 30 | 50 | 100;
};
export type SearchState = {
  search?: string;
};
export type QueryState = PaginationState &
  SortState &
  FilterState &
  SearchState;
