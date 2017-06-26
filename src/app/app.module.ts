import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FillHeightModule } from 'ngx-fill-height/fill-height.module';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {UserDetailComponent} from "./user-detail/user-detail.component";
import { AddProjectComponent } from './add-project/add-project.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    DepartmentsComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    UserDetailComponent,
    FileDropDirective,
    FileSelectDirective,
    AddProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FillHeightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
