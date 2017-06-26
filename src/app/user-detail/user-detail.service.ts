import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {User} from "./user";
import {Project} from "../projects/project";

@Injectable()
export class UserDetailService {
  private usersUrl = 'http://localhost:3000/user';
  private projectsUrl ="http://localhost:3000/user/projects"
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getUser(username: string): Promise<User>{
    return this.http.get(this.usersUrl+"/"+username)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  getRelatedProjects(username: string): Promise<Project[]>{
    return this.http.get(this.projectsUrl+"/"+username)
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
