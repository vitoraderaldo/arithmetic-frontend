import axios, { AxiosError } from 'axios'
import { HttpClient } from "./http-client.interface";
import { ApiErrorInterface } from './api.error.interface';

export class AxiosService  implements HttpClient {
  
  async post<T>(url: string, body: any, headers?: any): Promise<T> {
    const response = await axios.post(url, body, {
      headers
    })
    return response.data
  }

  async get<T>(url: string, headers?: any): Promise<T> {
    const response = await axios.get(url, {
      headers
    })
    return response.data
  }

  async delete<T>(url: string, headers?: any): Promise<T> {
    const response = await axios.delete(url, {
      headers
    })
    return response.data
  }

  prettifyError(exception: AxiosError): ApiErrorInterface {
    const apiError = exception.response?.data as ApiErrorInterface

    const error = apiError?.error || 'Unknown Error'
    const message = apiError?.message || 'An error occurred. Please try again later.'
    const statusCode = apiError?.statusCode || exception.response?.status || 500

    return {
      error,
      message,
      statusCode
    }
    
  }

}
