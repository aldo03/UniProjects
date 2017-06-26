import { Injectable } from '@angular/core';
import {School} from "../departments/school";
import {Http} from "@angular/http";
import {ProjectDetail} from "../project-detail/project-detail";

@Injectable()
export class AddProjectService {

  private departmentsUrl = 'http://localhost:3000/departments';
  private addProjectUrl = 'http://localhost:3000/add-project';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  addProject(title: string, authors: Array<string>, tags: Array<string>, department: string, picture: any, presentation: any, abstract: string, files: any, dldesc: string, authorsPicture: Array<string>): Promise<ProjectDetail>{
    var payload = new FormData();
    payload.append('title', title);
    payload.append('authors', authors);
    payload.append('tags', tags);
    payload.append('department', department);
    payload.append('picture', picture[0]);
    payload.append('presentation', presentation[0]);
    payload.append('abstract', abstract);
    var i = 0;
    for(var file of files){
      payload.append('file'+i, file);
    }
    payload.append('files', files);
    payload.append('dldesc', dldesc);
    payload.append('authorsPicture', authorsPicture);

    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.addProjectUrl, payload, headers)
      .toPromise()
      .then(response => response.json() as ProjectDetail)
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
