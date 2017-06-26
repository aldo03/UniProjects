import { Component, OnInit } from '@angular/core';
import {AddProjectService} from "./add-project.service";
import {Router} from "@angular/router";
import {UserDetailService} from "../user-detail/user-detail.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [AddProjectService, UserDetailService]
})
export class AddProjectComponent implements OnInit {

  departments: string[];
  deps: string[];
  counter = 1;
  title: string;
  authors: Array<string>;
  tags: Array<string>;
  department: string;
  picture: any;
  presentation: any;
  abstract: string;
  files: any;
  dldesc: string;
  authorsPicture: Array<string>;

  constructor(private addProjectService: AddProjectService, private userDetailService: UserDetailService, private router: Router) { }

  addAuthorInput(){
    this.counter++;
    var container = document.getElementById("authors");
    var input = document.createElement("input");
    var div = document.createElement("div");
    div.setAttribute("class", "col-md-10");
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    input.type = "text";
    input.id = "author" + this.counter;
    input.setAttribute("class", "form-control");
    input.setAttribute("placeholder", "Author" + this.counter);
    div.appendChild(input);
    row.appendChild(div);
    container.appendChild(row);

  }

  addProject(){
    this.tags = new Array();
    this.authorsPicture = new Array();
    this.title = (<HTMLInputElement>document.getElementById("title")).value;
    this.authors = new Array(this.counter);
    for(var i = 1; i<=this.counter; i++){
      this.authors[i-1] = (<HTMLInputElement>document.getElementById("author"+i)).value;
      if(this.authors[i-1]==""){
        alert("Some field is missing");
        return 0;
      }
    }
    this.tags = new Array(3);
    for(var i = 1; i<=3; i++){
      this.tags[i-1] = (<HTMLInputElement>document.getElementById("tag"+i)).value;
      if(this.tags[i-1]==""){
        alert("Some field is missing");
        return 0;
      }
    }
    this.department = this.deps[(<HTMLSelectElement>document.getElementById("department")).selectedIndex];
    this.picture = (<HTMLInputElement>document.getElementById("picture")).files;
    this.presentation = (<HTMLInputElement>document.getElementById("presentation")).files;
    this.abstract = (<HTMLTextAreaElement>document.getElementById("abstract")).value;
    this.files = (<HTMLInputElement>document.getElementById("files")).files;
    this.dldesc = (<HTMLInputElement>document.getElementById("dldesc")).value;



    if (this.title == "" || this.department == "" || this.abstract == "") alert("Some field is missing");
    else if(this.picture[0].type!='image/jpeg' && this.picture[0].type!='image/png'){
      alert("Only JPG or PNG files are allowed for picture!")
    }
    else if(this.presentation[0].type!='application/pdf' && this.presentation[0].type!='application/vnd.ms-powerpoint'){
      alert("Only PDF or PPT files are allowed for presentation!")
    }
    else {
      this.checkUserAndAddProject(0);
    }
  }

  checkUserAndAddProject(i: number){
    if(i==this.counter){
        console.log("adding proj");
      this.addProjectService.addProject(this.title, this.authors, this.tags, this.department, this.picture, this.presentation, this.abstract, this.files, this.dldesc, this.authorsPicture).then(project => {
        console.log("Add Project");
        alert("Project added!");
        this.router.navigate(['/project-detail', this.title, this.tags[0], this.tags[1], this.tags[2]]);
      });
    }else {
      this.userDetailService.getUser(this.authors[i]).then(user => {
        if(isUndefined(user.name)){
          alert("User "+this.authors[i]+" does not exist");
        } else {
          this.authorsPicture[i] = user.picture;
          console.log("i value: "+i);
          this.checkUserAndAddProject(++i);

        }
      });
    }
  }

  ngOnInit() {
    this.departments = new Array();
    this.deps = new Array();
    var i = 0;
    this.addProjectService.getSchools().then(schools => {
      for(let school of schools){
        for(let department of school.departments){
          this.departments[i] = school.name.concat(" - ").concat(department);
          this.deps[i]=department;
          i++;
        }
      }
    });
  }

}
