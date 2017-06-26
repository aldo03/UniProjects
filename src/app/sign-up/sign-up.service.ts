import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {User} from "./user";
import {School} from "../departments/school";

@Injectable()
export class SignUpService {
  private signUpUrl = 'http://localhost:3000/sign-up';
  private departmentsUrl = 'http://localhost:3000/departments';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  signUp(user: string, pass: string, eml: string, nm: string, srnm: string, dep: string, file: any, fb: string, gplus: string, linkedin: string, cv: any, back: string): Promise<User> {

    var payload = new FormData();
    payload.append('username', user);
    payload.append('password', pass);
    payload.append('email', eml);
    payload.append('name', nm);
    payload.append('surname', srnm);
    payload.append('department', dep);
    payload.append('picture', file[0]);
    payload.append('cv', cv[0]);
    payload.append('fb', fb);
    payload.append('gplus', gplus);
    payload.append('linkedin', linkedin);
    payload.append('history', back);

    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.signUpUrl, payload, headers)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

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
