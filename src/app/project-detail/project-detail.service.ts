import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ProjectDetail } from './project-detail';
import {Project} from "../projects/project";

@Injectable()
export class ProjectDetailService {

  private projectUrl = 'http://localhost:3000/project';
  private relateProjectsUrl = 'http://localhost:3000/project/related';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getProject(title: string): Promise<ProjectDetail>{
    console.log(title);
    return this.http.get(this.projectUrl+"/"+title)
      .toPromise()
      .then(response => response.json() as ProjectDetail)
      .catch(this.handleError);
  }

  getRelatedProjects(title: string, tag1: string, tag2: string, tag3: string): Promise<Project[]>{
    console.log(tag1+"-"+tag2+"-"+tag3);
    return this.http.get(this.relateProjectsUrl+"/"+title+","+tag1+","+tag2+","+tag3)
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
