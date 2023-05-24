import axios from 'axios'
import { HttpClient } from "./http-client.interface";

export class AxiosService  implements HttpClient {
  
  async post<T>(url: string, body: any, headers?: any): Promise<T> {
    const response = await axios.post(url, body, {
      headers
    })
    return response.data
  }

}
