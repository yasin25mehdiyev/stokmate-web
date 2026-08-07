export type ApiRequest<T = object> = {
  page: number;
  pageSize: number;
  q?: string;
  sort?: string;
  dir?: "asc" | "desc";
} & T

export type ApiResponse<T> = {
  data: T;
  isSuccess: boolean;
  message: string;
}

export type ApiPaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
