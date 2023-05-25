import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  postApi(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  deleteApi(url: string): Observable<any> {
    return this.http.delete(url);
  }

  get apiUri() {
    return this.baseUrl;
  }

  putApi(url: string, body: any = {}): Observable<any> {
    return this.http.put(url, body);
  }
}
