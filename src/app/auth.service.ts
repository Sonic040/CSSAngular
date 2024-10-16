import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {}

  async Login(login: any) {
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const options = {
      headers: new HttpHeaders(header)
    };

    return new Promise<void>((resolve, reject) => {
      console.log("sss")
      this.http.post("http://localhost:8080/api/auth/login", login, options).subscribe({
        next: (res: any) => {
          const token = res.token;
          const role = res.role;

          localStorage.setItem('token', token);
          localStorage.setItem('userInfo', JSON.stringify({ role }));
          localStorage.setItem('userType', role);

          if (role === 1) {
            this.route.navigate(["/warehouses"]); // Navigate to the warehouse page
          } else if (role === 2) {
            this.route.navigate(["/supplydocument"]); // Navigate to the root for role 2
          }
          resolve();
        },
        error: (error) => {
          console.log("Login error:", error); // Log the error for debugging
          reject(error); // Reject the promise with the error
          }
        }
      );
    });
  }

  getdata() {
    let userData: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
    userData.userid = parseInt(userData.userid, 10);
    userData.roleid = parseInt(userData.roleid, 10);
    return userData;
  }
}