import { HttpClient } from "./http-client.interface";
import { LoginRequest } from "./request.types";
import { LoginResponse } from "./response.types";
import { AxiosService } from './axios.service'

class ApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  private host = process.env.REACT_APP_API_URL

  login(body: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/user/login', body);
  }

  private post<T>(endpoint: string, body: any, headers?: any): Promise<T> {
    const url = `${this.host}${endpoint}`
    return this.httpClient.post<T>(url, body, headers)
  }

}

export const apiService = new ApiService(new AxiosService())
