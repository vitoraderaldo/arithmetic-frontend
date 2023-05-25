export interface HttpClient {
  post<T>(url: string, body: any, headers?: any): Promise<T>
  get<T>(url: string, headers?: any): Promise<T>
}
