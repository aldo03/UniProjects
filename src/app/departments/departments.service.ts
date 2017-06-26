import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {School} from "./school";

@Injectable()
export class DepartmentsService {

  private departmentsUrl = 'http://localhost:3000/departments';
  private headers = new Headers({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getSchools(): Promise<School[]>{
    return this.http.get(this.departmentsUrl, this.headers)
      .toPromise()
      .then(response => response.json() as School[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
