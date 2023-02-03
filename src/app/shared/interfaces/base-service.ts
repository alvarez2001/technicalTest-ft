import { Observable } from "rxjs";

export interface BaseService<I> {
  getAll(): Observable<I[]>;
  getOne(id: number): Observable<I>;
  createDocument(data: I): Observable<I>;
  updateDocument(id: number, data: I): Observable<I>;
  deleteDocument(id: number): Observable<void>;
}
