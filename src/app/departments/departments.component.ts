import { Component, OnInit } from '@angular/core';
import { School } from "./school";
import { DepartmentsService } from "./departments.service";


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers: [DepartmentsService]
})
export class DepartmentsComponent implements OnInit {

  schools: School[];
  constructor(private depService: DepartmentsService) { }

  getSchools(): void {
    this.depService.getSchools().then(schools => this.schools = schools);
  }

  ngOnInit() {
    this.getSchools();
  }

}
