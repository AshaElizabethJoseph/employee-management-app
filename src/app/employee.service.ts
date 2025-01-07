import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/Employee`;
  constructor(private http:HttpClient) { }

  getEmoloyees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }

}
