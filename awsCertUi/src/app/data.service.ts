import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getRootInfo() {
    return this.http.get('https://ootlilufzd.execute-api.us-east-2.amazonaws.com/api')
  }

  getRootInfoWithParams(email: string, password: string) {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('email', email);
    params = params.append('password', password);
    return this.http.get('https://ootlilufzd.execute-api.us-east-2.amazonaws.com/api/email/' + params.get('email') + '/password/' + params.get('password'), { params: params });
  }
}
