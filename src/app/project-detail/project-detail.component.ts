import {Component, Input, OnInit} from '@angular/core';
import { ProjectDetail } from './project-detail';
import { ProjectDetailService } from './project-detail.service';
import {ActivatedRoute} from "@angular/router";
import {Project} from "../projects/project";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  providers: [ProjectDetailService]
})
export class ProjectDetailComponent implements OnInit {
  project: ProjectDetail;
  relatedProjects: Project[];
  constructor(private projectDetailService: ProjectDetailService, private route : ActivatedRoute) {
      this.project = new ProjectDetail();
  }

  getProject(title: string): void {
    this.projectDetailService.getProject(title).then(project => this.project = project);
  }

  getRelatedProjects(title: string, tag1: string, tag2: string, tag3: string){
    this.projectDetailService.getRelatedProjects(title, tag1, tag2, tag3).then(projects => this.relatedProjects = projects);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let title = params['title'];
      let tag1 = params['tag1'];
      let tag2 = params['tag2'];
      let tag3 = params['tag3'];
      console.log(title);
      this.getProject(title);
      this.getRelatedProjects(title, tag1, tag2, tag3);
    });
  }
}
