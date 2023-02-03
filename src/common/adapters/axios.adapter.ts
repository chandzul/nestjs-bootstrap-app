import { HttpAdapterInterface } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapterInterface {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);

      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
