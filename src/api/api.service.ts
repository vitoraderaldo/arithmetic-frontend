import { HttpClient } from "./http-client.interface";
import { LoginRequest } from "./request.types";
import { LoginResponse } from "./response.types";
import { AxiosService } from './axios.service'
import { FindOperationsResponse } from "../types/operations.type";
import { getAccessToken } from "../util/auth/is-authenticated";
import { CalculationResponse } from "../types/calculation.type";

class ApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  private host = process.env.REACT_APP_API_URL

  login(body: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/user/login', body);
  }

  getOperations(): Promise<FindOperationsResponse> {
    return this.get<FindOperationsResponse>('/calculator/operations');
  }

  calculateAddition(args: number[]): Promise<CalculationResponse> {
    return this.post<CalculationResponse>('/calculator/add', {arguments: args});
  }

  private post<T>(endpoint: string, body: any, headers?: any): Promise<T> {
    const url = `${this.host}${endpoint}`
    const newHeaders = this.includeAccessToken(headers)
    return this.httpClient.post<T>(url, body, newHeaders)
  }

  private get<T>(endpoint: string, headers?: any): Promise<T> {
    const url = `${this.host}${endpoint}`
    const newHeaders = this.includeAccessToken(headers)
    return this.httpClient.get<T>(url, newHeaders)
  }

  private includeAccessToken(headers?: any): any {
    const accessToken = getAccessToken()
    return {
      ...headers,
      accessToken: accessToken
    }
  }

}

export const apiService = new ApiService(new AxiosService())
