import { HttpClient } from "./http-client.interface";
import { LoginRequest, SearchRecordsRequest } from "./request.types";
import { LoginResponse } from "./response.types";
import { AxiosService } from './axios.service'
import { FindOperationsResponse } from "../types/operations.type";
import { getAccessToken, onAuthenticationError } from "../util/auth/authentication.util";
import { CalculationResponse } from "../types/calculation.type";
import { ApiErrorInterface } from "./api.error.interface";
import { RecordsSearchResponse } from "../types/records.type";

class ApiService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly onError: (error: ApiErrorInterface) => void
  ) {}

  private host = process.env.REACT_APP_API_URL

  login(body: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/user/login', body);
  }

  getOperations(): Promise<FindOperationsResponse> {
    return this.get<FindOperationsResponse>('/calculator/operations');
  }

  calculateAddition(args: number[]): Promise<CalculationResponse> {
    return this.post<CalculationResponse>('/calculator/addition', {arguments: args});
  }

  calculateSubtraction(args: number[]): Promise<CalculationResponse> {
    return this.post<CalculationResponse>('/calculator/subtraction', {arguments: args});
  }

  calculateMultiplication(args: number[]): Promise<CalculationResponse> {
    return this.post<CalculationResponse>('/calculator/multiplication', {arguments: args});
  }

  calculateDivision(args: number[]): Promise<CalculationResponse> {
    return this.post<CalculationResponse>('/calculator/division', {arguments: args});
  }

  calculateSquareRoot(args: number[]): Promise<CalculationResponse> {
    return this.post<CalculationResponse>('/calculator/square-root', {arguments: args});
  }

  calculateRandomString(args: number[]): Promise<CalculationResponse> {
    return this.post<CalculationResponse>('/calculator/random-string', {arguments: args});
  }

  searchRecords(params: SearchRecordsRequest): Promise<RecordsSearchResponse> {
    const parameters = new URLSearchParams({...params.filter, ...params.pagination, ...params.sort} as any).toString();
    return this.get<RecordsSearchResponse>(`/records?${parameters}`);
  }

  deleteRecord(id: string): Promise<void> {
    return this.delete<void>(`/records/${id}`);
  }
  
  private post<T>(endpoint: string, body: any, headers?: any): Promise<T> {
    const url = `${this.host}${endpoint}`
    const newHeaders = this.includeAccessToken(headers)
    return this
      .httpClient
      .post<T>(url, body, newHeaders)
      .catch((error: Error) => {
        throw this.httpClient.prettifyError(error)
      })
      .catch((error: ApiErrorInterface) => {
        this.onError(error)
        throw error
      })
  }

  private get<T>(endpoint: string, headers?: any): Promise<T> {
    const url = `${this.host}${endpoint}`
    const newHeaders = this.includeAccessToken(headers)
    return this.httpClient
      .get<T>(url, newHeaders)
      .catch((error: Error) => {
        throw this.httpClient.prettifyError(error)
      })
      .catch((error: ApiErrorInterface) => {
        this.onError(error)
        throw error
      })
  }

  private delete<T>(endpoint: string, headers?: any): Promise<T> {
    const url = `${this.host}${endpoint}`
    const newHeaders = this.includeAccessToken(headers)
    return this.httpClient
      .delete<T>(url, newHeaders)
      .catch((error: Error) => {
        throw this.httpClient.prettifyError(error)
      })
      .catch((error: ApiErrorInterface) => {
        this.onError(error)
        throw error
      })
  }

  private includeAccessToken(headers?: any): any {
    const accessToken = getAccessToken()
    return {
      ...headers,
      accessToken: accessToken
    }
  }

}

const onErrors = (error: ApiErrorInterface) => {
  onAuthenticationError(error)
}

export const apiService = new ApiService(new AxiosService(), onErrors)
