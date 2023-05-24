export interface HttpClient {
  post<T>(url: string, body: any, headers?: any): Promise<T>
}
