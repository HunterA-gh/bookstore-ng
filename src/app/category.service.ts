import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from './category';
import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`http://localhost:8080/homepage`);
  }

  getCategoryById(id: number): Observable<Category>{
    return this.httpClient.get<Category>(`http://localhost:8080/homepage/${id}`);
  }

  updateCategory(category: Category, id: number): Observable<Category>{
    return this.httpClient.put<Category>(`http://localhost:8080/homepage/${id}`, category);
  }

  createCategory(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(`http://localhost:8080/homepage/`, category);
  }

  deleteCategory(id: number): Observable<Category>{
    return this.httpClient.delete<Category>(`http://localhost:8080/homepage/${id}`);
  }

  addBook(id: number, book: Book): Observable<Book>{
    return this.httpClient.post<Book>(`http://localhost:8080/homepage/${id}`, book);
  }
}
