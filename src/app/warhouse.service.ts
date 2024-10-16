import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Warehouse {
  warehouseId: number;
  warehouseName: string;
  warehouseDescription?: string;
  createdBy: {
    fullName: string;
  };
  createdAt: string;
  items?: Item[];
}

export interface Item {
  itemId: number;
  itemName: string;
  itemDescription?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private baseUrl = 'http://localhost:8080/api/warehouses';

  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<Warehouse[]> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    });

    return this.http.get<Warehouse[]>(`${this.baseUrl}/getAll`, { headers });
  }

  addWarehouse(data: any): Observable<Warehouse> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    });
  
    return this.http.post<Warehouse>(this.baseUrl, data, { headers }); // Include headers in the request
  }

  deleteWarehouse(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    });
  
    return this.http.delete(`${this.baseUrl}/${id}`, { headers }); // Include headers in the request
  }
  exportWarehouses(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export`, { responseType: 'blob' });
  }
}