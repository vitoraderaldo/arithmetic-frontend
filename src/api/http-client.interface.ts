import { ApiErrorInterface } from "./api.error.interface"

export interface HttpClient {
  post<T>(url: string, body: any, headers?: any): Promise<T>
  get<T>(url: string, headers?: any): Promise<T>
  delete<T>(url: string, headers?: any): Promise<T>
  prettifyError(exception: Error): ApiErrorInterface
}
