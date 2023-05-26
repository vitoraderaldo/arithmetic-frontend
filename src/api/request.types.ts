export interface LoginRequest {
  email: string
  password: string
}

export interface RecordFilterOptions {
  operationId: number;
  startDate: string;
  endDate: string;
}

export interface RecordPagination {
  page: number;
  pageSize: number;
  pageTotal: number;
  total: number;
}

export interface SearchRecordsRequest {
  filter: RecordFilterOptions
  pagination: {
    page: number;
    pageSize: number;
  }
}
