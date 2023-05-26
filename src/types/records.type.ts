import { RecordPagination } from "../api/request.types";

export interface Record {
  id: string;
  operationName: string;
  amount: number;
  userBalance: number;
  operationResponse: string;
  date: string;
}

export interface RecordsSearchResponse {
  records: Record[];
  pagination: RecordPagination;
}
