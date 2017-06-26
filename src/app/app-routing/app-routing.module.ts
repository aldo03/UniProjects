import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { DepartmentsComponent } from '../departments/departments.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ProjectDetailComponent} from '../project-detail/project-detail.component';
import {UserDetailComponent} from "../user-detail/user-detail.component";
import {AddProjectComponent} from "../add-project/add-project.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'departments', component: DepartmentsComponent},
  { path: 'projects/:search/:department', component: ProjectsComponent},
  { path: 'project-detail/:title/:tag1/:tag2/:tag3', component: ProjectDetailComponent},
  { path: 'user-detail/:username', component: UserDetailComponent },
  { path: 'add-project', component: AddProjectComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
