import { Component, OnInit } from '@angular/core';
import {User} from "./user";
import {UserDetailService} from "./user-detail.service";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../projects/project";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [ UserDetailService ]
})
export class UserDetailComponent implements OnInit {
  user: User;
  projects: Project[];
  constructor(private userService: UserDetailService, private route : ActivatedRoute) {
    this.user = new User();
  }

  getUser(username: string){
    this.userService.getUser(username).then(user => {
      this.user = user;
      console.log(user);
      if(user.cv!="") document.getElementById("cv").setAttribute("style", "display: visible;");
      if(user.fb!="") document.getElementById("fb").setAttribute("style", "display: visible;");
      if(user.gplus!="") document.getElementById("gplus").setAttribute("style", "display: visible;");
      if(user.linkedin!="") document.getElementById("linkedin").setAttribute("style", "display: visible;");
    });
  }

  getRelatedProjects(username: string){
    this.userService.getRelatedProjects(username).then(projects => this.projects = projects);
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      let user = params['username'];
      this.getUser(user);
      this.getRelatedProjects(user);
    });

  }


}
