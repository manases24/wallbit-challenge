import axios from "axios";

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

export class HttpApiAdapter implements HttpAdapter {
  private readonly axiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url);
      return data;
    } catch (error) {
      console.error("Error en GET:", error);
      throw error;
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const { data: responseData } = await this.axiosInstance.post<T>(
        url,
        data
      );
      return responseData;
    } catch (error) {
      console.error("Error en POST:", error);
      throw error;
    }
  }
}

export const axiosApiAdapter = new HttpApiAdapter();
