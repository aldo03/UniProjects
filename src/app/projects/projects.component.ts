import {Component, OnChanges, OnInit} from '@angular/core';
import { Project } from './project';
import { ProjectsService } from './projects.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  constructor(private projectsService: ProjectsService, private route : ActivatedRoute) { }

  getProjects(input: string): void {
    this.projectsService.getProjects(input).then(projects => {
      this.projects = projects;
      if(this.projects.length==0){
        alert("No items matched your search");
        (<HTMLElement>document.getElementById("results")).innerHTML = 'No items matched your search';
        document.getElementById("results").setAttribute("style", "display: visible; margin-bottom: 400px");
      }else {
        console.log(this.projects[0]);
        (<HTMLElement>document.getElementById("results")).innerHTML = 'Search results for "'+input+'":';
        document.getElementById("results").setAttribute("style", "display: visible;");
      }
    });
  }

  getDepartmentProjects(input: string): void {
    this.projectsService.getDepartmentProjects(input).then(projects => {
      this.projects = projects;
      if(this.projects.length==0){
        alert("No items matched your search");
        (<HTMLElement>document.getElementById("results")).innerHTML = 'No items matched your search';
        document.getElementById("results").setAttribute("style", "display: visible; margin-bottom: 400px");
      }else {
        (<HTMLElement>document.getElementById("results")).innerHTML = 'Search results for "'+input+'":';
        document.getElementById("results").setAttribute("style", "display: visible;");
      }
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      var input = params['search'];
      var department = params['department'];
      //console.log("input"+input+".");
      if(input==""){
        alert("Insert an Input for your search");
      } else {
        if(department=="1"){
          this.getDepartmentProjects(input);
        }else {
          this.getProjects(input);
        }
      }
    });
    /*var input = (<HTMLInputElement>document.getElementById("searchInput")).value;
     this.getProjects(input);*/
  }
}
