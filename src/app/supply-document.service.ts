import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplyDocumentService {
  private baseUrl = 'http://localhost:8080/api/supplydocument';

  constructor(private http: HttpClient) { }

  // الحصول على جميع مستندات التوريد
  getAllSupplyDocuments(): Observable<any[]> {
    const token = localStorage.getItem('token'); // استرجاع التوكن من localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.get<any[]>(`${this.baseUrl}/getAll`, { headers });
  }

  // إضافة مستند توريد جديد
  addSupplyDocument(document: any): Observable<any> {
    console.log(document);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<any>(this.baseUrl, document, { headers });
  }

  // حذف مستند توريد
  deleteSupplyDocument(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  exportSupplyDocuments(): Observable<Blob> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/octet-stream'
    });

    return this.http.get(`${this.baseUrl}/export`, { headers, responseType: 'blob' });
  }


}