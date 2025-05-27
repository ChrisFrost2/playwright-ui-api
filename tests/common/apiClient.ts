import { APIRequestContext } from "@playwright/test";

export class ApiClient {
  readonly baseURL: string = `https://jsonplaceholder.typicode.com/`;
  readonly request: APIRequestContext;
  
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async get(urlPortfix: string) {
     return await this.request.get(`${this.baseURL}/${urlPortfix}`);
  }
 
}