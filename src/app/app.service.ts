import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {User} from "./sign-up/user";

@Injectable()
export class AppService {

  private loginUrl = 'http://localhost:3000/login';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  login(user: string, password: string): Promise<User>{
    return this.http.get(this.loginUrl+"/"+user+","+password, this.headers)
      .toPromise()
      .then(response => {
        console.log("RESPONSE"+response.json().name);
        if(response.json().name!="")
        return response.json() as User;
        else return new User();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
