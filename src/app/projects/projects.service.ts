import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Project } from './project';

@Injectable()
export class ProjectsService {
  private projectsUrl = 'http://localhost:3000/search/projects';
  private departmentProjectsUrl = 'http://localhost:3000/department/projects';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getProjects(input: string): Promise<Project[]>{
    return this.http.get(this.projectsUrl+"/"+input)
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);
  }

  getDepartmentProjects(input: string): Promise<Project[]>{
    return this.http.get(this.departmentProjectsUrl+"/"+input)
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
