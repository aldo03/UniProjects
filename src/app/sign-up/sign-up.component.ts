import {Component, ElementRef, OnInit} from '@angular/core';
import {SignUpService} from './sign-up.service';
import {Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";
import {UserDetailService} from "../user-detail/user-detail.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [SignUpService, UserDetailService]
})
export class SignUpComponent implements OnInit {

  constructor(private signUpService: SignUpService, private userDetailService: UserDetailService, private router: Router) {
  }
  uploader = new FileUploader({url: 'http://localhost:3000/upload-pic'});
  departments: string[];
  deps: string[];

  signUp() {
    var userInput = <HTMLInputElement>document.getElementById("usrname");
    var passInput = <HTMLInputElement>document.getElementById("pwd");
    var emlInput = <HTMLInputElement>document.getElementById("email");
    var nmInput = <HTMLInputElement>document.getElementById("name");
    var srnmInput = <HTMLInputElement>document.getElementById("surname");
    var depInput = <HTMLSelectElement>document.getElementById("department");
    var fileInput = <HTMLInputElement>document.getElementById("picture");
    var fbInput = <HTMLInputElement>document.getElementById("fb");
    var gplusInput = <HTMLInputElement>document.getElementById("gplus");
    var linkInput = <HTMLInputElement>document.getElementById("linkedin");
    var background = <HTMLTextAreaElement>document.getElementById("background");
    var currInput = <HTMLInputElement>document.getElementById("cv");



    var user = userInput.value;
    var pass = passInput.value;
    var eml = emlInput.value;
    var nm = nmInput.value;
    var srnm = srnmInput.value;
    var dep = this.deps[depInput.selectedIndex];
    var file = fileInput.files;
    var fb = fbInput.value;
    var gplus = gplusInput.value;
    var linkedin = linkInput.value;
    var cv = currInput.files;
    var back = background.value;


    if (user == "" || pass == "" || eml == "" || nm == "" || srnm == "" || dep == "" || file.length == 0) alert("Some field is missing");
    else if(cv[0].type!='application/pdf'){
      alert("Only PDF files are allowed for CV!")
    }
    else if(file[0].type!='image/jpeg' && file[0].type!='image/png'){
      alert("Only JPG or PNG files are allowed for picture!")
    }
    else {
      this.userDetailService.getUser(user).then(result=>{
        if(!isUndefined(result.name)){
          alert("Username already in use");
        } else {
          this.signUpService.signUp(user, pass, eml, nm, srnm, dep, file, fb, gplus, linkedin, cv, back).then(user => {
            console.log("Registration");
            alert("Registration done!");
            this.router.navigate(['/home']);
          });
        }
      });
    }
  }

  ngOnInit() {
    this.departments = new Array();
    this.deps = new Array();
    var i = 0;
    this.signUpService.getSchools().then(schools => {
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
