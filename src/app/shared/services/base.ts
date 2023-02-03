import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseService } from "../interfaces/base-service";

export abstract class Base<I> implements BaseService<I> {
  protected baseUrl = environment.baseUrl;
  constructor(
    endpoint: string,
    protected httpClient: HttpClient,
  ){
    this.baseUrl = `${this.baseUrl}${endpoint}`
  }

  getAll(): Observable<I[]> {
    return this.httpClient.get<I[]>(`${this.baseUrl}`)
  }


  getOne(id: number): Observable<I> {
    return this.httpClient.get<I>(`${this.baseUrl}/${id}`)
  }


  createDocument(data: I): Observable<I> {
    return this.httpClient.post<I>(`${this.baseUrl}`, data);
  }


  updateDocument(id: number, data: I): Observable<I> {
    return this.httpClient.put<I>(`${this.baseUrl}/${id}`, data)
  }


  deleteDocument(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
  }


}
